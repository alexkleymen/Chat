require('dotenv').config()
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const cors = require('cors');
const { Router } = require('express');
const router = require('./router')
const { addUser, deleteUser,allUsers} = require('./utils');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))  
   .use(bodyParser.json());



app.use(cors())
app.use(router);

  io.on('connection', (socket) => {
    
    socket.on('sendmessage',({name,message},callback)=>{

      const room = allUsers.filter(user=>user.name===name)
      if(!room) callback('Reconnect')
      io.to(room[0].room).emit('message',{user:name,message:message})
    })
    
    socket.on('join' , (name,callback)=>{
        const error = addUser({id:socket.id,name,room :'main'})
        if(error) callback(error)
        else{
        socket.join('main')
        socket.emit('message',{user:'admin',message:'Welcome to the main loby'});
        socket.broadcast.to('main').emit('message',{ user:'admin' , message: `${name} has joind`})
            } 
    })

    socket.on('disconnect', () => {
      const user = allUsers.filter(user=>user.id===socket.id)
     
      socket.broadcast.to('main').emit('message',{ user:'admin' , message: `${user[0].name} has left`})
      deleteUser(socket.id)
      
    });


   
  });

server.listen(5000);
import React, { Component, useState, useEffect } from 'react';
import {useHistory,Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import './Join.css'


const Join = () => {

    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const [users,setUsers] = useState('')
    const [token,setToken] = useState('')
    const history = useHistory();

    const joinMainRoom = async () =>{
        
       try {
        const res = await  axios.post('http://localhost:5000/login',{
            user,
            password
        })   

        console.log(res)

        // the option that the user got the password and the user name correct
        if(res.data.token){
            setToken(res)
            history.push('/main',{
                user,
                token
            })
        }

        // the option that the user got the password and the user name correct
        else{
            history.push('/')
            alert('Password or user is incorrect')
        }
        
        
       } catch(error){
           console.log(error)
       }
    }


    // The user doesnt have account and he need to be redirected the account creation
    const regiser = () =>{
        history.push('/register')
    }


    useEffect(()=>{
            axios.get('http://localhost:5000/user').then(resp=>setUsers(resp.data.length))
        
        return(function(){
            console.log('alex as left the bilding');
        })
    },[])


   
    return ( 
      
            <Container fixed style={{textAlign:'center' , marginTop: '15%'}}>
   
            <TextField onChange={(e)=>setUser(e.target.value)} label="User" variant="outlined" /><br/>
            <TextField style={{marginTop: '25px'}} onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" /><br/>
                
                    <Button onClick={joinMainRoom} style={{marginTop: '25px'}} variant="contained" color="primary">
                    Join
                    </Button>    
                

                <h3>{users} users already connectd!</h3>

                <Button onClick={regiser} style={{marginTop: '25px'}} variant="contained" color="primary">
                    Register
                </Button> 
                



            </Container>
        
     );
}
 
export default Join;
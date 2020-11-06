import React, { Component, useState, useEffect } from 'react';
import {useHistory,Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'



const Register = () => {

    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

    const register = async () =>{
        
       try {
        const answear = await  axios.post('http://localhost:5000/register',{
            user,
            password
        })  
        
        if(answear.data === 'User already exists'){
            alert('password or user already exist')
        }
        
        else history.push('/')
       } catch(error){
           console.log(error)
       }
    }

  


   
    return ( 
      
            <Container fixed style={{textAlign:'center' , marginTop: '15%'}}>
   
            <TextField onChange={(e)=>setUser(e.target.value)} label="User" variant="outlined" /><br/>
            <TextField style={{marginTop: '25px'}}  onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" /><br/>
               
            <Button style={{marginTop: '25px'}} onClick={register} variant="contained" color="primary">
            Register
            </Button>     



            </Container>
        
     );
}
 
export default Register;
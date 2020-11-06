import React, { Component, useEffect,useState,useRef } from 'react';
import io from 'socket.io-client';
import {useLocation} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useRadioGroup } from '@material-ui/core';
import './Main.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import SendIcon from '@material-ui/icons/Send';
const CONNECTION = "http://localhost:5000/"

let socket;



const Main = () => {
   
    const [users,setUsers] = useState([])
    const [message,setMessage] = useState('')
    const { transcript, resetTranscript } = useSpeechRecognition()
    const [messages,setMessages] = useState([])
    const location = useLocation()
   
   
    
    

    useEffect(()=>{

        socket = io(CONNECTION);
        socket.emit('join',location.state.user,(error)=>{
            if(error) alert(error)
        })

        socket.on('message',(message)=>{
            setMessages(messages => [ ...messages, message ]);
            
        })
    },[CONNECTION])

    
  
    const handlePress = (e) => {
        
        if(e.key==='Enter'){
            
            e.preventDefault()
            let messageToSend = message ;
            messageToSend = messageToSend ? messageToSend : transcript;
            socket.emit('sendmessage',{name:location.state.user,message: messageToSend},(error)=>{
                if(error) console.log(error)
            })
            setMessage('')
            resetTranscript('')
        }
    }


    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
      }


     
    return ( 
        <Grid container justify="center" style={{textAlign:'left' , marginTop: '50px'}} >
            
            <Grid item xs={12}>

            <ScrollToBottom className="messages">
            {messages.map((m,i)=>{
                return(
                    <li style={{listStyleType:'none'}} key={i}> {m.user} : {m.message}</li>  
                )
            })}

            </ScrollToBottom>
            </Grid >
            
            <Grid item xs={10}   className={'chevron-down'} >
            <TextField value={message ? message: transcript }  onKeyPress={(e)=>handlePress(e)}  onChange={(e)=>setMessage(e.target.value)} style={{width:"95%"}} label="message" variant="outlined"  /><br/>
            <a style={{ color: 'inherit'}} href="your link here" onClick={(e)=>{ SpeechRecognition.startListening(); e.preventDefault()}}><MicIcon fontSize='large'/></a> 
            <a style={{ color: 'inherit'}} href="your link here" onClick={(e)=>{ SpeechRecognition.stopListening(); e.preventDefault()}}> <StopIcon fontSize='large'/></a> 
           
            </Grid>
        </Grid>
     );
}
 
export default Main;
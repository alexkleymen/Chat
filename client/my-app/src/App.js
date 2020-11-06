import React,{useEffect,useState} from 'react';
import io from 'socket.io-client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Join from '../src/components/Join/Join'
import Main from './components/Main/Main'

import './App.css'
import Register from './components/Register/Register';
const CONNECTION = "http://localhost:5000/"

function App() {
  
  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')

  


 
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/main" component={Main} />
      <Route path='/register' component={Register} />
     
    </Router>
  );
}

export default App;

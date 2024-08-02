
import { useState } from 'react';
import './App.css';
import AuthScreen from './pages/AuthScreen';
import HomeScreen from './pages/HomeScreen';

function App() {
const [loggedin, setLoggedIn] = useState(localStorage.getItem('jwt')?true:false);

  return ( <>
  {
    loggedin? <HomeScreen setLoggedIn={setLoggedIn}/> : <AuthScreen setLoggedIn={setLoggedIn}/>
  }
  </>
  
 // 
  );
}

export default App;

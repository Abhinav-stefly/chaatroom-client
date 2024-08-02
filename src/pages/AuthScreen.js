import React, { useState , useRef} from "react";
import {Box, Stack, Typography, Button, TextField, Card, CircularProgress, Alert} from '@mui/material'
import {useMutation} from '@apollo/client'
import { SIGNUP_USER, SIGNIN_USER } from "../graphql/mutation";

const AuthScreen =({setLoggedIn})=>{
const [showLogin, setShowLogin]= useState(true);
  const [formData,setFormData] = useState([]);
const [signupUser,{data : signupData,loading: l1,error:e1}] = useMutation(SIGNUP_USER);
const [loginUser,{data : loginData,loading: l2,error:e2}] = useMutation(SIGNIN_USER,{
  onCompleted(data){
    localStorage.setItem("jwt",data.signinUser.token)
    setLoggedIn(true);
  }
}
);



const authForm = useRef(null);

if(l1 || l2){
return (
<Box>
  <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  height="100vh"
  >
<CircularProgress/>
<Typography variant="h6">Authenticating the User, Please wait !!</Typography>
</Box>
</Box>


)


}


  const handleChange =  (event)=>{
    setFormData({...formData,
      [event.target.name]:event.target.value
    })
  }

const handleSubmit =(event)=>{
  event.preventDefault();
  if(showLogin){
    loginUser({variables:{userSignin:formData}})
  }
  else{
    signupUser({
      variables:{
        userNew:formData
      }
   } )
  }

}

return (
<Box component="form"
ref={authForm}
onSubmit={handleSubmit}
display="flex"
justifyContent="center"
alignItems="center"
height="80vh"


variant="outlined"
>
  <Card
  variant="outlined"
  sx={{padding:"10px", gap:"5px"}}
  >
  <Stack 
  direction='column'
  spacing ='2'
  sx={({width:"400px"})}
  >
    {signupData && <Alert severity="success">Congratulations {signupData.signupUser.firstName}... Your account has been created successfully. Go for login and Chat with your friends !!!</Alert>}
    {e1 && <Alert severity="error">Sorry...This is an error in signing up.{e1.message} Cheerup and Please try again !!!</Alert>}
    {e2 && <Alert severity="error">{e2.message} </Alert>}
    <Typography variant="h5"> Please { showLogin? "Login" : "SignUp"}</Typography>
  {!showLogin && 
    <><TextField
    name="firstName"
    label="First Name"
    variant="standard"
    onChange={handleChange}
    required
    />

<TextField
    name="lastName"
    label="Last Name"
    variant="standard"
    onChange={handleChange}
    required
    />
    </>}
    <TextField
    name="email"
    label="email"
    type="email"
    variant="standard"
    onChange={handleChange}
    required
    />
    <TextField
    name="password"
    label="password"
    type="password"
    variant="standard"
    onChange={handleChange}
    required
    />
 <Typography textAlign="center" variant="subtitle1" onClick={()=>{
  setShowLogin((preValue)=>!preValue)
  setFormData({})
  authForm.current.reset();
 }}> {showLogin? "SignUp?" : "login?"}</Typography>
    <Button variant="outlined" type="submit">{showLogin? "Login" : "SignUp"}</Button>
  </Stack> </Card>
  
</Box>

)

}
export default AuthScreen
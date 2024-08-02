import { Box, Divider, Typography, Stack } from '@mui/material'
import React from 'react'
import UserCard from './UserCard'
import LogoutIcon from '@mui/icons-material/Logout';
import { GET_ALL_USERS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const SideBar = ({setLoggedIn}) => {
 const {loading, data,error} =useQuery(GET_ALL_USERS)
 /*const users =[
{id : 1, firstName :"Abhinav", lastName : "mishra"},
{id : 1, firstName :"Harsh", lastName : "Priyadarshi"},
{id : 1, firstName :"Ratnesh", lastName : "Jha"},
  ]*/

  if(loading) return <Typography variant="h6">Loading chats</Typography>
 // if(data) return console.log(data)
    if (error) console.log(error.message)
  return (
   <Box
   backgroundColor="#f7f7f7"
   height="100vh"
   width="250px"
   padding="10px"
   >
    <Stack 
    direction ="row"
    justifyContent="space-between"
    borderBottom="3px Solid Black"
    >
    <Typography variant="h6" > Chat </Typography>
<LogoutIcon onClick={()=>{localStorage.removeItem('jwt')
  setLoggedIn(false)
}}/></Stack>
    <Divider/>
    {
      data && 
      data.users.map((item)=>{
        return <UserCard item ={item}/>
      }) 
    }
   </Box>
  )
}

export default SideBar
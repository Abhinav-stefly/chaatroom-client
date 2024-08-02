import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {AppBar, Toolbar, Box, Typography,Avatar, TextField, Stack} from '@mui/material'
import MessageCard from './MessageCard';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import SendIcon from '@mui/icons-material/Send';
import { SEND_MESSG } from '../graphql/mutation';
import { MSG_SUB } from '../graphql/subscription';
const ChatScreen = () =>
  {
    const {id, name} = useParams();
    const [text,setText]= useState("");
    const [messages,setMessages]= useState([]);
    const {data, loading, error}= useQuery(GET_MESSAGES,{
      variables:{
        receiverId : +id
      },
      onCompleted(data){
        setMessages(data.messagesByUser);
    } 
    }
  )
    const [sendMessage] =   useMutation(SEND_MESSG,
      {onCompleted(data){
        setMessages((prevMessages)=>[...prevMessages,data.createMessage])
      }}
    )
   const {data : subData}= useSubscription(MSG_SUB/*,{
onSubscriptionData({subscriptionData:{data}}){
  setMessages((prevMessages)=>[...prevMessages,data.createMessage])

}
   }*/)
  

  return (
    <Box
    flexGrow ={1}>
            <AppBar position="static"
            
            >
        <Toolbar>
        
        <Avatar
  src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`}
  sx ={{width:"32px", height:"32px"}}
  /> 
   <Typography variant='h6' margin="10px">{name}</Typography>
        </Toolbar>
      </AppBar>
      <Box backgroundColor="#f5f5f5" height="80vh" marginTop="5px" sx={{overflowY :"scroll"}}>
{
  loading? <Typography variant='h6'>loading Chats</Typography> :
  messages.map(msg=>{
    return <MessageCard text={msg.text} date={msg.createdAt} direction={msg.receiverId === +id ? "end" : "start"}/>
  })
}
          
         
          
          </Box> <Stack
          direction="row"
          margin ="7px"
          >
          <TextField
          placeholder='Enter your message here'
          variant='standard'
          fullWidth
          multiline
          rows={2}
          value ={text}
          onChange={(e)=>{setText(e.target.value)}}
          />
          <SendIcon fontSize='large' onClick={()=>{
            sendMessage({
              variables:{
                receiverId: +id,
                text : text
              }
            })
          }} />
          </Stack>
    </Box>
  )
}

export default ChatScreen
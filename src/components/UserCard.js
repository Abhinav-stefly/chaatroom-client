import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const UserCard = ({item:{firstName, lastName, id}}) => {
  const navigate =useNavigate()
  return (
<Stack
className='usercard'
direction="row"
spacing ={4}
sx={{py:1}}
onClick={()=>{navigate(`/${id}/${firstName} ${lastName}`)}}
>
  <Avatar
  src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${firstName} ${lastName}`}
  sx ={{width:"32px", height:"32px"}}
  /> <Typography variant='subtitle3'>{firstName} {lastName}</Typography>
</Stack>
  )
}

export default UserCard
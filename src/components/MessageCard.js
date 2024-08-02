import React from 'react'
import {Box, Typography} from '@mui/material'
const MessageCard = ({text, date, direction}) => {
  return (
    <Box
    display="flex"
    justifyContent={direction}
    margin="10px"
    >  <Box>
<Typography
variant='subtitle1'
backgroundColor='white'
padding='5px'
>
  {text}
</Typography>
<Typography
variant='caption'>
{new Date(date).toLocaleTimeString()}
</Typography>
    </Box>

    </Box>
  )
}

export default MessageCard
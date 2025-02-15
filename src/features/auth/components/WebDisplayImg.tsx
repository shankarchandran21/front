import { Box } from '@mui/material'
import webCircle from "../../../assets/circles_bg.png"
import WebTable from "../../../assets/Task list view 3.png"

const WebDisplayImg = () => {
  return (
    <Box sx={{width:"100%",height:"98%",flex:1,position:"relative",display:{xs:"none",sm:"block"}}}>
    <img width={"100%"} height={"100%"}  src={webCircle} alt='bg'/>
    <Box  sx={{position:"absolute",top:20,right:0,width:"75%",height:"96%",objectFit:"contain"}}>
         <img width={"100%"} height={"100%"}  src={WebTable} alt='tableBg'/>
    </Box>
</Box>
  )
}

export default WebDisplayImg
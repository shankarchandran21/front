import { Box, Grid } from '@mui/material'
import { GoogleButton } from '../../components'
import WebDisplayImg from './components/WebDisplayImg'
import MoblieBg from "../../assets/mobile_bg_onboard.png"

const Index = () => {
  
  return (
    <Grid sx={{backgroundColor:"#FFF9F9",width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",gap:10}}>

         <Box sx={{flex: { xs: "unset", md: 0.5 },display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
              <Box sx={{width:"100%",height:"98%",display: { xs: "block", sm: "block", md: "none" }}}>
                  <img style={{width:"100%",height:"100%"}} src={MoblieBg} alt='bg'/>
              </Box>
              <GoogleButton/>
        </Box> 
        <WebDisplayImg/>
    </Grid>
  )
}

export default Index
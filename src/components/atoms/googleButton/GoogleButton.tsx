
import { Box, Button, Grid, Typography } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Google from "../../../assets/google.png"
import { container } from './styles';
import {signInWithGooglePopup} from "../../../utils/firebase.utils"
import authFetch from '../../../service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAuth } from '../../../features/auth/authSlice';
const GoogleButton = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
  const handleSignin = async () => {
    try {
        const result = await signInWithGooglePopup();
        const{uid,displayName,photoURL,email,accessToken}= result?.user
        const res = await authFetch.post('/api/user/login', {
          idToken: accessToken,
          uid,
          displayName,
          photoURL,
          email,         
        });
       if(res.status === 200){
          navigate("/")
          dispatch(userAuth({idToke:accessToken,uid,displayName,photoURL,email}))
       }
    } catch (error) {
        console.error('Google Login Failed:', error);
    }
}

  return (
    <Grid  sx={container}>
        <Box sx={{
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            gap:1
        }}>
                <AssignmentOutlinedIcon sx={{ color: "#7B1984",fontSize:"25px" }} />
                <Typography sx={{fontWeight:"700",color: "#7B1984",fontSize:"26.19px"}} variant='h6'>TaskBuddy</Typography>
        </Box>
        <Box sx={{
             display:"flex",
             justifyContent: "center",
             alignItems: "center",
            
        }}>
                <Typography sx={{width:{sx:"100%",md:"75%",fontSize:"11px",textAlign: { xs: "center", md: "left" },}}}>Streamline your workflow and track progress effortlessly with our all-in-one task management app</Typography>
        </Box>
        <Box sx={{
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            
        }}>
                
                <Button onClick={handleSignin} sx={{width:"80%",backgroundColor:"#000",borderRadius:"12px",mt:2}} startIcon={ <img style={{width:"20px",height:"20px"}} src={Google} alt='logo'/>} variant="contained"> 
                   
                     Continue With Google
                </Button>
        </Box>
          
    </Grid>
  )
}

export default GoogleButton
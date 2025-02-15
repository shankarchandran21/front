
import { Avatar, Box, Button, Grid, Grid2, Popover, Typography } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from 'react-redux';
import authFetch from '../../../service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logoutUserAuth } from '../../../features/auth/authSlice';


const Header = () => {
  const {displayName,photoURL} = useSelector((state)=>state.auth)
const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const navigate = useNavigate()

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClosePopover = () => {
    setAnchorEl(null);
  };
      const handleLogout =async()=>{
          navigate("/auth")
          dispatch(logoutUserAuth())

          await authFetch.put("/api/user/logout")

      }
  return (
      <>
            <Grid sx={{
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
    }} p={2}>
        <Box sx={{
            display:"flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap:1
        }}>
                <AssignmentOutlinedIcon sx={{ fontSize:"25px" }} />
                <Typography sx={{fontSize:"24px",fontWeight:600,color:"#2F2F2F"}} variant='h6'>TaskBuddy</Typography>
        </Box>
        <Box sx={{display:{xs:"none",md:"flex"},justifyContent:"center",alignItems:"center",gap:1}}>
              
             <Avatar alt={displayName} src={photoURL} />
             <Typography sx={{color:"#00000099",fontSize:"16px",fontWeight:700}}>{displayName}</Typography>
        </Box>
        <Box sx={{display:{xs:"block",md:"none"}}}>
            <Avatar alt={displayName} src={photoURL} onClick={handleAvatarClick} />
            <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '16px' }}>
          <Typography variant="h6">{displayName}</Typography>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleLogout}
            style={{ marginTop: '8px' }}
          >
            Logout
          </Button>
        </div>
      </Popover>
        </Box>
    </Grid>
    <Grid2 sx={{
       display:{xs:"none",md:"flex"},
       justifyContent:"flex-end",
       width:"100%",
       pr:2
    }}>
    <Button
      onClick={handleLogout}
      variant="outlined"
      startIcon={<LogoutIcon />}
      sx={{
        borderRadius: "12px",
        borderColor: "#D1A3D1", 
        color: "#000",
        backgroundColor: "#FCE4EC",
        textTransform: "none",
        fontWeight: "bold",
        padding: "6px 16px",
       
      }}
    >
      Logout
    </Button>
    </Grid2>
      </>
  )
}

export default Header
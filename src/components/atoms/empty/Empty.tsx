
import NotFound from "../../../assets/Results not found.png"
import { Grid } from '@mui/material';
const Empty = () => {
  return (
    <Grid sx={{
        display: 'flex',
        justifyContent:"center",
        alignItems:"center",
        mt:5
    }}>
                <img  style={{objectFit:"contain",height:"200px"}} src={NotFound} alt='not found'/>
    </Grid>
  )
}

export default Empty
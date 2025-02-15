import React from 'react'
import { Grid } from '@mui/material';
import Header from '../components/molecules/header/Header';
import { Navigate, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Grid>
        <Header/>
        {true ?<Outlet/>:<Navigate to="/auth" />}
    </Grid>
  )
}

export default Layout
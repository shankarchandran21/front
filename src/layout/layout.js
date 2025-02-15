import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@mui/material';
import Header from '../components/molecules/header/Header';
import { Navigate, Outlet } from 'react-router-dom';
const Layout = () => {
    return (_jsxs(Grid, { children: [_jsx(Header, {}), true ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/auth" })] }));
};
export default Layout;

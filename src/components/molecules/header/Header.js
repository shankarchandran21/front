import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Box, Button, Grid, Grid2, Popover, Typography } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from 'react-redux';
import authFetch from '../../../service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logoutUserAuth } from '../../../features/auth/authSlice';
const Header = () => {
    const { displayName, photoURL } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const navigate = useNavigate();
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        navigate("/auth");
        dispatch(logoutUserAuth());
        await authFetch.put("/api/user/logout");
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Grid, { sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }, p: 2, children: [_jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 1
                        }, children: [_jsx(AssignmentOutlinedIcon, { sx: { fontSize: "25px" } }), _jsx(Typography, { sx: { fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }, variant: 'h6', children: "TaskBuddy" })] }), _jsxs(Box, { sx: { display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center", gap: 1 }, children: [_jsx(Avatar, { alt: displayName, src: photoURL }), _jsx(Typography, { sx: { color: "#00000099", fontSize: "16px", fontWeight: 700 }, children: displayName })] }), _jsxs(Box, { sx: { display: { xs: "block", md: "none" } }, children: [_jsx(Avatar, { alt: displayName, src: photoURL, onClick: handleAvatarClick }), _jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClosePopover, anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }, transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }, children: _jsxs("div", { style: { padding: '16px' }, children: [_jsx(Typography, { variant: "h6", children: displayName }), _jsx(Button, { variant: "outlined", color: "secondary", fullWidth: true, onClick: handleLogout, style: { marginTop: '8px' }, children: "Logout" })] }) })] })] }), _jsx(Grid2, { sx: {
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-end",
                    width: "100%",
                    pr: 2
                }, children: _jsx(Button, { onClick: handleLogout, variant: "outlined", startIcon: _jsx(LogoutIcon, {}), sx: {
                        borderRadius: "12px",
                        borderColor: "#D1A3D1",
                        color: "#000",
                        backgroundColor: "#FCE4EC",
                        textTransform: "none",
                        fontWeight: "bold",
                        padding: "6px 16px",
                    }, children: "Logout" }) })] }));
};
export default Header;

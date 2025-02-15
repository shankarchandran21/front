import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import webCircle from "../../../assets/circles_bg.png";
import WebTable from "../../../assets/Task list view 3.png";
const WebDisplayImg = () => {
    return (_jsxs(Box, { sx: { width: "100%", height: "98%", flex: 1, position: "relative", display: { xs: "none", sm: "block" } }, children: [_jsx("img", { width: "100%", height: "100%", src: webCircle, alt: 'bg' }), _jsx(Box, { sx: { position: "absolute", top: 20, right: 0, width: "75%", height: "96%", objectFit: "contain" }, children: _jsx("img", { width: "100%", height: "100%", src: WebTable, alt: 'tableBg' }) })] }));
};
export default WebDisplayImg;

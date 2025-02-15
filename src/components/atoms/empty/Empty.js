import { jsx as _jsx } from "react/jsx-runtime";
import NotFound from "../../../assets/Results not found.png";
import { Grid } from '@mui/material';
const Empty = () => {
    return (_jsx(Grid, { sx: {
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            mt: 5
        }, children: _jsx("img", { style: { objectFit: "contain", height: "200px" }, src: NotFound, alt: 'not found' }) }));
};
export default Empty;

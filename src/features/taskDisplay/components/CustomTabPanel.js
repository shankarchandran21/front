import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@mui/material";
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (_jsx("div", { role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}`, ...other, children: value === index && _jsx(Box, { sx: { p: 2 }, children: children }) }));
}
export default CustomTabPanel;

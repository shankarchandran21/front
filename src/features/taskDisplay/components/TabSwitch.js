import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ListIcon from '@mui/icons-material/List';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TabSwitch = ({ value, handleChange }) => {
    return (_jsx(Box, { sx: { width: '100%', display: { xs: "none", md: "block" } }, children: _jsx(Box, { children: _jsxs(Tabs, { value: value, onChange: handleChange, "aria-label": "customized tabs", sx: {
                    minHeight: '36px',
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'black',
                        height: '2px',
                    },
                }, children: [_jsx(Tab, { icon: _jsx(ListIcon, { sx: { fontSize: '16px' } }), iconPosition: "start", label: "List", ...a11yProps(0), sx: {
                            fontSize: '14px',
                            fontWeight: value === 0 ? 'bold' : 'normal',
                            textTransform: 'none',
                            minHeight: '30px',
                            color: value === 0 ? '#000 !important' : 'black',
                            borderBottom: value === 0 ? '2px solid black' : 'none',
                            '&.Mui-selected': {
                                color: '#000 !important',
                            },
                        } }), _jsx(Tab, { icon: _jsx(ViewKanbanIcon, { sx: { fontSize: '16px' } }), iconPosition: "start", label: "Board", ...a11yProps(1), sx: {
                            fontSize: '14px',
                            fontWeight: value === 1 ? 'bold' : 'normal',
                            textTransform: 'none',
                            minHeight: '36px',
                            color: value === 1 ? '#000 !important' : 'black',
                            borderBottom: value === 1 ? '2px solid black' : 'none',
                            '&.Mui-selected': {
                                color: '#000 !important',
                            },
                        } })] }) }) }));
};
export default TabSwitch;

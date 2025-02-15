import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
const TaskCard = ({ task, setAnchorElEditDelete, handleDeleteTask, setTasks }) => {
    const handleMenuClick = (event) => {
        setAnchorElEditDelete({ anchor: event.currentTarget, id: task.id });
    };
    const handleDelete = () => {
        handleDeleteTask(task.id, setTasks);
    };
    return (_jsx(Card, { sx: { margin: 1 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", children: task.name }), _jsxs(Typography, { variant: "body2", children: ["Due: ", task.dueDate.day, "/", task.dueDate.month, "/", task.dueDate.year] }), _jsx(IconButton, { onClick: handleMenuClick, children: _jsx(MoreHorizIcon, {}) }), _jsxs(Menu, { anchorEl: null, open: false, onClose: () => setAnchorElEditDelete({ anchor: null, id: null }), children: [_jsxs(MenuItem, { children: [_jsx(BorderColorIcon, {}), " Edit"] }), _jsxs(MenuItem, { onClick: handleDelete, children: [_jsx(DeleteIcon, {}), " Delete"] })] })] }) }));
};
export default TaskCard;

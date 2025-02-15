import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Popover, Select, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from '../../../components/atoms/calendar/Calendar';
import { formatDueDate } from './functionality';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTaskApi, editTaskApi } from "../api";
const AddEditTask = ({ setIsModal, setTasks, editTask, tasks }) => {
    const [text, setText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDueDate, setSelectedDueDate] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = React.useState('');
    const [oldStatus, setOldStatus] = useState("");
    useEffect(() => {
        if (editTask) {
            const findTaskById = (id) => {
                for (const status in tasks) {
                    const task = tasks[status].find((task) => task.id === id);
                    if (task) {
                        return { task, status };
                    }
                }
                return null;
            };
            const result = findTaskById(editTask);
            setCategory(result.task.category);
            setText(result?.task?.description || "");
            setStatus(result?.status);
            setOldStatus(result?.status);
            setTitle(result?.task.name);
            setSelectedDueDate(result?.task.dueDate);
        }
        else {
            setCategory("");
            setText("");
            setStatus("");
            setOldStatus("");
            setTitle("");
            setSelectedDueDate(null);
        }
    }, [editTask]);
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleChange = (event) => {
        if (event.target.value.length <= 300) {
            setText(event.target.value);
        }
    };
    const handleSubmit = async () => {
        const updatedTask = {
            // id: editTask || Date.now(),
            name: title,
            description: text,
            category: category,
            status: status,
            dueDate: selectedDueDate
        };
        if (title && text && category && status && selectedDueDate) {
            setIsModal(false);
            if (editTask) {
                setTasks((prevTasks) => {
                    const newTasks = { ...prevTasks };
                    if (oldStatus && oldStatus !== status) {
                        newTasks[oldStatus] = newTasks[oldStatus].filter((task) => task.id !== editTask);
                        newTasks[status] = [...(newTasks[status] || []), { ...updatedTask, id: editTask }];
                    }
                    else {
                        newTasks[status] = newTasks[status].map((task) => task.id === editTask ? { ...updatedTask, id: editTask } : task);
                    }
                    return newTasks;
                });
                await editTaskApi({
                    id: editTask,
                    data: updatedTask
                });
            }
            else {
                const res = await createTaskApi(updatedTask);
                if (res?.status === 200) {
                    console.log(res.data);
                    setTasks((prevTasks) => ({
                        ...prevTasks,
                        [res.data.status]: [...(prevTasks[res.data.status] || []), res.data],
                    }));
                }
            }
        }
        else {
            toast.error('😥 All the fields are required!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };
    return (_jsxs(Box, { sx: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            width: editTask ? "75%" : "50%",
            height: "auto",
            outline: "none",
            borderRadius: 4,
        }, children: [_jsx(ToastContainer, {}), _jsxs(Box, { sx: { display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }, children: [_jsxs(Typography, { sx: { fontWeight: 600, fontSize: "24px" }, children: [editTask ? "Edit" : "Create", " Task"] }), _jsx(CloseIcon, { onClick: () => setIsModal(false), sx: { fontSize: "24px", cursor: "pointer" } })] }), _jsx(Divider, {}), _jsxs(Grid, { sx: {
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%",
                }, children: [_jsxs(Grid, { sx: { maxHeight: '500px', overflowY: 'auto', p: 2, width: "100%", flex: { xs: 1, md: editTask ? 0.5 : 1 } }, children: [_jsx(TextField, { value: title, onChange: (e) => setTitle(e.target.value), fullWidth: true, size: "small", sx: {
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: '#f0f0f0',
                                        '& fieldset': { borderColor: '#a0a0a0' },
                                        '&:hover fieldset': { borderColor: '#a0a0a0' },
                                        '&.Mui-focused fieldset': { borderColor: '#a0a0a0' },
                                    },
                                } }), _jsx(Box, { sx: { mt: 2 }, children: _jsxs(Box, { sx: {
                                        border: '1px solid #ccc',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        minHeight: '150px',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }, children: [_jsx(TextField, { fullWidth: true, multiline: true, variant: "standard", value: text, onChange: handleChange, InputProps: { disableUnderline: true }, placeholder: "Write something...", sx: { '& textarea': { height: '80px', resize: 'none' } } }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', marginTop: '5px' }, children: [_jsx(IconButton, { size: "small", children: _jsx(FormatBoldIcon, {}) }), _jsx(IconButton, { size: "small", children: _jsx(FormatItalicIcon, {}) }), _jsx(IconButton, { size: "small", children: _jsx(StrikethroughSIcon, {}) }), _jsx(IconButton, { size: "small", children: _jsx(FormatListBulletedIcon, {}) }), _jsx(IconButton, { size: "small", children: _jsx(FormatAlignLeftIcon, {}) }), _jsxs(Typography, { sx: { marginLeft: 'auto', color: 'gray' }, children: [text.length, "/300 characters"] })] })] }) }), _jsxs(Grid, { sx: { display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }, children: [_jsxs(Box, { children: [_jsx(Typography, { sx: { fontWeight: 600, fontSize: "12px", color: "#00000099" }, children: "Task Category*" }), _jsxs(Grid, { sx: { display: 'flex', gap: 2, mt: 1 }, children: [_jsx(Button, { onClick: () => setCategory("Work"), sx: { borderRadius: "20px", backgroundColor: category === "Work" ? "#7B1984" : "transparent", color: category === "Work" ? "#fff" : "#090909", border: "1px solid #00000030", fontSize: "10px", fontWeight: 700 }, children: "Work" }), _jsx(Button, { onClick: () => setCategory("Personal"), sx: { borderRadius: "20px", color: category === "Personal" ? "#fff" : "#090909", border: "1px solid #00000030", fontSize: "10px", fontWeight: 700, backgroundColor: category === "Personal" ? "#7B1984" : "transparent" }, children: "Personal" })] })] }), _jsxs(Box, { children: [_jsx(Typography, { sx: { fontWeight: 600, fontSize: "12px", color: "#00000099" }, children: "Due on*" }), _jsxs(Box, { onClick: (e) => setAnchorEl(e.currentTarget), sx: { cursor: "pointer", display: "flex", alignItems: "center", border: "1px solid #00000021", backgroundColor: "#F1F1F15C", p: 1, borderRadius: "8px", mt: 1 }, children: [_jsx(Typography, { sx: { color: "#000000", fontSize: "12px", fontWeight: 600 }, children: selectedDueDate ? formatDueDate(selectedDueDate) : "DD/MM/YY" }), _jsx(DateRangeIcon, { sx: { fontSize: "14px", ml: 1 } })] }), _jsx(Popover, { open: Boolean(anchorEl), anchorEl: anchorEl, onClose: () => setAnchorEl(null), anchorOrigin: { vertical: "bottom", horizontal: "left" }, children: _jsx(Calendar, { selectedDueDate: selectedDueDate, setSelectedDueDate: setSelectedDueDate }) })] }), _jsxs(Box, { children: [_jsx(Typography, { sx: { fontWeight: 600, fontSize: "12px", color: "#00000099" }, children: "Task Status*" }), _jsxs(Select, { value: status, onChange: handleChangeStatus, displayEmpty: true, sx: { height: "32px", mt: 1, width: "155px", borderRadius: "8px" }, children: [_jsx(MenuItem, { disabled: true, value: "", children: _jsx("em", { children: "Choose" }) }), _jsx(MenuItem, { value: "In-Progress", children: "IN-PROGRESS" }), _jsx(MenuItem, { value: "Todo", children: "TO-DO" }), _jsx(MenuItem, { value: "Completed", children: "COMPLETED" })] })] })] }), _jsx(Box, { mt: 2, children: _jsx(Button, { fullWidth: true, sx: { backgroundColor: "#F1F1F1", fontWeight: 500, fontSize: "12px" }, children: "Drop your files here or Upload" }) })] }), editTask && (_jsxs(Grid, { sx: { borderLeft: '1px solid #ccc', display: { xs: "none", md: "block" }, flex: 0.5, }, children: [_jsx(Typography, { sx: { fontWeight: 600, mb: 2, p: "10px 20px 0px 20px" }, children: "Activity" }), _jsx(Divider, {}), _jsxs(Box, { sx: { minHeight: '400px', overflowY: 'auto', p: 2, backgroundColor: "#F1F1F1", height: "100%" }, children: [_jsxs(Box, { sx: {
                                            display: "flex",
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                        }, children: [_jsx(Typography, { variant: "body2", sx: { mb: 1, fontWeight: 400, fontSize: "10px" }, children: "You created this task" }), _jsx(Typography, { sx: { mb: 1, fontWeight: 400, fontSize: "10px", color: "#1E212A" }, children: "Dec 27 at 1:15 pm" })] }), _jsxs(Box, { sx: {
                                            display: "flex",
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                        }, children: [_jsx(Typography, { variant: "body2", sx: { mb: 1, fontWeight: 400, fontSize: "10px" }, children: "You changed status from in progress to complete" }), _jsx(Typography, { sx: { mb: 1, fontWeight: 400, fontSize: "10px", color: "#1E212A" }, children: "Dec 28 at 1:15 pm" })] }), _jsxs(Box, { sx: {
                                            display: "flex",
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                        }, children: [_jsx(Typography, { sx: { mb: 1, fontWeight: 400, fontSize: "10px" }, variant: "body2", children: "You uploaded file" }), _jsx(Typography, { sx: { mb: 1, fontWeight: 400, fontSize: "10px" }, children: "Dec 29 at 1:15 pm" })] })] })] }))] }), _jsxs(Box, { sx: { backgroundColor: "#F1F1F1", display: "flex", justifyContent: "flex-end", alignItems: "center", p: 1, gap: 2 }, children: [_jsx(Button, { onClick: () => setIsModal(false), sx: { fontWeight: 700, fontSize: "14px", backgroundColor: "#FFFFFF", color: "#000", borderRadius: "20px", border: "1px solid #00000030" }, children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, sx: { fontWeight: 700, fontSize: "14px", backgroundColor: "#7B1984", color: "#fff", borderRadius: "20px", border: "1px solid #00000030" }, children: "Create" })] })] }));
};
export default AddEditTask;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Menu, MenuItem, Popover, TextField, Typography } from '@mui/material';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Calendar from '../../../components/atoms/calendar/Calendar';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { formatDueDate } from './functionality';
import { schema } from '../schema';
import { createTaskApi } from '../api';
const AddTask = ({ setIsAddTask, setTasks }) => {
    const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // 
        defaultValues: {
            title: '',
            status: '',
            category: '',
            dueDate: null
        }
    });
    const [selectedDueDate, setSelectedDueDate] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElStatus, setAnchorElStatus] = useState(null);
    const [anchorElStatusCategory, setAnchorElStatusCategory] = useState(null);
    useEffect(() => {
        if (selectedDueDate) {
            setValue("dueDate", selectedDueDate);
        }
    }, [selectedDueDate]);
    const onSubmit = async (data) => {
        const statusMap = {
            "TO-DO": "Todo",
            "IN-PROGRESS": "In-Progress",
            "COMPLETED": "Completed",
        };
        const taskStatus = statusMap[data.status ?? "TO-DO"];
        const newTask = {
            name: data.title,
            dueDate: data.dueDate,
            status: data.status,
            category: data.category,
        };
        const res = await createTaskApi(newTask);
        if (res.status === 200) {
            setTasks((prevTasks) => ({
                ...prevTasks,
                [res?.data.status]: [...(prevTasks[res?.data.status] || []), res.data],
            }));
            reset();
            setIsAddTask(false);
        }
    };
    return (_jsx(Grid, { p: 2, sx: { backgroundColor: "#F1F1F1", display: { xs: "none", md: "block" } }, children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs(Grid, { sx: { display: 'flex', justifyContent: "space-between", alignItems: "center", width: "75%" }, children: [_jsx(Box, { children: _jsx(Controller, { name: "title", control: control, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, placeholder: "Task title", variant: "standard", sx: {
                                        "& .MuiInput-underline:before, &:hover .MuiInput-underline:before, .MuiInput-underline:after": { borderBottom: "none" }
                                    }, error: !!errors.title, helperText: errors.title?.message })) }) }), _jsxs(Box, { children: [_jsx(Button, { onClick: (e) => setAnchorEl(e.currentTarget), variant: "outlined", startIcon: _jsx(CalendarTodayIcon, {}), sx: {
                                        borderRadius: "20px",
                                        textTransform: "none",
                                        fontWeight: "normal",
                                        color: "#00000099",
                                        borderColor: "#00000099",
                                        "&:hover": { borderColor: "#00000099" },
                                    }, children: selectedDueDate ? formatDueDate(selectedDueDate) : "Add date" }), _jsx(Popover, { open: Boolean(anchorEl), anchorEl: anchorEl, onClose: () => setAnchorEl(null), anchorOrigin: { vertical: "bottom", horizontal: "left" }, children: _jsx(Calendar, { selectedDueDate: selectedDueDate, setSelectedDueDate: setSelectedDueDate }) }), _jsx(Typography, { sx: { color: "red", fontSize: "12px" }, children: errors.dueDate?.message })] }), _jsxs(Box, { children: [_jsx(Button, { onClick: (e) => setAnchorElStatus(e.currentTarget), variant: "outlined", sx: {
                                        border: "1px solid #00000099",
                                        color: "#000",
                                        borderRadius: "50%",
                                        width: 40,
                                        height: 40,
                                        minWidth: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }, children: _jsx(AddIcon, { sx: { color: "#000" } }) }), _jsxs(Menu, { PaperProps: {
                                        sx: {
                                            boxShadow: "none",
                                            border: "1px solid #D1A3D1",
                                            borderRadius: "10px",
                                            backgroundColor: "#FFF9F9",
                                            marginTop: -1,
                                            marginLeft: 5
                                        },
                                    }, anchorEl: anchorElStatus, open: Boolean(anchorElStatus), onClose: () => setAnchorElStatus(null), children: [_jsx(MenuItem, { sx: { fontWeight: 600, fontSize: "12px" }, onClick: () => {
                                                setValue("status", "In-Progress");
                                                setAnchorElStatus(null);
                                            }, value: "In-Progress", children: "IN-PROGRESS" }), _jsx(MenuItem, { sx: { fontWeight: 600, fontSize: "12px" }, onClick: () => {
                                                setValue("status", "Todo");
                                                setAnchorElStatus(null);
                                            }, value: "Todo", children: "TO-DO" }), _jsx(MenuItem, { sx: { fontWeight: 600, fontSize: "12px" }, onClick: () => {
                                                setValue("status", "Completed");
                                                setAnchorElStatus(null);
                                            }, value: "Completed", children: "COMPLETED" })] }), _jsx(Typography, { sx: { color: "red", fontSize: "12px" }, children: errors.status?.message })] }), _jsxs(Box, { children: [_jsx(Button, { onClick: (e) => setAnchorElStatusCategory(e.currentTarget), variant: "outlined", sx: {
                                        border: "1px solid #00000099",
                                        color: "#000",
                                        borderRadius: "50%",
                                        width: 40,
                                        height: 40,
                                        minWidth: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }, children: _jsx(AddIcon, { sx: { color: "#000" } }) }), _jsx(Menu, { PaperProps: {
                                        sx: {
                                            boxShadow: "none",
                                            border: "1px solid #D1A3D1",
                                            borderRadius: "10px",
                                            backgroundColor: "#FFF9F9",
                                            marginTop: -1,
                                            marginLeft: 5
                                        },
                                    }, anchorEl: anchorElStatusCategory, open: Boolean(anchorElStatusCategory), onClose: () => setAnchorElStatusCategory(null), children: ["Work", "Personal"].map((option) => (_jsx(MenuItem, { sx: { fontWeight: 600, fontSize: "12px" }, onClick: () => {
                                            setValue("category", option);
                                            setAnchorElStatusCategory(null);
                                        }, children: option }, option))) }), _jsx(Typography, { sx: { color: "red", fontSize: "12px" }, children: errors.category?.message })] })] }), _jsxs(Box, { sx: { display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2, mt: 2 }, children: [_jsx(Button, { type: "submit", sx: { backgroundColor: "#7B1984", borderRadius: 20, fontWeight: 700, fontSize: "14px", boxShadow: "none" }, endIcon: _jsx(SubdirectoryArrowLeftIcon, {}), variant: "contained", children: "Add" }), _jsx(Button, { onClick: () => setIsAddTask(false), sx: { fontWeight: 700, fontSize: "14px", color: "#000" }, children: "Cancel" })] })] }) }));
};
export default AddTask;

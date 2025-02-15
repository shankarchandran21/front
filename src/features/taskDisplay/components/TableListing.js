import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, MenuItem, Collapse, IconButton, Typography, Box, Button, Popover, List, ListItem, ListItemButton, Menu, Grid, Modal } from "@mui/material";
import { ExpandLess, ExpandMore, DragIndicator, } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { formatDueDate, handleDeleteTask } from "./functionality";
import AddIcon from '@mui/icons-material/Add';
import AddTask from "./addTask";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEditTask from "./AddEditTask";
import { deleteTasksApi, editStatusApi, editTaskDragApi, editTasksStatusApi } from "../api";
const TaskTable = ({ tasks, setTasks }) => {
    const [isModal, setIsModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElEditDelete, setAnchorElEditDelete] = React.useState({ anchor: null, id: null });
    const [anchorEl2, setAnchorEl2] = useState({});
    const [isAddTask, setIsAddTask] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const handleClick = (event, taskId) => {
        setAnchorEl2((prev) => ({ ...prev, [taskId]: event.currentTarget }));
    };
    const handleClose = (taskId) => {
        setAnchorEl2((prev) => ({ ...prev, [taskId]: null }));
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const handleStatusChangeMultiple = async (newStatus) => {
        setTasks((prev) => {
            let tasksToMove = [];
            const updatedTasks = {};
            Object.keys(prev).forEach((key) => {
                updatedTasks[key] = prev[key].filter((task) => {
                    if (selectedTasks.includes(task.id)) {
                        tasksToMove.push({ ...task, status: newStatus });
                        return false;
                    }
                    return true;
                });
            });
            const targetSection = newStatus === "TO-DO" ? "Todo" :
                newStatus === "IN-PROGRESS" ? "In-Progress" :
                    "Completed";
            updatedTasks[targetSection] = [...(updatedTasks[targetSection] || []), ...tasksToMove];
            return updatedTasks;
        });
        const res = await editTasksStatusApi({
            tasksId: selectedTasks,
            status: newStatus === "TO-DO"
                ? "Todo"
                : newStatus === "IN-PROGRESS"
                    ? "In-Progress"
                    : "Completed"
        });
        if (res.status === 200) {
            setSelectedTasks([]);
        }
        handleClosePopover();
    };
    const open = Boolean(anchorEl);
    const [expanded, setExpanded] = useState({
        "Todo": true,
        "In-Progress": true,
        "Completed": true,
    });
    const [selectedTasks, setSelectedTasks] = useState([]);
    const toggleExpand = (section) => {
        setExpanded({ ...expanded, [section]: !expanded[section] });
    };
    const handleStatusChange = async (taskId, newStatus) => {
        setTasks((prev) => {
            let taskToMove = null;
            const updatedTasks = {};
            Object.keys(prev).forEach((key) => {
                updatedTasks[key] = prev[key].filter((task) => {
                    if (task.id === taskId) {
                        taskToMove = { ...task, status: newStatus };
                        return false;
                    }
                    return true;
                });
            });
            if (taskToMove) {
                const targetSection = newStatus === "TO-DO" ? "Todo" :
                    newStatus === "IN-PROGRESS" ? "In-Progress" :
                        "Completed";
                updatedTasks[targetSection] = [...(updatedTasks[targetSection] || []), taskToMove];
            }
            return updatedTasks;
        });
        await editStatusApi({ id: taskId, status: newStatus === "TO-DO"
                ? "Todo"
                : newStatus === "IN-PROGRESS"
                    ? "In-Progress"
                    : "Completed" });
        setAnchorEl2({});
    };
    const handleTaskSelection = (taskId) => {
        setSelectedTasks((prev) => prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]);
    };
    const handleDeleteSelected = async () => {
        await deleteTasksApi({ tasksId: selectedTasks });
        setTasks((prev) => {
            const updatedTasks = {};
            Object.keys(prev).forEach((key) => {
                updatedTasks[key] = prev[key].filter((task) => !selectedTasks.includes(task.id));
            });
            return updatedTasks;
        });
        setSelectedTasks([]);
    };
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        await editTaskDragApi(draggableId, {
            status: destination.droppableId,
            index: destination.index
        });
        if (!destination)
            return;
        let updatedTasks = { ...tasks };
        const sourceColumn = [...(updatedTasks[source.droppableId] || [])];
        if (!sourceColumn.length)
            return;
        const taskIndex = sourceColumn.findIndex((task) => task.id === draggableId);
        if (taskIndex === -1)
            return;
        const [movedTask] = sourceColumn.splice(taskIndex, 1);
        if (!movedTask)
            return;
        console.log(draggableId, destination.droppableId, destination.index);
        if (source.droppableId === destination.droppableId) {
            // Moving within the same column
            sourceColumn.splice(destination.index, 0, movedTask);
        }
        else {
            // Moving to another column
            const destinationColumn = [...(updatedTasks[destination.droppableId] || [])];
            const updatedTask = { ...movedTask, status: destination.droppableId };
            destinationColumn.splice(destination.index, 0, updatedTask);
            updatedTasks[destination.droppableId] = destinationColumn;
        }
        updatedTasks[source.droppableId] = sourceColumn;
        // Update the state after the API call
        setTasks(updatedTasks);
    };
    return (_jsx(DragDropContext, { onDragEnd: onDragEnd, children: _jsxs(TableContainer, { children: [Object.keys(tasks).map((section) => (_jsxs(Box, { sx: { mb: 4, borderRadius: "10px", overflow: "hidden" }, children: [_jsxs(Box, { sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: section === "Todo" ? "#FAC3FF" :
                                    section === "In-Progress" ? "#81D4FA" :
                                        "#CEFFCC",
                            }, children: [_jsxs(Typography, { variant: "h6", onClick: () => toggleExpand(section), sx: {
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        padding: 1,
                                        cursor: "pointer",
                                    }, children: [section, " (", tasks[section].length, ")"] }), _jsx(Box, { onClick: () => toggleExpand(section), sx: { pr: 2, cursor: "pointer" }, children: expanded[section] ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {}) })] }), (section === "Todo" && expanded[section]) && _jsxs(Grid, { sx: { display: { xs: "none", md: "block" } }, children: [_jsx(Box, { sx: { backgroundColor: "#F1F1F1" }, children: _jsx(Button, { onClick: () => setIsAddTask(true), sx: { color: "#000" }, startIcon: _jsx(AddIcon, { sx: { color: "#7B1984" } }), children: "Add Task" }) }), isAddTask && (_jsx(AddTask, { setTasks: setTasks, setIsAddTask: setIsAddTask }))] }), _jsx(Collapse, { in: expanded[section], children: _jsx(Droppable, { droppableId: section, children: (provided) => (_jsx(TableContainer, { sx: { minHeight: "100px", backgroundColor: "#F1F1F1" }, ref: provided.innerRef, ...provided.droppableProps, children: tasks[section].length <= 0 ? _jsx(Box, { sx: {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "250px",
                                        }, children: _jsxs(Typography, { children: ["No Task in ", section] }) }) : (_jsx(Table, { size: "small", children: _jsxs(TableBody, { children: [tasks[section].map((task, index) => (_jsx(Draggable, { draggableId: task.id.toString(), index: index, children: (provided, snapshot) => (_jsxs(TableRow, { ref: provided.innerRef, ...provided.draggableProps, sx: { backgroundColor: snapshot.isDragging ? "#FFFFFF" : "#F1F1F1",
                                                            color: "#000",
                                                            display: snapshot.isDragging ? "flex" : "table-row",
                                                            alignItems: "center"
                                                        }, children: [_jsxs(TableCell, { sx: { p: 0, textDecoration: section === "Completed" ? "line-through" : "none" }, width: "30%", children: [_jsx(Checkbox, { checked: selectedTasks.includes(task.id), onChange: () => handleTaskSelection(task.id) }), _jsx(IconButton, { sx: { display: { xs: "none", md: "inline-flex" } }, ...provided.dragHandleProps, children: _jsx(DragIndicator, {}) }), _jsx(IconButton, { sx: { color: section === "Completed" ? "green" : "grey" }, children: _jsx(CheckCircleIcon, {}) }), task.name] }), _jsx(TableCell, { sx: { display: { xs: "none", md: "table-cell" } }, width: "20%", align: "left", children: formatDueDate(task.dueDate) }), _jsxs(TableCell, { sx: { display: { xs: "none", md: "table-cell" } }, width: "20%", align: "left", children: [_jsx(Button, { sx: { backgroundColor: "#DDDADD", border: "1px solid #DDDADD", color: "#000" }, onClick: (e) => handleClick(e, task.id), variant: "outlined", children: task.status }), _jsx(Menu, { PaperProps: {
                                                                            sx: {
                                                                                boxShadow: "none",
                                                                                border: "1px solid #D1A3D1",
                                                                                borderRadius: "10px",
                                                                                backgroundColor: "#FFF9F9",
                                                                                marginTop: 1,
                                                                                marginLeft: 5
                                                                            },
                                                                        }, open: Boolean(anchorEl2[task.id]), anchorEl: anchorEl2[task.id], onClose: () => handleClose(task.id), anchorOrigin: {
                                                                            vertical: "bottom",
                                                                            horizontal: "left",
                                                                        }, children: ["TO-DO", "IN-PROGRESS", "COMPLETED"].map((option) => (_jsx(MenuItem, { sx: { fontWeight: 600, fontSize: "12px" }, onClick: () => handleStatusChange(task.id, option), children: option }, option))) })] }), _jsx(TableCell, { sx: { display: { xs: "none", md: "table-cell" } }, width: "20%", children: task.category }), _jsxs(TableCell, { sx: { display: { xs: "none", md: "table-cell" } }, align: "right", width: "20%", children: [_jsx(Button, { sx: { color: "#000" }, onClick: (e) => setAnchorElEditDelete({ anchor: e.currentTarget, id: task.id }), children: _jsx(MoreHorizIcon, {}) }), _jsxs(Menu, { PaperProps: {
                                                                            sx: {
                                                                                boxShadow: "none",
                                                                                border: "1px solid #D1A3D1",
                                                                                borderRadius: "10px",
                                                                                backgroundColor: "#FFF9F9",
                                                                                marginTop: -1,
                                                                                marginLeft: -8
                                                                            },
                                                                        }, anchorEl: anchorElEditDelete.anchor, open: Boolean(anchorElEditDelete.anchor), onClose: () => setAnchorElEditDelete({ anchor: null, id: null }), children: [_jsxs(MenuItem, { onClick: () => {
                                                                                    setEditTask(anchorElEditDelete?.id);
                                                                                    setIsModal(true);
                                                                                }, sx: { fontWeight: 600, fontSize: "12px",
                                                                                    display: "flex",
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center",
                                                                                    gap: 2
                                                                                }, children: [_jsx(BorderColorIcon, { sx: { fontSize: "16px" } }), " Edit"] }), _jsxs(MenuItem, { sx: { fontWeight: 600, fontSize: "12px",
                                                                                    display: "flex",
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center",
                                                                                    gap: 2
                                                                                }, onClick: () => handleDeleteTask(anchorElEditDelete?.id, setTasks, setAnchorElEditDelete), children: [_jsx(DeleteIcon, { sx: { fontSize: "16px", color: "red" } }), " Delete"] })] })] })] })) }, task.id.toString()))), provided.placeholder] }) })) })) }) })] }, section))), selectedTasks.length > 0 && (_jsxs(Box, { sx: {
                        position: "fixed",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#1E1E1E",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                    }, children: [_jsxs(Box, { sx: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1
                            }, children: [_jsxs(Button, { sx: {
                                        borderRadius: "20px",
                                        backgroundColor: "transparent",
                                        border: "1px solid #fff",
                                        textTransform: "none"
                                    }, endIcon: _jsx(CloseIcon, { onClick: () => setSelectedTasks([]) }), variant: "contained", children: [selectedTasks.length, " Tasks Selected"] }), _jsx(Box, { children: _jsx(LibraryAddCheckIcon, { sx: { color: "#C4C4C4", fontSize: 28, borderRadius: "6px", boxShadow: "2px 2px 4px rgba(0,0,0,0.2)" } }) })] }), _jsxs(Box, { sx: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2
                            }, children: [_jsx(Button, { variant: "contained", sx: {
                                        backgroundColor: "#2A2A2A",
                                        color: "white",
                                        textTransform: "none",
                                        borderRadius: "20px",
                                        border: "1px solid #fff"
                                    }, onClick: (e) => setAnchorEl(e.currentTarget), children: "Status" }), _jsx(Popover, { open: open, anchorEl: anchorEl, onClose: handleClosePopover, anchorOrigin: { vertical: "top", horizontal: "center" }, transformOrigin: { vertical: "bottom", horizontal: "center" }, sx: { mt: -2 }, children: _jsx(List, { sx: { backgroundColor: "#1E1E1E", color: "white", p: 0, }, children: ["TO-DO", "IN-PROGRESS", "COMPLETED"].map((status) => (_jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { onClick: () => handleStatusChangeMultiple(status), sx: {
                                                    color: "white",
                                                    "&:hover": { backgroundColor: "#333" },
                                                }, children: status }) }, status))) }) }), _jsx(Button, { onClick: handleDeleteSelected, variant: "contained", sx: {
                                        border: "1px solid #E13838",
                                        backgroundColor: "#3D0F0F", // Dark red background
                                        color: "#E13838", // Bright red text
                                        borderRadius: "20px", // Rounded pill shape
                                        padding: "6px 16px",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        boxShadow: "none",
                                        "&:hover": {
                                            backgroundColor: "#3D0F0F", // Slightly brighter on hover
                                        },
                                    }, children: "Delete" })] })] })), _jsx(Modal, { open: isModal, onClose: () => setIsModal(false), "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", children: _jsx(AddEditTask, { tasks: tasks, editTask: editTask, setTasks: setTasks, setIsModal: setIsModal }) })] }) }));
};
export default TaskTable;

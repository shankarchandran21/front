import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid2, Menu, MenuItem, Modal, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid } from '@mui/system';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleDeleteTask } from './functionality';
import AddEditTask from './AddEditTask';
import { editTaskDragApi } from '../api';
const TaskBoard = ({ tasks, setTasks }) => {
    const [anchorElEditDelete, setAnchorElEditDelete] = React.useState({ anchor: null, id: null });
    const [editTask, setEditTask] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        await editTaskDragApi(draggableId, {
            status: destination.droppableId,
            index: destination.index
        });
        if (!destination)
            return;
        setTasks((prevTasks) => {
            const sourceColumn = [...(prevTasks[source.droppableId] || [])];
            const destinationColumn = [...(prevTasks[destination.droppableId] || [])];
            if (!sourceColumn.length)
                return prevTasks;
            const [movedTask] = sourceColumn.splice(source.index, 1);
            if (!movedTask)
                return prevTasks;
            if (source.droppableId === destination.droppableId) {
                sourceColumn.splice(destination.index, 0, movedTask);
                return {
                    ...prevTasks,
                    [source.droppableId]: sourceColumn,
                };
            }
            const updatedTask = { ...movedTask, status: destination.droppableId.toUpperCase().replace("-", " ") };
            destinationColumn.splice(destination.index, 0, updatedTask);
            return {
                ...prevTasks,
                [source.droppableId]: sourceColumn,
                [destination.droppableId]: destinationColumn,
            };
        });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'TODO':
                return '#FAC3FF';
            case 'IN-PROGRESS':
                return '#85D9F1';
            case 'COMPLETED':
                return '#A2D6A0';
            default:
                return 'grey';
        }
    };
    return (_jsx(DragDropContext, { onDragEnd: onDragEnd, children: _jsxs(Box, { display: "flex", gap: 3, children: [Object.keys(tasks).map((section) => (_jsx(Grid, { width: "100%", children: _jsx(Droppable, { droppableId: section, children: (provided) => (_jsxs(Box, { ref: provided.innerRef, ...provided.droppableProps, flex: 1, sx: { backgroundColor: 'lightgrey', borderRadius: 2, p: 2, minHeight: '300px' }, children: [_jsx(Box, { sx: {
                                        backgroundColor: getStatusColor(section.toUpperCase()),
                                        p: 1,
                                        width: 'fit-content',
                                        borderRadius: '5px',
                                    }, children: section }), tasks[section].length <= 0 ? _jsx(Grid2, { sx: {
                                        width: '100%',
                                        height: "200px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                    }, children: _jsxs(Typography, { children: ["No Task in ", section] }) }) : _jsxs(_Fragment, { children: [tasks[section].map((task, index) => (_jsx(Draggable, { draggableId: task.id.toString(), index: index, children: (provided) => (_jsx(Card, { ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, sx: {
                                                    mt: 2,
                                                    mb: 2,
                                                    boxShadow: 3,
                                                    borderRadius: 3,
                                                    height: '150px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    cursor: 'grab',
                                                }, children: _jsxs(CardContent, { sx: {
                                                        flex: 1,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        '&:last-child': { paddingBottom: '5px' },
                                                    }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", children: [_jsx(Typography, { sx: {
                                                                        fontWeight: 700,
                                                                        fontSize: '16px',
                                                                        textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none',
                                                                    }, variant: "h6", children: task.name }), _jsx(Button, { sx: { color: "#000" }, onClick: (e) => setAnchorElEditDelete({ anchor: e.currentTarget, id: task.id }), children: _jsx(MoreHorizIcon, {}) }), _jsxs(Menu, { PaperProps: {
                                                                        sx: {
                                                                            boxShadow: "none",
                                                                            border: "1px solid #D1A3D1",
                                                                            borderRadius: "10px",
                                                                            backgroundColor: "#FFF9F9",
                                                                            marginTop: -1,
                                                                            marginLeft: -8
                                                                        },
                                                                    }, anchorEl: anchorElEditDelete.anchor, open: Boolean(anchorElEditDelete.anchor), onClose: () => setAnchorElEditDelete({ anchor: null, id: null }), children: [_jsxs(MenuItem, { onClick: () => {
                                                                                setIsModal(true);
                                                                                setEditTask(anchorElEditDelete?.id);
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
                                                                            }, onClick: () => handleDeleteTask(anchorElEditDelete?.id, setTasks, setAnchorElEditDelete), children: [_jsx(DeleteIcon, { sx: { fontSize: "16px", color: "red" } }), " Delete"] })] })] }), _jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto", children: [_jsx(Typography, { sx: { fontWeight: 600, fontSize: '10px' }, variant: "body2", color: "text.secondary", children: task.category }), _jsxs(Typography, { sx: { fontWeight: 600, fontSize: '10px' }, variant: "body2", color: "text.secondary", children: [task.dueDate.day, "/", task.dueDate.month, "/", task.dueDate.year] })] })] }) })) }, task.id.toString()))), provided.placeholder] })] })) }) }, section))), _jsx(Modal, { open: isModal, onClose: () => setIsModal(false), "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", children: _jsx(AddEditTask, { tasks: tasks, editTask: editTask, setTasks: setTasks, setIsModal: setIsModal }) })] }) }));
};
export default TaskBoard;

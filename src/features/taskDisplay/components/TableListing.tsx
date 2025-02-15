import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  MenuItem,
  Collapse,
  IconButton,
  Typography,
  Box,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  Menu,
  Grid,
  Modal
} from "@mui/material";
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



export interface DueDate {
  day: number;
  month: number;
  year: number;
}

export interface Task {
  id: number;
  name: string;
  dueDate: DueDate;
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED";
  category: "Work" | "Personal";
}


interface TaskProps {
  tasks: { [key: string]: Task[] };
  setTasks: React.Dispatch<React.SetStateAction<{
    [key: string]: Task[];
}>>
}


const TaskTable= ({ tasks, setTasks }:TaskProps) => {
  const [isModal,setIsModal] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElEditDelete, setAnchorElEditDelete] = React.useState<{ anchor: HTMLElement | null; id: number | null }>({ anchor: null, id: null });
  const [anchorEl2, setAnchorEl2] = useState<{ [key: number]: HTMLElement | null }>({});
  const [isAddTask,setIsAddTask]=useState<boolean>(false)
  const [editTask,setEditTask] = useState<null|number|string>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, taskId: number) => {
    setAnchorEl2((prev) => ({ ...prev, [taskId]: event.currentTarget }));
};

const handleClose = (taskId: number) => {
    setAnchorEl2((prev) => ({ ...prev, [taskId]: null }));
};


const handleClosePopover = () => {
  setAnchorEl(null);
};

const handleStatusChangeMultiple = async(newStatus: Task["status"]) => {
    setTasks((prev) => {
      let tasksToMove: Task[] = [];
      const updatedTasks: { [key: string]: Task[] } = {};
  

      Object.keys(prev).forEach((key) => {
        updatedTasks[key] = prev[key].filter((task) => {
          if (selectedTasks.includes(task.id)) {
            tasksToMove.push({ ...task, status: newStatus }); 
            return false;
          }
          return true;
        });
      });
  
    
      const targetSection =
        newStatus === "TO-DO" ? "Todo" :
        newStatus === "IN-PROGRESS" ? "In-Progress" :
        "Completed";
  

      updatedTasks[targetSection] = [...(updatedTasks[targetSection] || []), ...tasksToMove];
  
      return updatedTasks;
    });
    const res = await editTasksStatusApi({
      tasksId:selectedTasks,
      status:newStatus === "TO-DO"
      ? "Todo"
      : newStatus === "IN-PROGRESS"
      ? "In-Progress"
      : "Completed"
    })
  if(res.status === 200){
    setSelectedTasks([]);
  }
    handleClosePopover();
  }

const open = Boolean(anchorEl);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    "Todo": true,
    "In-Progress": true,
    "Completed": true,
  });
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const toggleExpand = (section: string) => {
    setExpanded({ ...expanded, [section]: !expanded[section] });
  };

  const handleStatusChange = async (taskId: number, newStatus: Task["status"]) => {
    setTasks((prev) => {
      let taskToMove: Task | null = null;
      const updatedTasks: { [key: string]: Task[] } = {};
  
    
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
        const targetSection =
          newStatus === "TO-DO" ? "Todo" :
          newStatus === "IN-PROGRESS" ? "In-Progress" :
          "Completed";
  
        updatedTasks[targetSection] = [...(updatedTasks[targetSection] || []), taskToMove];
      }
  
      return updatedTasks;
    });
    await editStatusApi({id:taskId,status:newStatus === "TO-DO"
      ? "Todo"
      : newStatus === "IN-PROGRESS"
      ? "In-Progress"
      : "Completed"})
    setAnchorEl2({})
  };

  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleDeleteSelected = async() => {

    await deleteTasksApi({tasksId:selectedTasks})
    setTasks((prev) => {
      const updatedTasks: { [key: string]: Task[] } = {};
      Object.keys(prev).forEach((key) => {
        updatedTasks[key] = prev[key].filter((task) => !selectedTasks.includes(task.id));
      });
      return updatedTasks;
    });
    setSelectedTasks([]);
  };
 

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    await editTaskDragApi(draggableId, {
      status:destination.droppableId, 
      index:destination.index
     });
     
    if (!destination) return; 
    let updatedTasks = { ...tasks }; 
    const sourceColumn = [...(updatedTasks[source.droppableId] || [])];
    if (!sourceColumn.length) return;
  
 
    const taskIndex = sourceColumn.findIndex((task) => task.id === draggableId);
    if (taskIndex === -1) return;
  
    const [movedTask] = sourceColumn.splice(taskIndex, 1);
    if (!movedTask) return;
  
   console.log(draggableId, destination.droppableId, destination.index)
   
  
    if (source.droppableId === destination.droppableId) {
      // Moving within the same column
      sourceColumn.splice(destination.index, 0, movedTask);
    } else {
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
  


  
  
 
  

  return (
<DragDropContext onDragEnd={onDragEnd}>
    <TableContainer>
      {Object.keys(tasks).map((section) => (
        <Box key={section} sx={{ mb: 4, borderRadius: "10px", overflow: "hidden" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center",
                backgroundColor:
                section === "Todo" ? "#FAC3FF" :
                section === "In-Progress" ? "#81D4FA" :
                "#CEFFCC",
            }}>
            <Typography
            variant="h6"
            onClick={() => toggleExpand(section)}
            sx={{
             fontWeight:600,
             fontSize:"16px",
              padding: 1,
              cursor: "pointer",
             
            }}
          >
             {section} ({tasks[section].length})
          </Typography>
          <Box onClick={() => toggleExpand(section)} sx={{pr:2,cursor:"pointer"}}>
            {expanded[section] ? <ExpandLess /> : <ExpandMore />}
          </Box>
            </Box>
            {(section === "Todo"&&expanded[section])&&<Grid sx={{display:{xs:"none",md:"block"}}}>
                <Box sx={{backgroundColor:"#F1F1F1"}}>
                      <Button onClick={()=>setIsAddTask(true)} sx={{color:"#000"}}  startIcon={<AddIcon sx={{color:"#7B1984"}}/>}>Add Task</Button>
                </Box>
                {isAddTask&&(<AddTask setTasks={setTasks } setIsAddTask={setIsAddTask}/>)}
            </Grid>}
          <Collapse in={expanded[section]}>
          <Droppable droppableId={section}>
  {(provided) => (
    <TableContainer sx={{minHeight: "100px",backgroundColor:"#F1F1F1"}} ref={provided.innerRef} {...provided.droppableProps}>
        {tasks[section].length <= 0 ?<Box sx={{
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "250px",
        }}>
                <Typography>No Task in {section}</Typography>
        </Box>:(<Table size="small">
        <TableBody>
          {tasks[section].map((task, index) => (
            <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
              {(provided, snapshot) => (
                <TableRow
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  sx={{ backgroundColor: snapshot.isDragging ? "#FFFFFF" : "#F1F1F1", 
                    color: "#000",
                    display: snapshot.isDragging ? "flex" : "table-row",
                    alignItems:"center"
                   }}
                >
                  <TableCell sx={{ p: 0,textDecoration:section === "Completed"?"line-through":"none" }} width={"30%"}>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleTaskSelection(task.id)}
                    />
                    <IconButton   sx={{ display: { xs: "none", md: "inline-flex" } }} {...provided.dragHandleProps}>
                      <DragIndicator />
                    </IconButton>
                    <IconButton sx={{color:section === "Completed"?"green":"grey"}}>
                    <CheckCircleIcon />
                    </IconButton>
              
                    {task.name}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }} width={"20%"} align="left">
                    {formatDueDate(task.dueDate)}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }} width={"20%"} align="left">
                    <Button
                      sx={{ backgroundColor: "#DDDADD", border: "1px solid #DDDADD", color: "#000" }}
                      onClick={(e) => handleClick(e, task.id)}
                      variant="outlined"
                    >
                      {task.status}
                    </Button>
                    <Menu
                        PaperProps={{
                          sx: {
                            boxShadow: "none",
                            border: "1px solid #D1A3D1",
                            borderRadius: "10px",
                            backgroundColor:"#FFF9F9",
                            marginTop:1,
                            marginLeft:5
                          },
                        }}
                      open={Boolean(anchorEl2[task.id])}
                      anchorEl={anchorEl2[task.id]}
                      onClose={() => handleClose(task.id)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    > 
                        {(["TO-DO", "IN-PROGRESS", "COMPLETED"] as const).map((option) => (
                              <MenuItem
                                key={option}
                                sx={{ fontWeight: 600, fontSize: "12px" }}
                                onClick={() => handleStatusChange(task.id, option)}
                              >
                                {option}
                              </MenuItem>
                            ))}
                      
                    </Menu>
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }} width={"20%"}>{task.category}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }} align="right" width={"20%"}>
                    <Button sx={{color:"#000"}}  onClick={(e) => setAnchorElEditDelete({ anchor: e.currentTarget, id: task.id })}>
                     <MoreHorizIcon/>
                    </Button>
                             <Menu
                                           PaperProps={{
                                            sx: {
                                              boxShadow: "none",
                                              border: "1px solid #D1A3D1",
                                              borderRadius: "10px",
                                              backgroundColor:"#FFF9F9",
                                              marginTop:-1,
                                              marginLeft:-8
                                            },
                                          }}
                                          anchorEl={anchorElEditDelete.anchor}
                                          open={Boolean(anchorElEditDelete.anchor)}
                                          onClose={() => setAnchorElEditDelete({ anchor: null, id: null })}
                                        >
                                            <MenuItem onClick={()=>{
                                              setEditTask(anchorElEditDelete?.id)
                                              setIsModal(true)
                                            }} sx={{fontWeight:600,fontSize:"12px",
                                              display:"flex",
                                              justifyContent: "center",
                                              alignItems:"center",
                                              gap:2
                                            }}>
                                               <BorderColorIcon sx={{fontSize:"16px"}}/> Edit
                                            </MenuItem>
                                            <MenuItem sx={{fontWeight:600,fontSize:"12px",
                                                  display:"flex",
                                                  justifyContent: "center",
                                                  alignItems:"center",
                                                  gap:2
                                            }}
                                            onClick={() => handleDeleteTask(anchorElEditDelete?.id,setTasks,setAnchorElEditDelete)}
                                            >
                                              <DeleteIcon sx={{fontSize:"16px",color:"red"}}/> Delete
                                            </MenuItem>
                                        </Menu>
                  </TableCell>
                </TableRow>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </TableBody>
      </Table>)}
    </TableContainer>
  )}
</Droppable>
          </Collapse>
        </Box>
      ))}
        {selectedTasks.length > 0 && (
  <Box
    sx={{
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
    }}
  >
    {/* Selected Task Counter */}
    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap:1
    }}>
        <Button sx={{
            borderRadius:"20px",
            backgroundColor:"transparent",
            border:"1px solid #fff",
            textTransform:"none"
        }} endIcon={<CloseIcon onClick={() => setSelectedTasks([])}/>} variant="contained">
            {selectedTasks.length} Tasks Selected
        </Button>
        <Box>
            <LibraryAddCheckIcon sx={{ color: "#C4C4C4", fontSize: 28, borderRadius: "6px", boxShadow: "2px 2px 4px rgba(0,0,0,0.2)" }} />
        </Box>
    </Box>

    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap:2
    }}>
                  {/* Status Popover Button */}
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#2A2A2A",
        color: "white",
        textTransform: "none",
        borderRadius:"20px",
        border:"1px solid #fff"
      }}
      onClick={(e)=>setAnchorEl(e.currentTarget)}
    >
      Status
    </Button>

    {/* Popover for Status Options */}
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ mt: -2 }}
    >
      <List sx={{ backgroundColor: "#1E1E1E", color: "white", p: 0 ,}}>
        {["TO-DO", "IN-PROGRESS", "COMPLETED"].map((status) => (
          <ListItem key={status} disablePadding>
            <ListItemButton
              onClick={() => handleStatusChangeMultiple(status as Task["status"])}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              {status}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Popover>

    {/* Delete Button */}
    <Button
      
     onClick={handleDeleteSelected}
      variant="contained"
      sx={{
        border:"1px solid #E13838",
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
      }}
    >
      Delete
    </Button>
    </Box>
  </Box>
)}
<Modal
      open={isModal}
      onClose={()=>setIsModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AddEditTask tasks={tasks} editTask={editTask} setTasks={setTasks} setIsModal={setIsModal}/>

    </Modal>
    </TableContainer>
</DragDropContext>
  );
};

export default TaskTable;

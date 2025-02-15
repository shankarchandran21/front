import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid2, Menu, MenuItem, Modal, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Grid } from '@mui/system';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleDeleteTask } from './functionality';
import AddEditTask from './AddEditTask';
import { editTaskDragApi } from '../api';


interface DueDate {
  day: number;
  month: number;
  year: number;
}

interface Task {
  id: number;
  name: string;
  dueDate: DueDate;
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED";
  category: "Work" | "Personal";
}

interface TaskProps {
  tasks: { [key: string]: Task[] };
   setTasks:React.Dispatch<React.SetStateAction<{
          [key: string]: Task[];
      }>>
}



const TaskBoard = ({tasks,setTasks}:TaskProps) => {
const [anchorElEditDelete, setAnchorElEditDelete] = React.useState<{ anchor: HTMLElement | null; id: number | null }>({ anchor: null, id: null });
  const [editTask,setEditTask] = useState<null|number|string>(null)
  const [isModal,setIsModal] = useState<boolean>(false)
const onDragEnd = async (result: DropResult) => {
    const { source, destination,draggableId } = result;
    await editTaskDragApi(draggableId, {
      status:destination.droppableId, 
      index:destination.index
     });
    if (!destination) return; 
  
    setTasks((prevTasks) => {
      const sourceColumn = [...(prevTasks[source.droppableId] || [])]; 
      const destinationColumn = [...(prevTasks[destination.droppableId] || [])]; 
  
      if (!sourceColumn.length) return prevTasks; 

      const [movedTask] = sourceColumn.splice(source.index, 1);
  
      if (!movedTask) return prevTasks; 

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

    
  const getStatusColor = (status: string) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" gap={3}>
        {Object.keys(tasks).map((section) => (
          <Grid key={section} width="100%">
            <Droppable droppableId={section}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  flex={1}
                  sx={{ backgroundColor: 'lightgrey', borderRadius: 2, p: 2, minHeight: '300px' }}
                >
                  <Box
                    sx={{
                      backgroundColor: getStatusColor(section.toUpperCase()),
                      p: 1,
                      width: 'fit-content',
                      borderRadius: '5px',
                    }}
                  >
                    {section}
                  </Box>
                    {tasks[section].length<=0?<Grid2 sx={{
                      width: '100%',
                      height:"200px",
                      display:"flex",
                      justifyContent:"center",
                      alignItems: 'center',
                    }}>
                        <Typography>No Task in {section}</Typography>
                    </Grid2>:<>
                      {tasks[section].map((task, index) => (
                    <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            mt: 2,
                            mb: 2,
                            boxShadow: 3,
                            borderRadius: 3,
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            cursor: 'grab',
                          }}
                        >
                          <CardContent
                            sx={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              '&:last-child': { paddingBottom: '5px' },
                            }}
                          >
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: '16px',
                                  textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none',
                                }}
                                variant="h6"
                              >
                                {task.name}
                              </Typography>
                              <Button sx={{color:"#000"}} onClick={(e) => setAnchorElEditDelete({ anchor: e.currentTarget, id: task.id })}>
                                <MoreHorizIcon />
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
                                              setIsModal(true)
                                              setEditTask(anchorElEditDelete?.id)
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
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                              <Typography sx={{ fontWeight: 600, fontSize: '10px' }} variant="body2" color="text.secondary">
                                {task.category}
                              </Typography>
                              <Typography sx={{ fontWeight: 600, fontSize: '10px' }} variant="body2" color="text.secondary">
                                {task.dueDate.day}/{task.dueDate.month}/{task.dueDate.year}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                    </>}
                 
                </Box>
              )}
            </Droppable>
          </Grid>
        ))}
        <Modal
      open={isModal}
      onClose={()=>setIsModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AddEditTask tasks={tasks} editTask={editTask} setTasks={setTasks} setIsModal={setIsModal}/>

    </Modal>
      </Box>
    </DragDropContext>
  );
};

export default TaskBoard;
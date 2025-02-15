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
import {createTaskApi, editTaskApi} from "../api"

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

type props = {
    setIsModal:React.Dispatch<React.SetStateAction<boolean>>
     setTasks:React.Dispatch<React.SetStateAction<{
        [key: string]: Task[];
    }>>
    tasks:{ [key: string]: Task[] };
    editTask:number|string
}

const AddEditTask = ({setIsModal,setTasks,editTask,tasks}:props) => {
  const [text, setText] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [title,setTitle] = useState<string>("")
  const [category,setCategory] = useState<string>("")
  const [status, setStatus] = React.useState('');
  const [oldStatus,setOldStatus] = useState<string|undefined>("")

 

  useEffect(()=>{
      if(editTask){
        const findTaskById = (id: number) => {
          for (const status in tasks) {
            const task = tasks[status].find((task) => task.id === id);
            if (task) {
              return { task, status };
            }
          }
          return null;
        };
        const result = findTaskById(editTask);
        setCategory(result.task.category)
        setText(result?.task?.description||"")
        setStatus(result?.status)
        setOldStatus(result?.status)
        setTitle(result?.task.name)
        setSelectedDueDate(result?.task.dueDate)


      }else{
        setCategory("")
        setText("")
        setStatus("")
        setOldStatus("")
        setTitle("")
        setSelectedDueDate(null)

      }
  },[editTask])


  const handleChangeStatus = (event) => {
   
    setStatus(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 300) {
      setText(event.target.value);
    }
  };


  const handleSubmit = async()=>{
    const updatedTask = {
      // id: editTask || Date.now(),
      name: title,
      description: text,
      category: category,
      status: status,
      dueDate: selectedDueDate
    };
    
    if(title&&text&&category&&status&&selectedDueDate){
 
      
      setIsModal(false)
      if(editTask){
        setTasks((prevTasks) => {
          const newTasks = { ...prevTasks };
  
      
          if (oldStatus && oldStatus !== status) {
            newTasks[oldStatus] = newTasks[oldStatus].filter((task) => task.id !== editTask);
            newTasks[status] = [...(newTasks[status] || []), {...updatedTask,id:editTask}];
          } else {
       
            newTasks[status] = newTasks[status].map((task) =>
              task.id === editTask ? {...updatedTask,id:editTask} : task
            );
          }
  
          return newTasks;
        });
         await editTaskApi({
          id:editTask,
          data:updatedTask
        })
    
       
      }else{

        const res = await createTaskApi(updatedTask)

        if(res?.status === 200){
          console.log(res.data)
          setTasks((prevTasks) => ({
            ...prevTasks,
            [res.data.status]: [...(prevTasks[res.data.status] || []), res.data],
          }));
        }
       
      }
    }else{
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
  }

  return (
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      width:editTask?"75%":"50%",
      height: "auto",
      outline: "none",
      borderRadius: 4,
    }}>
      <ToastContainer />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>{editTask?"Edit":"Create"} Task</Typography>
        <CloseIcon onClick={() => setIsModal(false)} sx={{ fontSize: "24px", cursor: "pointer" }} />
      </Box>
      <Divider />

      <Grid sx={{
        display: "flex",
        justifyContent:"flex-start",
        alignItems: "flex-start",
        width: "100%",
      }}>
        {/* Left side scrollable content */}
        <Grid  sx={{ maxHeight: '500px', overflowY: 'auto', p: 2,width:"100%",flex:{xs:1,md:editTask?0.5:1} }}>
          <TextField
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f0f0f0',
                '& fieldset': { borderColor: '#a0a0a0' },
                '&:hover fieldset': { borderColor: '#a0a0a0' },
                '&.Mui-focused fieldset': { borderColor: '#a0a0a0' },
              },
            }}
          />

          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                minHeight: '150px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <TextField
                fullWidth
                multiline
                variant="standard"
                value={text}
                onChange={handleChange}
                InputProps={{ disableUnderline: true }}
                placeholder="Write something..."
                sx={{ '& textarea': { height: '80px', resize: 'none' } }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <IconButton size="small"><FormatBoldIcon /></IconButton>
                <IconButton size="small"><FormatItalicIcon /></IconButton>
                <IconButton size="small"><StrikethroughSIcon /></IconButton>
                <IconButton size="small"><FormatListBulletedIcon /></IconButton>
                <IconButton size="small"><FormatAlignLeftIcon /></IconButton>
                <Typography sx={{ marginLeft: 'auto', color: 'gray' }}>{text.length}/300 characters</Typography>
              </Box>
            </Box>
          </Box>

          <Grid sx={{ display: "flex", gap: 2, mt: 2,flexWrap:"wrap" }}>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "12px", color: "#00000099" }}>Task Category*</Typography>
                <Grid sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button onClick={() => setCategory("Work")} sx={{ borderRadius: "20px", backgroundColor: category === "Work" ? "#7B1984" : "transparent", color: category === "Work" ? "#fff" : "#090909", border: "1px solid #00000030", fontSize: "10px", fontWeight: 700 }}>Work</Button>
                  <Button onClick={() => setCategory("Personal")} sx={{ borderRadius: "20px", color: category === "Personal" ? "#fff" : "#090909", border: "1px solid #00000030", fontSize: "10px", fontWeight: 700, backgroundColor: category === "Personal" ? "#7B1984" : "transparent" }}>Personal</Button>
                </Grid>
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "12px", color: "#00000099" }}>Due on*</Typography>
                <Box onClick={(e) => setAnchorEl(e.currentTarget)} sx={{cursor:"pointer", display: "flex", alignItems: "center", border: "1px solid #00000021", backgroundColor: "#F1F1F15C", p: 1, borderRadius: "8px", mt: 1 }}>
                  <Typography sx={{ color: "#000000", fontSize: "12px", fontWeight: 600 }}>{selectedDueDate?formatDueDate(selectedDueDate):"DD/MM/YY"}</Typography>
                  <DateRangeIcon sx={{ fontSize: "14px", ml: 1 }} />
                </Box>
                <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Calendar selectedDueDate={selectedDueDate} setSelectedDueDate={setSelectedDueDate} />
            </Popover>
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "12px", color: "#00000099" }}>Task Status*</Typography>
                <Select
                  value={status}
                  onChange={handleChangeStatus}
                  displayEmpty
                  sx={{ height: "32px", mt: 1, width: "155px", borderRadius: "8px" }}
                >
                  <MenuItem disabled value="">
                    <em>Choose</em>
                  </MenuItem>
                  <MenuItem value={"In-Progress"}>IN-PROGRESS</MenuItem>
                  <MenuItem value={"Todo"}>TO-DO</MenuItem>
                  <MenuItem value={"Completed"}>COMPLETED</MenuItem>
                </Select>
              </Box>
            </Grid>

            <Box mt={2}>
              <Button fullWidth sx={{ backgroundColor: "#F1F1F1", fontWeight: 500, fontSize: "12px" }}>Drop your files here or Upload</Button>
            </Box>
           
      </Grid>

        {/* Right side activity section */}
        {editTask&&(
            <Grid sx={{ borderLeft: '1px solid #ccc',display: { xs: "none", md: "block" },flex:0.5 ,}}>
            <Typography sx={{ fontWeight: 600, mb: 2,p:"10px 20px 0px 20px" }}>Activity</Typography>
            <Divider/>
            <Box sx={{ minHeight: '400px', overflowY: 'auto',p: 2,backgroundColor:"#F1F1F1",height:"100%" }}>
              <Box sx={{
                display:"flex",
                justifyContent: 'space-between',
                alignItems:"center",
              }}>
                <Typography variant="body2" sx={{ mb: 1,fontWeight:400,fontSize:"10px" }}>You created this task</Typography>
                <Typography sx={{ mb: 1,fontWeight:400,fontSize:"10px",color:"#1E212A" }}>Dec 27 at 1:15 pm</Typography>
              </Box>
              <Box sx={{
                display:"flex",
                justifyContent: 'space-between',
                alignItems:"center",
              }}> 
              <Typography variant="body2" sx={{ mb: 1,fontWeight:400,fontSize:"10px" }}>You changed status from in progress to complete</Typography>
              <Typography sx={{ mb: 1,fontWeight:400,fontSize:"10px",color:"#1E212A" }}>Dec 28 at 1:15 pm</Typography>
              </Box>
              <Box sx={{
                 display:"flex",
                 justifyContent: 'space-between',
                 alignItems:"center",
              }}>
                <Typography sx={{ mb: 1,fontWeight:400,fontSize:"10px" }} variant="body2">You uploaded file</Typography>
                <Typography sx={{ mb: 1,fontWeight:400,fontSize:"10px" }}>Dec 29 at 1:15 pm</Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box sx={{ backgroundColor: "#F1F1F1", display: "flex", justifyContent: "flex-end", alignItems: "center", p: 1, gap: 2 }}>
        <Button onClick={()=>setIsModal(false)} sx={{ fontWeight: 700, fontSize: "14px", backgroundColor: "#FFFFFF", color: "#000", borderRadius: "20px", border: "1px solid #00000030" }}>Cancel</Button>
        <Button onClick={handleSubmit} sx={{ fontWeight: 700, fontSize: "14px", backgroundColor: "#7B1984", color: "#fff", borderRadius: "20px", border: "1px solid #00000030" }}>Create</Button>
      </Box>
    </Box>
  )
}

export default AddEditTask;

import React, { useEffect, useState } from 'react';
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

export interface DueDate {
  day: number;
  month: number;
  year: number;
}
export interface Task {
  id: number;
  name: string;
  dueDate: DueDate|null;
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED";
  category: "Work" | "Personal";
}
interface TaskData {
  [key: string]: Task[];
}

type Props = {
  setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks : React.Dispatch<React.SetStateAction<{
      [key: string]: TaskData[];
  }>>
};

type FormValues = {
  title: string;
  status: string;
  category: string;
  dueDate: { day: number; month: number; year: number } | null;

};



const AddTask = ({ setIsAddTask,setTasks  }: Props) => {
  const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),  // 
    defaultValues: {
      title: '',
      status: '',
      category: '',
      dueDate:null
    }
  });



  const [selectedDueDate, setSelectedDueDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
  const [anchorElStatusCategory, setAnchorElStatusCategory] = useState<null | HTMLElement>(null);


  useEffect(()=>{
      if(selectedDueDate){
          setValue("dueDate",selectedDueDate)
      }
  },[selectedDueDate])
  const onSubmit = async(data: FormValues) => {

  
 
    const statusMap: Record<string, string> = {
      "TO-DO": "Todo",
      "IN-PROGRESS": "In-Progress",
      "COMPLETED": "Completed",
    };
  
    const taskStatus = statusMap[data.status ?? "TO-DO"];
  
    const newTask: Task = {
  
      name: data.title,
      dueDate: data.dueDate,
      status: data.status as "TO-DO" | "IN-PROGRESS" | "COMPLETED",
      category: data.category as "Work" | "Personal",
    };
    const res = await createTaskApi(newTask)
    if(res.status === 200){
      setTasks((prevTasks) => ({
        ...prevTasks,
        [res?.data.status]: [...(prevTasks[res?.data.status] || []), res.data],
      }));
      reset()
      setIsAddTask(false)
    }
  
  

    
  };
  return (
    <Grid p={2} sx={{ backgroundColor: "#F1F1F1", display: { xs: "none", md: "block" } }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", width: "75%" }}>
          
          <Box>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Task title"
                  variant="standard"
                  sx={{
                    "& .MuiInput-underline:before, &:hover .MuiInput-underline:before, .MuiInput-underline:after": { borderBottom: "none" }
                  }}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Box>

          {/* Due Date */}
          <Box>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "normal",
                color: "#00000099",
                borderColor: "#00000099",
                "&:hover": { borderColor: "#00000099" },
              }}
            >
              {selectedDueDate ? formatDueDate(selectedDueDate) : "Add date"}
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Calendar selectedDueDate={selectedDueDate} setSelectedDueDate={setSelectedDueDate} />
            </Popover>
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.dueDate?.message}</Typography>
          </Box>

          {/* Status Button */}
          <Box>
            <Button
              onClick={(e) => setAnchorElStatus(e.currentTarget)}
              variant="outlined"
              sx={{
                border: "1px solid #00000099",
                color: "#000",
                borderRadius: "50%",
                width: 40,
                height: 40,
                minWidth: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ color: "#000" }} />
            </Button>
            <Menu
               PaperProps={{
                sx: {
                  boxShadow: "none",
                  border: "1px solid #D1A3D1",
                  borderRadius: "10px",
                  backgroundColor:"#FFF9F9",
                  marginTop:-1,
                  marginLeft:5
                },
              }}
              anchorEl={anchorElStatus}
              open={Boolean(anchorElStatus)}
              onClose={() => setAnchorElStatus(null)}
            >
                 <MenuItem sx={{fontWeight:600,fontSize:"12px"}} onClick={() => {
                  setValue("status","In-Progress");
                  setAnchorElStatus(null);
                }} value={"In-Progress"}>IN-PROGRESS</MenuItem>
                  <MenuItem sx={{fontWeight:600,fontSize:"12px"}} onClick={() => {
                  setValue("status", "Todo");
                  setAnchorElStatus(null);
                }} value={"Todo"}>TO-DO</MenuItem>
                  <MenuItem sx={{fontWeight:600,fontSize:"12px"}} onClick={() => {
                  setValue("status", "Completed");
                  setAnchorElStatus(null);
                }} value={"Completed"}>COMPLETED</MenuItem>
              
            </Menu>
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.status?.message}</Typography>
          </Box>

          {/* Category Button */}
          <Box>
            <Button
              onClick={(e) => setAnchorElStatusCategory(e.currentTarget)}
              variant="outlined"
              sx={{
                border: "1px solid #00000099",
                color: "#000",
                borderRadius: "50%",
                width: 40,
                height: 40,
                minWidth: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ color: "#000" }} />
            </Button>
            <Menu
              PaperProps={{
                sx: {
                  boxShadow: "none",
                  border: "1px solid #D1A3D1",
                  borderRadius: "10px",
                  backgroundColor:"#FFF9F9",
                  marginTop:-1,
                  marginLeft:5
                },
              }}
              anchorEl={anchorElStatusCategory}
              open={Boolean(anchorElStatusCategory)}
              onClose={() => setAnchorElStatusCategory(null)}
            >
              {["Work", "Personal"].map((option) => (
                <MenuItem sx={{fontWeight:600,fontSize:"12px"}} key={option} onClick={() => {
                  setValue("category", option);
                  setAnchorElStatusCategory(null);
                }}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.category?.message}</Typography>
          </Box>
        </Grid>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2, mt: 2 }}>
          <Button
            type="submit"
            sx={{ backgroundColor: "#7B1984", borderRadius: 20, fontWeight: 700, fontSize: "14px", boxShadow: "none" }}
            endIcon={<SubdirectoryArrowLeftIcon />}
            variant="contained"
          >
            Add
          </Button>
          <Button onClick={() => setIsAddTask(false)} sx={{ fontWeight: 700, fontSize: "14px", color: "#000" }}>
            Cancel
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default AddTask;

import React, { useState } from "react";
import {Box,Button,Menu,MenuItem,Typography,Popper,Grid,TextField, InputAdornment, Paper, Modal,} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Calendar from "../../../components/atoms/calendar/Calendar";
import SearchIcon from "@mui/icons-material/Search";
import AddEditTask from "./AddEditTask";

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
interface FilterAndCreateTabProps {
  selectedDueDate: { day: number; month: number; year: number } | null;
  setSelectedDueDate: React.Dispatch<React.SetStateAction<{ day: number; month: number; year: number } | null>>;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  searchFilter:string;
  setSearchFilter:React.Dispatch<React.SetStateAction<string>>
  setTasks:React.Dispatch<React.SetStateAction<{
    [key: string]: Task[];
}>>
selectCategory:number | string

}

const FilterAndCreateTab= ({initialsetTasks,setTasks, selectedDueDate, setSelectedDueDate,setCategory,searchFilter,setSearchFilter,selectCategory }:FilterAndCreateTabProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState<null | HTMLElement>(null);
  const [isModal,setIsModal] = useState<boolean>(false)
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDatePickerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDatePickerAnchorEl(event.currentTarget);
    setOpenDatePicker((prev) => !prev);
  };


  return (
    <Grid
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: { xs: "flex-start", md: "center" }, // Use xs for mobile
      flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for desktop
    }}
  >
    {/* Add Task Button (Visible Only on Mobile) */}
    <Box
      sx={{
        display: { xs: "flex", md: "none" }, // Only visible on mobile
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <Button  onClick={()=>setIsModal(true)} sx={{ borderRadius: "20px", backgroundColor: "#7B1984" }} variant="contained">
        Add task
      </Button>
    </Box>
  
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, width: "100%",flexWrap:"wrap" }}>
      <Typography>Filter by:</Typography>
  
        <Box sx={{
           display: "flex", 
           alignItems: "center", 
           gap: 2,
           flexDirection:"row",
        }}>
                   {/* Category Filter */}
      <Button
        endIcon={anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        sx={{
          borderRadius: "20px",
          borderColor: "#000",
          color: "#000",
          textTransform: "none",
         
        }}
        onClick={handleClick}
        variant="outlined"
      >
        Category
      </Button>
  
      {/* Due Date Filter */}
      <Button
        endIcon={openDatePicker ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        sx={{
          borderRadius: "20px",
          borderColor: "#000",
          color: "#000",
          textTransform: "none",
        }}
        variant="outlined"
        onClick={handleDatePickerClick}
      >
        Due Date
      </Button>
      <Popper open={openDatePicker} anchorEl={datePickerAnchorEl} placement="bottom-start">
        <Calendar selectedDueDate={selectedDueDate} setSelectedDueDate={setSelectedDueDate} />
      </Popper>
      {Boolean(selectedDueDate || searchFilter || selectCategory) && (
          <Button onClick={()=>{
            setSearchFilter("")
            setSelectedDueDate(null)
            setCategory(0)
            setTasks(initialsetTasks)
          }}>Reset Filter</Button>
        )}
        </Box>
  
      {/* Category Menu */}
      <Menu
        PaperProps={{
          sx: {
            boxShadow: "none",
            border: "1px solid #D1A3D1",
            borderRadius: "10px",
            backgroundColor:"#FFF9F9",
            marginTop:1
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{fontWeight:600,fontSize:"12px"}} onClick={()=>{
            setCategory(1)
            handleClose()
        }}>WORK</MenuItem>
        <MenuItem sx={{fontWeight:600,fontSize:"12px"}} onClick={()=>{
            setCategory(2)
            handleClose()
        }}>PERSONAL</MenuItem>
      </Menu>
  
      {/* Date Picker */}
    
    </Box>
  
  
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search"
        value={searchFilter}
        onChange={(e)=>setSearchFilter(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          width: { xs: "100%", md: 250 }, 
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            "& fieldset": {
              borderColor: "#BDBDBD",
            },
            "&:hover fieldset": {
              borderColor: "#757575",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#757575",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#757575" }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        onClick={()=>setIsModal(true)}
        sx={{
          borderRadius: "20px",
          backgroundColor: "#7B1984",
          display: { xs: "none", md: "block" }, // Hide on mobile, show on desktop
        }}
        variant="contained"
      >
        Add task
      </Button>
    </Box>
    <Modal
      open={isModal}
      onClose={()=>setIsModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AddEditTask setTasks={setTasks} setIsModal={setIsModal}/>

    </Modal>
  </Grid>
  
  );
};

export default FilterAndCreateTab;

import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import TabSwitch from "./components/TabSwitch";
import CustomTabPanel from "./components/CustomTabPanel";
import FilterAndCreateTab from "./components/FilterAndCreateTab";
import TableListing from "./components/TableListing";
import Empty from "../../components/atoms/empty/Empty";
import TaskBoard from "./components/BoardSection";
import { getTaskApi } from "./api";

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




const Index = () => {
  const [TabValue, setTabValue] = useState<number>(0);
  const [selectedDueDate, setSelectedDueDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    Todo:[],
    "In-Progress":[],
    Completed:[]
  });
  const [searchFilter , setSearchFilter] = useState<string>("")
  const [filteredTasks, setFilteredTasks] = useState<{ [key: string]: Task[] }>(tasks);
  const [selectCategory, setCategory] = useState<number|string>(0);

  const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setTabValue(newValue);
  };

 
  
  
  useEffect(() => {
    const filterTasks = () => {
      const filtered = Object.keys(tasks).reduce((result: { [key: string]: Task[] }, key) => {
        const filteredTasks = tasks[key].filter((task) => {
          const matchesCategory =
            selectCategory === 0 ||
            (selectCategory === 1 && task.category === "Work") ||
            (selectCategory === 2 && task.category === "Personal");
  
          const matchesDueDate =
            !selectedDueDate ||
            (task.dueDate.day === selectedDueDate.day &&
              task.dueDate.month === selectedDueDate.month &&
              task.dueDate.year === selectedDueDate.year);
  
          const matchesSearch =
            searchFilter.trim() === "" ||
            task.name.toLowerCase().includes(searchFilter.toLowerCase());
  
          return matchesCategory && matchesDueDate && matchesSearch;
        });
  
        if (filteredTasks.length > 0) {
          result[key] = filteredTasks;
        }
  
        return result;
      }, {});
  
      setFilteredTasks(filtered);
    };
    if(selectCategory || selectedDueDate || searchFilter){
      filterTasks();
  
    }
  }, [selectCategory, selectedDueDate, searchFilter]);
  
  

  useEffect(()=>{
    (async()=>{
      const res = await getTaskApi()

      setTasks(res?.data)
      setFilteredTasks(res?.data)
    })()
  },[])

  
  return (
    <Grid p={2}>
      <TabSwitch value={TabValue} handleChange={handleChangeTab} />
      <FilterAndCreateTab initialsetTasks={tasks} selectCategory={selectCategory}   setTasks={setFilteredTasks} setSearchFilter={setSearchFilter} searchFilter={searchFilter} setCategory={setCategory} selectedDueDate={selectedDueDate} setSelectedDueDate={setSelectedDueDate} />
      { (Object.keys(filteredTasks).length === 0&&(searchFilter || selectCategory || selectedDueDate))?<Empty/>:<>
        <CustomTabPanel value={TabValue} index={0}> 
        <Grid
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid grey",
            pt: 2,
            pb: 2,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Typography sx={{ width: "35%", fontWeight: "700", fontSize: "14px" }}>TaskName</Typography>
          <Typography sx={{ width: "20%", fontWeight: "700", fontSize: "14px" }}>Due on</Typography>
          <Typography sx={{ width: "14%", fontWeight: "700", fontSize: "14px" }}>Task Status</Typography>
          <Typography sx={{ width: "20%", textAlign: "center", fontWeight: "700", fontSize: "14px" }}>Task Category</Typography>
          <Typography sx={{ width: "20%", display: { xs: "none", md: "block" } }}></Typography>
        </Grid>
        <TableListing tasks={filteredTasks} setTasks={setFilteredTasks} />
      </CustomTabPanel>
      <CustomTabPanel value={TabValue} index={1}><TaskBoard tasks={filteredTasks} setTasks={setFilteredTasks}/></CustomTabPanel>
      
      </>}
      
    </Grid>
  );
};

export default Index;

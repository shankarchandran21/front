import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import TabSwitch from "./components/TabSwitch";
import CustomTabPanel from "./components/CustomTabPanel";
import FilterAndCreateTab from "./components/FilterAndCreateTab";
import TableListing from "./components/TableListing";
import Empty from "../../components/atoms/empty/Empty";
import TaskBoard from "./components/BoardSection";
import { getTaskApi } from "./api";
const Index = () => {
    const [TabValue, setTabValue] = useState(0);
    const [selectedDueDate, setSelectedDueDate] = useState(null);
    const [tasks, setTasks] = useState({
        Todo: [],
        "In-Progress": [],
        Completed: []
    });
    const [searchFilter, setSearchFilter] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [selectCategory, setCategory] = useState(0);
    const handleChangeTab = (e, newValue) => {
        e.preventDefault();
        setTabValue(newValue);
    };
    useEffect(() => {
        const filterTasks = () => {
            const filtered = Object.keys(tasks).reduce((result, key) => {
                const filteredTasks = tasks[key].filter((task) => {
                    const matchesCategory = selectCategory === 0 ||
                        (selectCategory === 1 && task.category === "Work") ||
                        (selectCategory === 2 && task.category === "Personal");
                    const matchesDueDate = !selectedDueDate ||
                        (task.dueDate.day === selectedDueDate.day &&
                            task.dueDate.month === selectedDueDate.month &&
                            task.dueDate.year === selectedDueDate.year);
                    const matchesSearch = searchFilter.trim() === "" ||
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
        if (selectCategory || selectedDueDate || searchFilter) {
            filterTasks();
        }
    }, [selectCategory, selectedDueDate, searchFilter]);
    useEffect(() => {
        (async () => {
            const res = await getTaskApi();
            setTasks(res?.data);
            setFilteredTasks(res?.data);
        })();
    }, []);
    return (_jsxs(Grid, { p: 2, children: [_jsx(TabSwitch, { value: TabValue, handleChange: handleChangeTab }), _jsx(FilterAndCreateTab, { initialsetTasks: tasks, selectCategory: selectCategory, setTasks: setFilteredTasks, setSearchFilter: setSearchFilter, searchFilter: searchFilter, setCategory: setCategory, selectedDueDate: selectedDueDate, setSelectedDueDate: setSelectedDueDate }), (Object.keys(filteredTasks).length === 0 && (searchFilter || selectCategory || selectedDueDate)) ? _jsx(Empty, {}) : _jsxs(_Fragment, { children: [_jsxs(CustomTabPanel, { value: TabValue, index: 0, children: [_jsxs(Grid, { sx: {
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    borderTop: "1px solid grey",
                                    pt: 2,
                                    pb: 2,
                                    display: { xs: "none", md: "flex" },
                                }, children: [_jsx(Typography, { sx: { width: "35%", fontWeight: "700", fontSize: "14px" }, children: "TaskName" }), _jsx(Typography, { sx: { width: "20%", fontWeight: "700", fontSize: "14px" }, children: "Due on" }), _jsx(Typography, { sx: { width: "14%", fontWeight: "700", fontSize: "14px" }, children: "Task Status" }), _jsx(Typography, { sx: { width: "20%", textAlign: "center", fontWeight: "700", fontSize: "14px" }, children: "Task Category" }), _jsx(Typography, { sx: { width: "20%", display: { xs: "none", md: "block" } } })] }), _jsx(TableListing, { tasks: filteredTasks, setTasks: setFilteredTasks })] }), _jsx(CustomTabPanel, { value: TabValue, index: 1, children: _jsx(TaskBoard, { tasks: filteredTasks, setTasks: setFilteredTasks }) })] })] }));
};
export default Index;

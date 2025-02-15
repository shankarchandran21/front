import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography, Popper, Grid, TextField, InputAdornment, Modal, } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Calendar from "../../../components/atoms/calendar/Calendar";
import SearchIcon from "@mui/icons-material/Search";
import AddEditTask from "./AddEditTask";
const FilterAndCreateTab = ({ initialsetTasks, setTasks, selectedDueDate, setSelectedDueDate, setCategory, searchFilter, setSearchFilter, selectCategory }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDatePickerClick = (event) => {
        setDatePickerAnchorEl(event.currentTarget);
        setOpenDatePicker((prev) => !prev);
    };
    return (_jsxs(Grid, { sx: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" }, // Use xs for mobile
            flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for desktop
        }, children: [_jsx(Box, { sx: {
                    display: { xs: "flex", md: "none" }, // Only visible on mobile
                    justifyContent: "flex-end",
                    width: "100%",
                }, children: _jsx(Button, { onClick: () => setIsModal(true), sx: { borderRadius: "20px", backgroundColor: "#7B1984" }, variant: "contained", children: "Add task" }) }), _jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 2, p: 2, width: "100%", flexWrap: "wrap" }, children: [_jsx(Typography, { children: "Filter by:" }), _jsxs(Box, { sx: {
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexDirection: "row",
                        }, children: [_jsx(Button, { endIcon: anchorEl ? _jsx(ArrowDropUpIcon, {}) : _jsx(ArrowDropDownIcon, {}), sx: {
                                    borderRadius: "20px",
                                    borderColor: "#000",
                                    color: "#000",
                                    textTransform: "none",
                                }, onClick: handleClick, variant: "outlined", children: "Category" }), _jsx(Button, { endIcon: openDatePicker ? _jsx(ArrowDropUpIcon, {}) : _jsx(ArrowDropDownIcon, {}), sx: {
                                    borderRadius: "20px",
                                    borderColor: "#000",
                                    color: "#000",
                                    textTransform: "none",
                                }, variant: "outlined", onClick: handleDatePickerClick, children: "Due Date" }), _jsx(Popper, { open: openDatePicker, anchorEl: datePickerAnchorEl, placement: "bottom-start", children: _jsx(Calendar, { selectedDueDate: selectedDueDate, setSelectedDueDate: setSelectedDueDate }) }), Boolean(selectedDueDate || searchFilter || selectCategory) && (_jsx(Button, { onClick: () => {
                                    setSearchFilter("");
                                    setSelectedDueDate(null);
                                    setCategory(0);
                                    setTasks(initialsetTasks);
                                }, children: "Reset Filter" }))] }), _jsxs(Menu, { PaperProps: {
                            sx: {
                                boxShadow: "none",
                                border: "1px solid #D1A3D1",
                                borderRadius: "10px",
                                backgroundColor: "#FFF9F9",
                                marginTop: 1
                            },
                        }, anchorEl: anchorEl, open: open, onClose: handleClose, children: [_jsx(MenuItem, { sx: { fontWeight: 600, fontSize: "12px" }, onClick: () => {
                                    setCategory(1);
                                    handleClose();
                                }, children: "WORK" }), _jsx(MenuItem, { sx: { fontWeight: 600, fontSize: "12px" }, onClick: () => {
                                    setCategory(2);
                                    handleClose();
                                }, children: "PERSONAL" })] })] }), _jsxs(Box, { sx: {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 4,
                    width: "100%",
                }, children: [_jsx(TextField, { fullWidth: true, placeholder: "Search", value: searchFilter, onChange: (e) => setSearchFilter(e.target.value), variant: "outlined", size: "small", sx: {
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
                        }, InputProps: {
                            startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { sx: { color: "#757575" } }) })),
                        } }), _jsx(Button, { onClick: () => setIsModal(true), sx: {
                            borderRadius: "20px",
                            backgroundColor: "#7B1984",
                            display: { xs: "none", md: "block" }, // Hide on mobile, show on desktop
                        }, variant: "contained", children: "Add task" })] }), _jsx(Modal, { open: isModal, onClose: () => setIsModal(false), "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", children: _jsx(AddEditTask, { setTasks: setTasks, setIsModal: setIsModal }) })] }));
};
export default FilterAndCreateTab;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Paper, Select, MenuItem as MuiMenuItem } from "@mui/material";
const Calendar = ({ selectedDueDate, setSelectedDueDate }) => {
    const today = new Date();
    const todayDate = today.getDate();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return (_jsxs(Paper, { sx: { width: 260, textAlign: "center", mt: 1 }, children: [_jsxs(Box, { sx: { display: "flex", justifyContent: "center", gap: 1 }, children: [_jsx(Select, { value: month, onChange: (e) => setMonth(Number(e.target.value)), sx: {
                            fontWeight: 500,
                            fontSize: "11.99px",
                            border: "none",
                            boxShadow: "none",
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            "& .MuiSelect-icon": {
                                color: "#F8B1FF",
                            },
                        }, children: Array.from({ length: 12 }, (_, i) => (_jsx(MuiMenuItem, { value: i, children: new Date(year, i).toLocaleString("default", { month: "long" }) }, i))) }), _jsx(Select, { value: year, onChange: (e) => setYear(Number(e.target.value)), sx: {
                            fontWeight: 500,
                            fontSize: "11.99px",
                            border: "none",
                            boxShadow: "none",
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            "& .MuiSelect-icon": {
                                color: "#F8B1FF",
                            },
                        }, children: Array.from({ length: 10 }, (_, i) => (_jsx(MuiMenuItem, { value: year - 5 + i, children: year - 5 + i }, i))) })] }), _jsxs(Box, { sx: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0, mt: 1 }, children: [["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (_jsx(Typography, { sx: { fontWeight: "400", fontSize: "10.73px" }, children: day }, day))), [...Array(firstDay === 0 ? 6 : firstDay - 1)].map((_, i) => (_jsx(Box, { sx: { width: 30, height: 30 } }, i))), [...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const isToday = day === todayDate && month === today.getMonth() && year === today.getFullYear();
                        const isDueDate = selectedDueDate &&
                            selectedDueDate.day === day &&
                            selectedDueDate.month === month &&
                            selectedDueDate.year === year;
                        const isBetween = selectedDueDate &&
                            selectedDueDate.year === year &&
                            selectedDueDate.month === month &&
                            day > Math.min(todayDate, selectedDueDate.day) &&
                            day < Math.max(todayDate, selectedDueDate.day);
                        return (_jsx(Box, { sx: {
                                p: 1.5,
                                fontWeight: 400,
                                fontSize: "10.73px",
                                height: isBetween ? 25 : 35,
                                mt: isBetween ? 0.5 : "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: isToday
                                    ? "#7B1984"
                                    : isDueDate
                                        ? "#7B1984"
                                        : isBetween
                                            ? "#F8B1FF"
                                            : "transparent",
                                color: isToday || isDueDate ? "white" : "black",
                                cursor: "pointer",
                                borderRadius: isToday || isDueDate ? "4px" : "none",
                            }, onClick: () => {
                                setSelectedDueDate({ day, month, year });
                            }, children: day }, day));
                    })] })] }));
};
export default Calendar;

import React, { useState } from 'react';
import { Box, Typography, Paper, Select, MenuItem as MuiMenuItem } from "@mui/material";

type DueDate = {
    day: number;
    month: number;
    year: number;
} | null;

type Props = {
    selectedDueDate: DueDate;
    setSelectedDueDate: React.Dispatch<React.SetStateAction<DueDate>>;
};

const Calendar = ({ selectedDueDate, setSelectedDueDate }: Props) => {
    const today = new Date();
    const todayDate = today.getDate();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    return (
        <Paper sx={{ width: 260, textAlign: "center",mt:1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <Select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    sx={{
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
                    }}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <MuiMenuItem key={i} value={i}>
                            {new Date(year, i).toLocaleString("default", { month: "long" })}
                        </MuiMenuItem>
                    ))}
                </Select>
                <Select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    sx={{
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
                    }}
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <MuiMenuItem key={i} value={year - 5 + i}>
                            {year - 5 + i}
                        </MuiMenuItem>
                    ))}
                </Select>
            </Box>

            {/* Calendar Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0, mt: 1 }}>
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                    <Typography key={day} sx={{ fontWeight: "400", fontSize: "10.73px" }}>
                        {day}
                    </Typography>
                ))}
                {/* Empty spaces before first day */}
                {[...Array(firstDay === 0 ? 6 : firstDay - 1)].map((_, i) => (
                    <Box key={i} sx={{ width: 30, height: 30 }} />
                ))}
                {/* Days in month */}
                {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const isToday = day === todayDate && month === today.getMonth() && year === today.getFullYear();
                    const isDueDate =
                        selectedDueDate &&
                        selectedDueDate.day === day &&
                        selectedDueDate.month === month &&
                        selectedDueDate.year === year;
                    const isBetween =
                        selectedDueDate &&
                        selectedDueDate.year === year &&
                        selectedDueDate.month === month &&
                        day > Math.min(todayDate, selectedDueDate.day) &&
                        day < Math.max(todayDate, selectedDueDate.day);
                    return (
                        <Box
                            key={day}
                            sx={{
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
                            }}
                            onClick={() => {
                                 setSelectedDueDate({ day, month, year });
                            }}
                        >
                            {day}
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default Calendar;

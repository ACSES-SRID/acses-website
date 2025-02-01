import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, isSameMonth, isSameDay, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { Paper, IconButton, Typography, Badge } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { motion } from "framer-motion";
import { events } from "../../data/events";

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const hasEvent = (date) => {
    const formattedDate = format(date, "dd-MM-yyyy");
    return events.some((event) => event.date === formattedDate);
  };

  const renderCalendar = () => {
    const startOfMonthDate = startOfMonth(currentDate);
    const endOfMonthDate = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

    const startDayOfWeek = getDay(startOfMonthDate); // 0 (Sunday) to 6 (Saturday)
    const emptyDays = Array(startDayOfWeek).fill(null);

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Typography key={day} align="center" variant="subtitle2" color="textSecondary">
            {day}
          </Typography>
        ))}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {daysInMonth.map((day) => {
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const isEventDay = hasEvent(day);

          return (
            <Badge
              key={day.toString()}
              overlap="circular"
              badgeContent={isEventDay ? "•" : null}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "1.5rem",
                  bottom: "8px",
                  right: "8px",
                  color: "#0d5323",
                },
              }}
            >
              <IconButton
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: isToday || isSelected
                    ? "#114924 !important" // Apply #114924 background for current day or selected day
                    : isEventDay
                      ? "#b2d8c2 !important" // Apply lighter shade for days with events
                      : "transparent", // Default background
                  color: isToday || isSelected
                    ? "#ffffff !important" // Explicitly set white text color for current day or selected day
                    : "text.primary", // Default text color
                  border: isToday
                    ? "2px solid !important" // Add border for current day
                    : "none",
                  borderColor: isToday
                    ? "#114924 !important" // Border color for current day
                    : "none",
                  "&:hover": {
                    bgcolor: isToday || isSelected
                      ? "#083d1a !important" // Darker shade on hover for current or selected day
                      : isEventDay
                        ? "#99c8ae !important" // Lighter shade on hover for days with events
                        : "#E8F5E9 !important", // Default hover background
                    color: isToday || isSelected
                      ? "#ffffff !important" // Ensure text color remains white on hover
                      : "text.primary", // Default text color on hover
                  },
                }}
                onClick={() => handleDateSelect(day)}
              >
                {format(day, "d")}
              </IconButton>
            </Badge>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
          p: 2,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6">{format(currentDate, "MMMM yyyy")}</Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRight />
          </IconButton>
        </div>
        {renderCalendar()}
      </Paper>
    </motion.div>
  );
};

Calendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
};

export default Calendar;
import { useState } from "react";
import PropTypes from "prop-types";
import { format, isValid } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Badge, IconButton, Paper } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { motion } from "framer-motion";
import { events } from "../../data/events";

const Calendar = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    if (isValid(date)) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const hasEvent = (date) => {
    return events.some((event) => event.date === format(date, "yyyy-MM-dd"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          }}
        >
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={handleDateSelect}
            renderInput={({ inputRef, inputProps }) => (
              <div ref={inputRef} {...inputProps} />
            )}
            components={{
              LeftArrowIcon: () => (
                <IconButton>
                  <ChevronLeft sx={{ color: "#4CAF50" }} /> {/* Green color */}
                </IconButton>
              ),
              RightArrowIcon: () => (
                <IconButton>
                  <ChevronRight sx={{ color: "#4CAF50" }} /> {/* Green color */}
                </IconButton>
              ),
            }}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                DayComponentProps.selected && isValid(selectedDate);
              const isToday =
                format(new Date(), "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
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
                      color: "#4CAF50", // Green color for event dot
                    },
                  }}
                >
                  <IconButton
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      bgcolor: isSelected ? "#4CAF50" : "transparent", // Green background for selected date
                      color: isSelected ? "common.white" : "text.primary",
                      border: isToday ? "2px solid" : "none",
                      borderColor: isToday ? "#4CAF50" : "none", // Green border for today's date
                      "&:hover": {
                        bgcolor: isSelected ? "#388E3C" : "#E8F5E9", // Darker green for hover
                      },
                    }}
                    {...DayComponentProps}
                  >
                    {format(day, "d")}
                  </IconButton>
                </Badge>
              );
            }}
          />
        </Paper>
      </motion.div>
    </LocalizationProvider>
  );
};

Calendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
};

export default Calendar;

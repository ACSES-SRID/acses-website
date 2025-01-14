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
    const formattedDate = format(date, "dd-MM-yyyy");
    console.log("Checking date:", formattedDate);
    return events.some((event) => event.date === formattedDate);
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
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                DayComponentProps.selected && isValid(selectedDate);
              const isToday =
                format(new Date(), "yyyy-MM-dd") ===
                format(day, "yyyy-MM-dd");
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
                      bgcolor: isSelected
                        ? "#0d5323 !important"
                        : isEventDay
                        ? "#b2d8c2 !important"
                        : "transparent",
                      color: isSelected ? "common.white" : "text.primary",
                      border: isToday ? "2px solid !important" : "none",
                      borderColor: isToday ? "#0d5323 !important" : "none",
                      "&:hover": {
                        bgcolor: isSelected
                          ? "#083d1a !important"
                          : isEventDay
                          ? "#99c8ae !important"
                          : "#E8F5E9 !important",
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

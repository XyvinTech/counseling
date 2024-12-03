import React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.2)",
            borderWidth: "1px",
          },
          backgroundColor: "#efefef",
          borderRadius: "8px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.2)",
          "&.Mui-focused": {
            color: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(0, 0, 0, 0.2)",
            opacity: 1,
          },
        },
      },
    },
  },
});

const CustomTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
  },
  "& .MuiInputBase-input::label": {
    color: "rgba(0, 0, 0, 0.2)",
    opacity: 1,
  },
});

export const StyledTime = ({ label, placeholder, onChange, value }) => {
  const handleChange = (newValue) => {
    if (newValue) {
      onChange(format(newValue, "HH:mm"));
    } else {
      onChange("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label={label}
          value={value ? new Date(`1970-01-01T${value}:00`) : null}
          onChange={handleChange}
          renderInput={(params) => (
            <CustomTextField {...params} placeholder={placeholder} />
          )}
          ampm={false} // Display time in 24-hour format
          views={['hours', 'minutes']} // Only show hours and minutes
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

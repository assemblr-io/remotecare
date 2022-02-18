import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Range.css";
import Typography from "@mui/material/Typography";

function valuetext(value) {
  return `${value}`;
}

const labelTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          color: "#222",
          backgroundColor: "#fff",
        },
      },
    },
  },
});

export default function RangeSlider(props) {
  const [value, setValue] = React.useState([20, 37]);
  const tag = props.tag;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const customWidth = props.width;

  return (
    <Box width={customWidth} display="flex" flexDirection={"column"} alignItems="center" paddingLeft={"2%"} paddingRight={"2%"}>
      <Typography id="age-label" gutterBottom>
        Patient Age
      </Typography>
      <ThemeProvider theme={labelTheme}>
        <Slider
          id="age-slider"
          sx={{ color: "#fff" }}
          max={115}
          getAriaLabel={() => tag}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </ThemeProvider>
    </Box>
  );
}

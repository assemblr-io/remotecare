import React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Select from "../Select/Select";
import Range from "../RangeSlider/Range";
import IosSwitch from "../Switch/IOsSwitch";

const icon = (
  <Box sx={{ width: "99%", textAlign: "left", padding: "0 0 0 0" }}>
    <AppBar position="static">
      <Toolbar sx={{ width: "100%" }} variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Filter by
        </Typography>
        <Select width="25%" options={["Diabetes", "Rheumatic Heart Disease", "COPD", "Cancer", "Joints"]} tag="Disease" />
        <Select width="25%" options={["Endocrinology", "Cardiology", "Nephrology", "Physician", "Orthopaedics"]} tag="Specialty" />
        <Range width="25%" tag="Age" />
        <IosSwitch width="15%" tag="Show Heatmap" />
      </Toolbar>
    </AppBar>
  </Box>
);

export default function SimpleGrow(props) {
  const [checked, setChecked] = React.useState(false);
  const customWidth = props.width;

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box position="absolute" top="10px" width={"100%"} sx={{ height: 180, textAlign: "left", padding: "0 0 0 10px", zIndex: "1000" }}>
      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show Filters" />
      <Box sx={{ display: "flex" }}>
        <Grow in={checked}>{icon}</Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
      </Box>
    </Box>
  );
}

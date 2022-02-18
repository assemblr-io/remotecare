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

const icon = (
  <Box sx={{ width: "99%", textAlign: "left", padding: "0 0 0 0" }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

export default function SimpleGrow() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box position="absolute" top="10px" width="100%" sx={{ height: 180, textAlign: "left", padding: "0 0 0 10px", zIndex: "1000" }}>
      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show Filters" />
      <Box sx={{ display: "flex" }}>
        <Grow in={checked}>{icon}</Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
      </Box>
    </Box>
  );
}

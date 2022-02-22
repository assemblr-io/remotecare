import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./Select.css";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  listprops: {
    style: {
      maxHeight: ITEM_HEIGHT * 2 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectCheckBox(props) {
  const [options, setOptions] = useState([]);
  const initOptions = props.options;
  const tag = props.tag;
  const customWidth = props.width;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const checkedOptions = typeof value === "string" ? value.split(",") : value;
    setOptions(checkedOptions);
  };

  const handleDelete = (e, value) => {
    console.log(value);
    setOptions(options.filter((option) => option != value));

    // setOptions((current) => _without(current, value));
  };

  useEffect(() => {
    props.onCheckedChange(options);
  });

  return (
    <FormControl sx={{ m: 2, width: customWidth }}>
      <InputLabel id="demo-multiple-checkbox-label" sx={{ color: "#fff" }}>
        {tag}
      </InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={options}
        onChange={handleChange}
        input={<OutlinedInput label={tag} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                sx={{ backgroundColor: "#fff", color: "#333" }}
                key={value}
                label={value}
                variant="filled"
                onDelete={(e) => handleDelete(e, value)}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        // renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {initOptions.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={options.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

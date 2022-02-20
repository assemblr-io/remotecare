import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./Select.css";

const ITEM_HEIGHT = 5;
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

  const handleCheck = (event, data) => {
    props.onCheckedChange(data);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const checkedOptions = typeof value === "string" ? value.split(",") : value;
    props.onCheckedChange(checkedOptions);

    setOptions(checkedOptions);
  };

  return (
    <FormControl sx={{ m: 2, width: customWidth }}>
      <InputLabel id="demo-multiple-checkbox-label" sx={{ color: "#fff" }}>
        {tag}
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={options}
        onChange={handleChange}
        input={<OutlinedInput label={tag} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        sx={{ color: "#fff", margin: "solid 1px #fff" }}
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

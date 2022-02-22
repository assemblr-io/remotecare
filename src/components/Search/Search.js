import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import "./Search.css";

export default function Search(appProps) {
  let matched;
  return (
    <div>
      <Autocomplete
        id="patient-names"
        options={appProps.pts}
        getOptionLabel={(option) => option.fullname}
        renderInput={(params) => <TextField {...params} label="Patient Search" margin="normal" />}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.fullname, inputValue);
          appProps.onKe(matches);
          const parts = parse(option.fullname, matches);

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </div>
  );
}

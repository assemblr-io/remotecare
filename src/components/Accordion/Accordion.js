import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./Accordion.css";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={5} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  textAlign: "left",
}));

class SetStateIsAsynchronous extends React.Component {
  constructor(value) {
    super();
    this.state = value;
  }
}

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState("panel1");
  const [tools, setTools] = React.useState("panel1");
  const [textFieldValue, setTextFieldValue] = useState("");

  useEffect(() => {
    props.onTooltip.current = handleTooltip;
    console.log("onload of Accordion");
  }, [props.onTooltip]);

  const handleKeyUp = (keys) => {
    console.log("hit");
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleTooltip = (tooltip) => {
    setTools(tooltip.key ? tooltip.id : false);
  };

  const handleTextFieldChange = (e) => {
    setTextFieldValue(e.target.value.toLowerCase());
  };

  const clearTextfield = () => {
    setTextFieldValue("");
  };

  return (
    <div className="mui-accordion">
      <TextField
        sx={{ width: "100%" }}
        onChange={handleTextFieldChange}
        value={textFieldValue}
        label="Patient Search"
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton onClick={clearTextfield}>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      {props.pts
        .filter((patient) => {
          return patient.fullname.toLowerCase().includes(textFieldValue);
        })
        .map((patient) => (
          <Accordion
            expanded={expanded === patient._id || tools === patient._id}
            onChange={handleChange(patient._id)}
            key={patient._id}
            data-name={patient.fullname}
          >
            <AccordionSummary aria-controls={patient._id + "-content"} id={patient._id}>
              <Typography sx={{ width: "45%", flexShrink: 0, textAlign: "left" }}>{patient.fullname}</Typography>
              <Typography sx={{ width: "55%", flexShrink: 0, textAlign: "right", color: "text.secondary" }}>
                {Math.floor(Math.random() * patient.age * 10)} Road km's
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <span className="sub-header">Age : </span>
                <span>{patient.age}</span>
                <br />
                <span className="sub-header">Conditions : </span>
                <span>{patient.conditions.map((disease, index) => (index != 0 ? "," + disease.name : disease.name)).join(" ")}</span>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

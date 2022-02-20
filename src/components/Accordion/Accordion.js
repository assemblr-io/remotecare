import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import "./Accordion.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={5} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  textAlign: "left"
}));

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    console.log(props.pts)
  };

  return (
    <div className='mui-accordion'>
        {props.pts.map(patient=>(
            
                <Accordion expanded={expanded === patient._id} onChange={handleChange(patient._id)} key={patient._id}>
                    <AccordionSummary aria-controls={patient._id+'-content'} id={patient._id}>
                    <Typography>{patient.fullname}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    <span className='sub-header'>Age : </span><span>{patient.age}</span><br/>
                    <span className='sub-header'>Conditions : </span><span>{patient.conditions.map((disease, index) => index !=0 ? "," + disease.name : disease.name).join(" ")}</span>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            
        ))} 
    </div>
  );
}
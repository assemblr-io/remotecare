import "./App.css";
import Map from "./components/Map/Map";
import SimpleGrow from "./components/FormControl/FormControl";
import { useState, useRef, useEffect } from "react";
import { AssignmentInd } from "@mui/icons-material";
import Accordion from "./components/Accordion/Accordion";

export default function App() {
  const [age, setAgeRange] = useState([0,115]);
  const [diseases, setDiseases] = useState([]);
  const [heatmap, setHeatmap] = useState(false);
  const [patients, setPatients] = useState([]);
  const triggerFilters = useRef(null);

  const setNewAgeRange = (data) => {
    setAgeRange(data);
    
  };

  const setCheckedDiseases = (data) => {
    setDiseases(data);
  };

  useEffect(() => {
    if (triggerFilters.current) {
      triggerFilters.current(age, diseases)
    }
  },[age, diseases]);

  const onPatientFetch = (patients) =>{
    setPatients(patients)
  }

  const setHeatmapStatus = (offOn) => {
    setHeatmap(offOn);
  };

  return (
    <div className="App">
      <nav className="App-nav">NAV</nav>
      <div className="App-wrapper">
        <section className="Map-container">
          {/* <DenseAppBar /> */}
          <SimpleGrow onSetAgeRange={setNewAgeRange} ageRange={age} onSetDiseases={setCheckedDiseases} onShowHeatmap={setHeatmapStatus} position="relative" />
          <Map heatmap={heatmap} onDiseases={triggerFilters} onAge={triggerFilters} pt={onPatientFetch}/>
        </section>
        <aside className="App-details"><Accordion pts={patients}/></aside>
      </div>
    </div>
  );
}

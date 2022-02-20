import "./App.css";
import Map from "./components/Map/Map";
import SimpleGrow from "./components/FormControl/FormControl";
import { useState, useRef, useEffect } from "react";
import { AssignmentInd } from "@mui/icons-material";
import Accordion from "./components/Accordion/Accordion";

export default function App() {
  const [age, setAgeRange] = useState({ ageMin: 0, ageMax: 115 });
  const [diseases, setDiseases] = useState([]);
  const [heatmap, setHeatmap] = useState(false);
  const [patients, setPatients] = useState([]);
  const triggerMarkers = useRef(null);

  const setNewAgeRange = (data) => {
    setAgeRange(data);
    triggerMarkers.current(age);
  };

  const setCheckedDiseases = (data) => {
    setDiseases(data);
  };

  const onPatientFetch = (patients) =>{
    setPatients(patients)
  }

  const setHeatmapStatus = (offOn) => {
    setHeatmap(offOn);
  };

  // useEffect(() => {
  //   triggerMarkers.current(heatmap);
  // });



  return (
    <div className="App">
      <nav className="App-nav">NAV</nav>
      <div className="App-wrapper">
        <section className="Map-container">
          {/* <DenseAppBar /> */}
          <SimpleGrow onSetAgeRange={setNewAgeRange} ageRange={age} onSetDiseases={setCheckedDiseases} onShowHeatmap={setHeatmapStatus} position="relative" />
          <Map ageRange={age} diseases={diseases} heatmap={heatmap} trigger={triggerMarkers} pt={onPatientFetch}/>
        </section>
        <aside className="App-details"><Accordion pts={patients}/></aside>
      </div>
    </div>
  );
}

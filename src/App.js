import "./App.css";
import Map from "./components/Map/Map";
import SimpleGrow from "./components/FormControl/FormControl";
import { useState, useRef, useEffect } from "react";
import { AssignmentInd } from "@mui/icons-material";

export default function App() {
  const [age, setAgeRange] = useState({ ageMin: 0, ageMax: 115 });
  const [diseases, setDiseases] = useState([]);
  const [heatmap, setHeatmap] = useState(false);
  const triggerMarkers = useRef(null);

  const setNewAgeRange = (data) => {
    setAgeRange(data);
    triggerMarkers.current(age);
  };

  const setCheckedDiseases = (data) => {
    setDiseases(data);
  };

  const setHeatmapStatus = (offOn) => {
    setHeatmap(offOn);
  };

  useEffect(() => {
    triggerMarkers.current(heatmap);
  });

  useEffect(() => {
    triggerMarkers.current(diseases);
  });

  return (
    <div className="App">
      <nav className="App-nav">NAV</nav>
      <div className="App-wrapper">
        <section className="Map-container">
          {/* <DenseAppBar /> */}
          <SimpleGrow onSetAgeRange={setNewAgeRange} ageRange={age} onSetDiseases={setCheckedDiseases} onShowHeatmap={setHeatmapStatus} position="relative" />
          <Map ageRange={age} diseases={diseases} heatmap={heatmap} trigger={triggerMarkers} />
        </section>
        <aside className="App-details">DETAILS</aside>
      </div>
    </div>
  );
}

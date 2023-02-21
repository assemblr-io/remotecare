import "./App.css";
import Map from "./components/Map/Map";
import SimpleGrow from "./components/FormControl/FormControl";
import { useState, useRef, useEffect } from "react";
import Accordion from "./components/Accordion/Accordion";
import UserAvatar from "./components/Avatar/Avatar";

export default function App() {
  const [age, setAgeRange] = useState([0, 115]);
  const [diseases, setDiseases] = useState([]);
  const [heatmap, setHeatmap] = useState(false);
  const [patients, setPatients] = useState([]);
  const [tooltip, setTooltip] = useState({ key: false });
  const triggerFilters = useRef(null);
  const triggerAccordion = useRef(null);

  const setNewAgeRange = (data) => {
    setAgeRange(data);
  };

  const onTooltip = (id) => {
    setTooltip(id);
  };

  useEffect(() => {
    if (triggerAccordion.current) {
      triggerAccordion.current(tooltip);
    }
  }, [tooltip]);

  const setCheckedDiseases = (data) => {
    setDiseases(data);
  };

  useEffect(() => {
    if (triggerFilters.current) {
      triggerFilters.current(age, diseases);
    }
  }, [age, diseases]);

  const onPatientFetch = (patients) => {
    setPatients(patients);
  };

  const setHeatmapStatus = (offOn) => {
    setHeatmap(offOn);
  };

  return (
    <div className="App">
      <nav className="App-nav">
        <img src="./images/logo.png" />

        <UserAvatar />
      </nav>
      <div className="App-wrapper">
        <section className="Map-container">
          {/* <DenseAppBar /> */}
          <SimpleGrow onSetAgeRange={setNewAgeRange} ageRange={age} onSetDiseases={setCheckedDiseases} onShowHeatmap={setHeatmapStatus} position="relative" />
          <Map heatmap={heatmap} onDiseases={triggerFilters} onAge={triggerFilters} ptTooltip={onTooltip} pt={onPatientFetch} />
        </section>
        <aside className="App-details">
          <Accordion pts={patients} onTooltip={triggerAccordion} tooltip={tooltip} />
        </aside>
      </div>
    </div>
  );
}

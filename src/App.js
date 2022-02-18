import "./App.css";
import Map from "./components/Map/Map";
import SimpleGrow from "./components/FormControl/FormControl";

function App() {
  return (
    <div className="App">
      <nav className="App-nav">NAV</nav>

      <div className="App-wrapper">
        <section className="Map-container">
          {/* <DenseAppBar /> */}
          <SimpleGrow position="relative" />
          <Map />
        </section>
        <aside className="App-details">DETAILS</aside>
      </div>
      <footer className="App-footer">FOOTER</footer>
    </div>
  );
}

export default App;

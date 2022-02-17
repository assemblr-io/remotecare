import "./App.css";
import Map from "./components/Map/Map";

function App() {
  return (
    <div className="App">
      <nav className="App-nav">NAV</nav>
      <header className="App-header">HEADER</header>
      <div className="App-wrapper">
        <section className="Map-container">
          <Map />
        </section>
        <aside className="App-details">DETAILS</aside>
      </div>
      <footer className="App-footer">FOOTER</footer>
    </div>
  );
}

export default App;

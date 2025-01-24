import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeoulWeather from "./pages/SeoulWeather";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/seoul-weather" element={<SeoulWeather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

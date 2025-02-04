import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeoulWeather from "./pages/SeoulWeather";
import Dashboard from "./pages/Dashboard";
import TestWeatherDashboard from "./components/test/TestWeatherDashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/seoul-weather" element={<SeoulWeather />} />
          <Route path="/test" element={<TestWeatherDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

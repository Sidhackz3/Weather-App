import React from "react";
import WeatherDashboard from "./card/WeatherDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mt-6">Weather App</h1>
      <WeatherDashboard />
    </div>
  );
}

export default App;

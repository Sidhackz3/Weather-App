import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  timeout: 5000,
});

apiClient.interceptors.response.use(null, async (error) => {
  const config = error.config;

  if (!error.response && config && !config._isRetryRequest) {
    config._isRetryRequest = true;
    console.log("Network error, retrying request....");
    return apiClient(config);
  }
  return Promise.reject(error);
});

const API_KEY = "c9bcc25387b7413ba5491629251909";

const WeatherDashboard = () => {
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState([]);

  const handleAddCity = async () => {
    if (!cityInput) return;

    try {
      const response = await apiClient.get("/current.json", {
        params: {
          key: API_KEY,
          q: cityInput,
        },
      });
      const data = response.data;

      if (data.error) {
        alert("City not found!");
        return;
      }

      const newCity = {
        city: data.location.name,
        temp: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        icon: "https:" + data.current.condition.icon,
      };

      setCities((prev) => {
        const updated = [newCity, ...prev];
        return updated.slice(0, 4); // max 4 cards
      });

      setCityInput("");
    } catch (err) {
      console.error(err);
      alert("Error fetching weather");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddCity();
  };

  return (
    <div className=" mt-4 text-center px-4 justify-center">
      {/* Input */}
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-2">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name"
          className="p-2 w-full sm:w-64 rounded-md border border-gray-300"
        />
        <button
          onClick={handleAddCity}
          className="p-2 w-full sm:w-auto bg-blue-500 text-black rounded-md hover:bg-blue-600 "
        >
          Add City
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cities.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;

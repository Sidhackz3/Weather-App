import React from "react";

const WeatherCard = ({ city, temp, condition, icon }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform">
      <h2 className="text-xl font-bold">{city}</h2>
      <img src={icon} alt={condition} className="mx-auto my-2 w-20 h-20" />
      <p className="text-2xl font-semibold">{temp}°C</p>
      <p className="text-gray-700">{condition}</p>
    </div>
  );
};

export default WeatherCard;

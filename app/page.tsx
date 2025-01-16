"use client";

import { useState } from "react";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData } from "@/types/WeatherData";
import styles from "./page.module.css";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      setWeatherData(null);
      return;
    }

    setError(""); // Clear any previous error
    setLoading(true); // Start loading

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (response.ok) {
        const data: WeatherData = await response.json();
        setWeatherData(data);
        setError(""); // Clear error when successful
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "Failed to fetch weather data.");
        setWeatherData(null); // Clear data on error
      }
    } catch (err) {
      console.error("Error fetching weather data:", err); // Log the error
      setError("An unexpected error occurred. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className={styles.input}
        />
        <button onClick={handleFetchWeather} className={styles.button} disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>
      {loading && <div className={styles.loader}></div>}
      {error && <p className={styles.error}>{error}</p>}
      {weatherData && <WeatherCard weather={weatherData} />}
    </div>
  );
}

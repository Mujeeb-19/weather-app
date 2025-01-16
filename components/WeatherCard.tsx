import styles from "../app/page.module.css";
import { WeatherData } from "@/types/WeatherData";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { name, main, weather: conditions } = weather;

  return (
    <div className={styles.weatherCard}>
      <h2>Weather in {name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Feels Like: {main.feels_like}°C</p>
      <p>Condition: {conditions[0].description}</p>
      <p>Pressure: {main.pressure}</p>
    </div>
  );
}

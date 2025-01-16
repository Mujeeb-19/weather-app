import styles from "./WeatherCard.module.css";
import { WeatherData } from "@/types/WeatherData";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { name, main, weather: conditions } = weather;

  return (
    <div className={styles.card}>
      <h2 className={styles.city}>Weather in {name}</h2>
      <p className={styles.temp}>{Math.round(main.temp)}°C</p>
      <p className={styles.description}>{conditions[0].description}</p>
      <p className={styles.info}>Feels Like: {Math.round(main.feels_like)}°C</p>
      <p className={styles.info}>Pressure: {main.pressure} hPa</p>
    </div>
  );
}

import axios from "axios";
import { NextResponse } from "next/server";
import { WeatherData } from "@/types/WeatherData";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ message: "City is required." }, { status: 400 });
  }

  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) {
    return NextResponse.json({ message: "API key is missing. Please check your configuration." }, { status: 500 });
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get<WeatherData>(API_URL);
    return NextResponse.json(response.data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    let message = "Failed to fetch weather data.";
    
    if (status === 404) {
      message = "City not found. Please enter a valid city name.";
    } else if (status === 401) {
      message = "Invalid API key. Please check your OpenWeather API key.";
    }

    return NextResponse.json({ message }, { status });
  }
}

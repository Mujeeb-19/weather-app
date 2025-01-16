export interface WeatherMain {
    temp: number;
    feels_like: number;
    pressure: number;
  }
  
  export interface WeatherCondition {
    description: string;
  }
  
  export interface WeatherData {
    name: string;
    main: WeatherMain;
    weather: WeatherCondition[];
  }
  
// 요청 타입
export interface WeatherRequest {
  latitude: number;
  longitude: number;
  hourly?: Array<keyof HourlyVariables>;
  daily?: Array<keyof DailyVariables>;
  timezone?: string;
  past_days?: number;
}

interface HourlyVariables {
  temperature_2m: number;
  precipitation: number;
  cloud_cover: number;
  weather_code: number;
}

interface DailyVariables {
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_sum: number;
}

// 응답 타입
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly?: {
    time: string[];
    temperature_2m?: number[];
    cloud_cover?: number[];
    weather_code?: number[];
    precipitation?: number[];
  };
  daily?: {
    time: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_sum?: number[];
  };
}

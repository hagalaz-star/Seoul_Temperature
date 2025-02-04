export enum WeatherCode {
  CLEAR_SKY = 0,
  MAINLY_CLEAR = 1,
  PARTLY_CLOUDY = 2,
  OVERCAST = 3,
  FOG = 45,
  DEPOSITING_RIME_FOG = 48,
  DRIZZLE_LIGHT = 51,
  DRIZZLE_MODERATE = 53,
  DRIZZLE_DENSE = 55,
  FREEZING_DRIZZLE_LIGHT = 56,
  FREEZING_DRIZZLE_DENSE = 57,
  RAIN_SLIGHT = 61,
  RAIN_MODERATE = 63,
  RAIN_HEAVY = 65,
  FREEZING_RAIN_LIGHT = 66,
  FREEZING_RAIN_HEAVY = 67,
  SNOW_FALL_SLIGHT = 71,
  SNOW_FALL_MODERATE = 73,
  SNOW_FALL_HEAVY = 75,
  SNOW_GRAINS = 77,
  RAIN_SHOWERS_SLIGHT = 80,
  RAIN_SHOWERS_MODERATE = 81,
  RAIN_SHOWERS_VIOLENT = 82,
  SNOW_SHOWERS_SLIGHT = 85,
  SNOW_SHOWERS_HEAVY = 86,
  THUNDERSTORM = 95,
  THUNDERSTORM_WITH_SLIGHT_HAIL = 96,
  THUNDERSTORM_WITH_HEAVY_HAIL = 99,
}

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
    weather_code?: WeatherCode[];
    precipitation?: number[];
  };
  daily?: {
    time: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_sum?: number[];
  };
}

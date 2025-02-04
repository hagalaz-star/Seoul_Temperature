// export interface ClimateCondition {
//   latitude: number;
//   longitude: number;
//   timezone: string;
//   hourly?: {
//     time: string[];
//     temperature_2m?: number[];
//     cloud_cover?: number[];
//     weather_code?: WeatherCode[];
//     precipitation?: number[];
//   };
//   daily?: {
//     time: string[];
//     apparent_temperature_max: number[];
//     apparent_temperature_min: number[];
//     rain_sum: number[];
//     showers_sum: number[];
//     snowfall_sum: number[];
//     precipitation_sum: number[];
//     wind_speed_10m_max: number[];
//     sunrise: number[];
//   };
// }

export enum ActivitySuitable {
  HIGHLY_SUITABLE = "매우 적합",
  SUITABLE = "적합",
  MODERATE = "보통",
  UNSUITABLE = "부적합",
  DANGEROUS = "위험",
}

export interface ActivityWeather {
  suitability: ActivitySuitable;
  recommendation: {
    activity: string;
    message: string;
    timeOfDay: "MORNING" | "AFTERNOON" | "EVENING";
  };
}

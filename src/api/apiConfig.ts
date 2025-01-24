export interface ApiConfig {
  baseURL: string;
  timeout: number;
}

export const WEATHER_API_CONFIG: ApiConfig = {
  baseURL: "https://api.open-meteo.com/v1/forecast",
  timeout: 5000,
} as const; // 객체의 값들이 변경되지 않도록 읽기 전용으로 만듦

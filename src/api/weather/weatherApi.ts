import axios from "axios";
import { WeatherRequest, WeatherResponse } from "../../types/weather";
import { WEATHER_API_CONFIG } from "../apiConfig";

const instance = axios.create({
  baseURL: WEATHER_API_CONFIG.baseURL,
  timeout: WEATHER_API_CONFIG.timeout,
});

const fetchWeatherData = async (
  params: WeatherRequest
): Promise<WeatherResponse> => {
  try {
    const { latitude, longitude } = params;

    if (!latitude || !longitude) {
      throw new Error("위도와 경도가 있어야 됩니다!!!");
    }

    // 기본값 설정을 별도 객체로 분리
    const defaultParams = {
      hourly: [
        "temperature_2m",
        "precipitation",
        "cloud_cover",
        "weather_code",
      ],
      daily: ["temperature_2m_max", "temperature_2m_min"],
      timezone: "auto",
    };

    const requestParams = {
      ...params,
      ...defaultParams,
      hourly: Array.isArray(params.hourly)
        ? params.hourly.join(",")
        : defaultParams.hourly.join(","),
      daily: Array.isArray(params.daily)
        ? params.daily.join(",")
        : defaultParams.daily.join(","),
    };
    const response = await instance.get("", {
      params: requestParams,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API 에러:", {
        status: error.response?.status,
        message: error.response?.data,
      });
      throw new Error(
        `날씨 데이터 조회 실패: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("날씨 데이터 로드 실패");
  }
};

export default fetchWeatherData;

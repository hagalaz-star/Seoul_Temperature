import { useEffect, useState } from "react";
import fetchWeatherData from "../../api/weather/weatherApi";
import type { ActivityWeather } from "../../types/activity";

const SEOUL_COORDINATES = {
  latitude: 37.5665,
  longitude: 126.978,
} as const;

const ActivityRecomemded = () => {
  const [actvity, setActivity] = useState<ActivityWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData({
          latitude: SEOUL_COORDINATES.latitude,
          longitude: SEOUL_COORDINATES.longitude,
          hourly: [
            "temperature_2m",
            "precipitation",
            "cloud_cover",
            "weather_code",
          ],
          daily: ["temperature_2m_max", "temperature_2m_min"],
          timezone: "Asia/Seoul",
        });
        const recommendedActivit = setActivity();

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "날씨 데이터를 가져오는데 실패했습니다"
        );
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return <div></div>;
};

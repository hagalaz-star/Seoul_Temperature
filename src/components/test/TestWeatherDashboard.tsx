import { useState, useEffect } from "react";
import axios from "axios";

const TestWeatherDashboard = () => {
  const SEOUL_COORDINATES = {
    latitude: 37.5665,
    longitude: 126.978,
  };

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherApi = axios.create({
    baseURL: "https://api.open-meteo.com/v1/forecast",
  });

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);

      const response = await weatherApi.get("", {
        params: {
          latitude: SEOUL_COORDINATES.latitude,
          longitude: SEOUL_COORDINATES.longitude,
          hourly: ["temperature_2m", "precipitation"],
          timezone: "auto",
        },
      });

      setWeatherData(response.data);
      console.log("현대 날씨 데이터:", response.data);
    } catch (err: any) {
      setError(err.message);
      console.error("에러 메시지:", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (isLoading) {
    return <div>현재 로딩중 입니다...</div>;
  }

  if (error) {
    return <div>에러가 발생 했습니다:{error}</div>;
  }

  // 데이터를 받아왔을때 표시할 내용
  return (
    <div>
      <h1>서울 날씨 데이터 </h1>
      {weatherData && (
        <div>
          <h2>날씨 데이터</h2>
          {/* 데이터 구조를 확인하기 위해 JSON으로 출력 */}
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(weatherData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestWeatherDashboard;

import { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import fetchWeatherData from "../../api/weather/weatherApi";
import { WeatherRequest, WeatherResponse } from "../../types/weather";
import { WeatherDisplayOptions } from "../../pages/SeoulWeather";
import transformerWeatherData from "../../utils/weatherDataTransformer";
import {
  renderTemperatureChart,
  renderPrecipitationChart,
  renderTrendChart,
} from "../../utils/weatherChartRenderer";
import NotFoundPage from "../../pages/NotFoundPage";

interface ChartProps extends WeatherDisplayOptions {
  latitude: number;
  longitude: number;
  timezone?: string;
  past_days?: number;
  activeTab: string;
}

const WeatherChart = ({
  latitude,
  longitude,
  timeRange,
  timezone = "auto",
  past_days = 7,
  showCurrentTemp = true,
  showMaxTemp = true,
  showMinTemp = true,
  showPrecipitation = true,
  activeTab,
}: ChartProps) => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestParams: WeatherRequest = {
          latitude,
          longitude,
          hourly:
            timeRange === "hourly"
              ? [
                  "temperature_2m",
                  "precipitation",
                  "cloud_cover",
                  "weather_code",
                ]
              : undefined,
          daily:
            timeRange === "daily"
              ? [
                  "temperature_2m_max",
                  "temperature_2m_min",
                  "precipitation_sum",
                ]
              : undefined,
          timezone,
          past_days,
        };
        const response = await fetchWeatherData(requestParams); // api 호출 로직
        setWeatherData(response); // 성공시 데이터 설정
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "데이터 로딩 실패");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [latitude, longitude, timeRange, timezone, past_days]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!weatherData) return <div>데이터가 없습니다</div>;

  // 데이터 변환
  const transformedData = transformerWeatherData(weatherData, timeRange);

  const renderChart = (): JSX.Element | null => {
    const props = {
      chartData: transformedData.chartData,
      timeRange,
      showCurrentTemp,
      showMaxTemp,
      showMinTemp,
      showPrecipitation,
    };

    switch (activeTab) {
      case "temperature":
        return renderTemperatureChart(props);
      case "precipitation":
        return renderPrecipitationChart(props);

      case "trend":
        return renderTrendChart(props);
      default:
        return null;
    }
  };
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      {renderChart() || <NotFoundPage message="차트 데이터가 없습니다" />}
    </ResponsiveContainer>
  );
};

export default WeatherChart;

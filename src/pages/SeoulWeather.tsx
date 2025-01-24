import WeatherChart from "../components/charts/WeatherChart";
import WeatherOptions from "../components/weather/WeatherOptions";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./SeoulWeather.css";

const SEOUL_COORDINATES = {
  latitude: 37.5665,
  longitude: 126.978,
} as const;

export interface WeatherDisplayOptions {
  timeRange: "hourly" | "daily";
  showCurrentTemp: boolean;
  showMaxTemp: boolean;
  showMinTemp: boolean;
  showPrecipitation: boolean;
  showPrecipitationSum: boolean; // 일일 강수량 합계
}

const SeoulWeather = () => {
  const [displayOptions, setDisplayOptions] = useState<WeatherDisplayOptions>({
    timeRange: "hourly",
    showCurrentTemp: true,
    showMaxTemp: true,
    showMinTemp: true,
    showPrecipitation: true,
    showPrecipitationSum: true,
  });

  const [activeTab, setActiveTab] = useState("temperature");

  const handleTimeRangeChange = (newTimeRange: "hourly" | "daily") => {
    setDisplayOptions((prev) => ({ ...prev, timeRange: newTimeRange }));
  };

  return (
    <div className="weather-dashboard">
      <header className="weather-header">
        <div className="header-nav">
          <Link to="/" className="nav-link">
            <span>⬅</span> 홈으로
          </Link>
        </div>
        <div className="header-title">
          <h1>서울 기후 대시보드 </h1>
          <div className="location-info">
            <span>위도: {SEOUL_COORDINATES.latitude}°N</span>
            <span>경도: {SEOUL_COORDINATES.longitude}°E</span>
          </div>
        </div>
      </header>
      {/* {메인 콘텐츠 영역} */}
      <main className="dashboard-content">
        <section className="control-section">
          {/* 1.시간 범위 선택 */}
          <div className="range-selector">
            <button
              className={displayOptions.timeRange === "hourly" ? "active" : ""}
              onClick={() => handleTimeRangeChange("hourly")}
            >
              시간별
            </button>
            <button
              className={displayOptions.timeRange === "daily" ? "active" : ""}
              onClick={() => handleTimeRangeChange("daily")}
            >
              일별
            </button>
          </div>

          {/* 데이터 타입 선택 */}
          <div className="data-selector">
            <button
              className={activeTab === "temperature" ? "active" : ""}
              onClick={() => setActiveTab("temperature")}
            >
              기온
            </button>
            <button
              className={activeTab === "precipitation" ? "active" : ""}
              onClick={() => setActiveTab("precipitation")}
            >
              강수량
            </button>
            <button
              className={activeTab === "trend" ? "active" : ""}
              onClick={() => setActiveTab("trend")}
            >
              변화추이
            </button>
          </div>

          {/* 데이터 표시 옵션 */}
          <div className="weather-options">
            <WeatherOptions
              displayOptions={displayOptions}
              onOptionsChange={setDisplayOptions}
            />
          </div>
        </section>

        {/* 차트가 들어갈 자리 */}
        <section className="chart-section">
          <div className="chart-container">
            <WeatherChart
              key={`weather-chart-${displayOptions.timeRange}`}
              latitude={SEOUL_COORDINATES.latitude}
              longitude={SEOUL_COORDINATES.longitude}
              activeTab={activeTab}
              {...displayOptions}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeoulWeather;

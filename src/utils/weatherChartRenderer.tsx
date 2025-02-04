import {
  ComposedChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
} from "recharts";

import { ChartDataPoint } from "./weatherDataTransformer";

interface ChartProps {
  chartData: ChartDataPoint[];
  timeRange: "hourly" | "daily";
  showCurrentTemp?: boolean;
  showMaxTemp?: boolean;
  showMinTemp?: boolean;
  showPrecipitation?: boolean;
}

// 시간 포맷팅 함수
const formatXAxisTime = (timeString: string, timeRange: "hourly" | "daily") => {
  try {
    const date = new Date(timeString);
    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", timeString);
      return timeString;
    }
    // 일별 데이터일 경우 날짜 표시
    if (timeRange === "daily") {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}/${day}`; // "MM/DD" 형식
    }
    return `${String(date.getHours()).padStart(2, "0")}:00`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString;
  }
};
export const renderTemperatureChart = ({
  chartData,
  timeRange,
  showCurrentTemp,
  showMaxTemp,
  showMinTemp,
}: ChartProps) => {
  const recentData = chartData.slice(-12);

  return (
    <ComposedChart
      data={recentData}
      margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis
        dataKey="time"
        interval={timeRange === "hourly" ? 1 : 0}
        tick={{ fill: "#94a3b8", textAnchor: "end" }}
        tickFormatter={(time) => formatXAxisTime(time, timeRange)}
      />
      <YAxis
        yAxisId="temperature"
        orientation="left"
        tick={{ fill: "#94a3b8" }}
        label={{ value: "온도 (°C)", angle: -90, position: "insideLeft" }}
        tickFormatter={(value: number | string): string =>
          Math.round(Number(value)).toString()
        }
      />
      <Tooltip
        formatter={(value: number) => [`${Math.round(value)}°C`, "기온"]}
      />
      <Legend />
      {timeRange === "hourly" && showCurrentTemp && (
        <Line
          yAxisId="temperature"
          type="monotone"
          dataKey="temperature_2m"
          stroke="#ff7300"
          name="현재기온"
        />
      )}
      {timeRange === "daily" && (
        <>
          {showMaxTemp && (
            <Line
              yAxisId="temperature"
              type="monotone"
              dataKey="temperature_2m_max"
              stroke="#BE3144"
              name="최고기온"
            />
          )}
          {showMinTemp && (
            <Line
              yAxisId="temperature"
              type="monotone"
              dataKey="temperature_2m_min"
              stroke="#82ca9d"
              name="최저기온"
            />
          )}
        </>
      )}
    </ComposedChart>
  );
};

export const renderPrecipitationChart = ({
  chartData,
  timeRange,
  showPrecipitation,
}: ChartProps) => {
  const recentData = chartData.slice(-12);
  const hasPrecipitation = recentData.some((data) => {
    if (!data) return false;

    const precipitationValue =
      timeRange === "hourly" ? data.precipitation : data.precipitation_sum;

    return typeof precipitationValue === "number" && precipitationValue > 0;
  });

  return (
    <BarChart
      data={recentData}
      margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis
        dataKey="time"
        tick={{ fill: "#94a3b8" }}
        interval={timeRange === "hourly" ? 1 : 0}
      />
      <YAxis
        yAxisId="precipitation"
        dataKey={timeRange === "hourly" ? "precipitation" : "precipitation_sum"}
        tick={{ fill: "#5D8736" }}
        label={{
          value: "강수량 (mm)",
          angle: -90,
          position: "insideLeft",
          fill: "#3b82f6",
        }}
        domain={[0, 15]} // 최소 범위 설정
        ticks={hasPrecipitation ? undefined : [0]} // 강수량 없을 때 0만 표시
      />
      <Tooltip
        formatter={(value: number) => [
          `${value.toFixed(1)} mm`,
          timeRange === "hourly" ? "시간당 강수량" : "일일 강수량",
        ]}
      />
      <Legend />
      {showPrecipitation && (
        <Bar
          yAxisId="precipitation"
          type="monotone"
          dataKey={
            timeRange === "hourly" ? "precipitation" : "precipitation_sum"
          }
          stroke={timeRange === "hourly" ? "#2563eb" : "#1d4ed8"}
          fill={timeRange === "hourly" ? "#60a5fa" : "#3b82f6"}
          name={timeRange === "hourly" ? "시간당 강수량" : "일일 강수량 합계"}
          opacity={0.8}
          minPointSize={3}
        />
      )}
    </BarChart>
  );
};

export const renderTrendChart = ({ chartData, timeRange }: ChartProps) => {
  const recentData = chartData.slice(-12);

  return (
    <AreaChart
      data={recentData}
      margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis
        dataKey="time"
        tick={{ fill: "#94a3b8" }}
        interval={timeRange === "hourly" ? 1 : 0}
      />
      <YAxis
        tick={{ fill: "#94a3b8" }}
        label={{ value: "기온 (°C)", angle: -90, position: "insideLeft" }}
        tickFormatter={(value: number | string): string =>
          Math.round(Number(value)).toString()
        }
      />
      <Tooltip
        formatter={(value: number) => [`${Math.round(value)}°C`, "기온"]}
      />
      <Legend />
      <Area
        type="monotone"
        dataKey={
          timeRange === "hourly" ? "temperature_2m" : "temperature_2m_max"
        }
        stroke="#8884d8"
        fill="#8884d830"
        name="기온 추이"
      />
    </AreaChart>
  );
};

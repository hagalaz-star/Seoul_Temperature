import { WeatherResponse } from "../types/weather";

// 차트 데이터 포인트의 타입
interface ChartDataPoint {
  time: string;
  temperature_2m?: number;
  temperature_2m_max?: number;
  temperature_2m_min?: number;
  precipitation?: number;
  precipitation_sum?: number;
}
interface weatherMetadata {
  latitude: number;
  longitude: number;
  timezone: string;
}

// 전체 변환 데이터의 타입
interface WeatherChartData {
  chartData: ChartDataPoint[];
  metadata: weatherMetadata;
}

const transformerWeatherData = (
  response: WeatherResponse, // api 응답 데이터
  timeRange: "hourly" | "daily" // 시간별/ 일별 구분
): WeatherChartData => {
  // 2. chartData 배열 준비
  const chartData: ChartDataPoint[] = [];

  // 3. 변환 로직
  // timeRange 에 따른 분기 처리
  if (timeRange === "hourly") {
    // hourly 데이터 처리
    const times = response.hourly?.time || [];
    times.forEach((time, index) => {
      const date = new Date(time);
      const formattedTime = `${date.getHours()} : 00`;

      chartData.push({
        time: formattedTime,
        temperature_2m: response.hourly?.temperature_2m?.[index], // 현재 기온
        precipitation: response.hourly?.precipitation?.[index], // 강수량
      });
    });
  } else {
    // daily 데이터 처리
    const times = response.daily?.time || [];
    times.forEach((time, index) => {
      const date = new Date(time);
      const formattedTime = `${date.getMonth() + 1}/${date.getDate()}`;
      const precipSum = response.daily?.precipitation_sum?.[index];
      console.log(`${time} 의 강수량 합계: ${precipSum}mm`); // 디버깅용 로그

      chartData.push({
        time: formattedTime,
        temperature_2m_max: response.daily?.temperature_2m_max?.[index], // 최고기온
        temperature_2m_min: response.daily?.temperature_2m_min?.[index], // 최저 기온
        precipitation_sum: response.daily?.precipitation_sum?.[index],
      });
    });
  }

  return {
    chartData,
    metadata: {
      // 차트 외의 부가정보
      latitude: response.latitude,
      longitude: response.longitude,
      timezone: response.timezone,
    },
  };
};

export type { WeatherChartData, ChartDataPoint, weatherMetadata };
export default transformerWeatherData;

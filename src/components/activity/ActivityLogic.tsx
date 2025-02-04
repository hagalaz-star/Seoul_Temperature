import { useEffect, useState } from "react";
import WeatherActivity from "./WeatherActivity";

const ActivitySuggest = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [suggestedAct, setSuggestedAct] = useState(null);

  const gameTimeOfDay = (hour) => {
    if (hour >= 6 && hour < 12) {
      return "아침";
    } else if (hour >= 12 && hour < 18) {
      return "오후";
    } else {
      return "저녁";
    }
  };

  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();

    const result = gameTimeOfDay(currentHour);
    setTimeOfDay(result);
  }, []);

  const activitiesData = {
    morning: {
      timeRange: { start: 6, end: 12 },
      activities: [
        { name: "조깅", place: "공원 및 운동장", suitable: "맑은 날씨" },
        {
          name: "요가 및 실내운동",
          place: "피트니스 센터 및 집안",
          suitable: "흐린 날씨",
        },
      ],
    },
    afternoon: {
      timeRange: { start: 12, end: 18 },
      activities: [
        {
          name: "자전거 하이킹",
          place: "자전거 전용 도로 및 강 주변 전용 도로",
          suitable: "맑은 날씨",
        },
        {
          name: "실내운동",
          place: "피트니스 센터 및 집",
          suitable: "비 눈 오거나 흐린날씨",
        },
      ],
    },
    night: {
      timeRange: { start: 18, end: 22 },
      activities: [
        {
          name: "산책 및 자전거 하이킹",
          place: "자전거 전용 도로 및 산책길",
          suitable: "맑고 선선한 날씨",
        },
        {
          name: "실내 운동 및 휴식",
          place: "피트니스 센터 및 집",
          suitable: "비 눈 흐린날씨",
        },
      ],
    },
  };

  const weatherCodition = {
    precipitation: {
      name: `강수량`,
      threshold: 1,
      status: (value: any) => (value >= 1 ? "우천" : "맑음"),
    },
    cloudCover: {
      name: `구름양`,
      threshold: 75,
      status: (value: any) => (value >= 75 ? `흐림` : `맑음`),
    },
    temperature: {
      name: `기온`,
      thresholdHigh: 30,
      thresholdRow: 5,
      status: (value: any) => {
        if (value >= 30) return `폭염`;
        if (value < 5) return `추움`;
        return `보통`;
      },
    },
  };
};

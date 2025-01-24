import { useMemo } from "react";
import { TimeDisplayProps } from "../../types/timeTypes";

const TimeDisplay = ({
  currentTime,
  timeRange,
  className = "",
}: TimeDisplayProps) => {
  const baseClassName = `time-display ${className}`.trim();

  const formatTime = useMemo(() => {
    const formatTimeString = () => {
      const date = new Date(currentTime);

   

      // 기존 포맷
      if (timeRange === "hourly") {
        const hourly = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return `${hourly}시 ${minute}분`;
      } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}년 ${month}월 ${day}일`;
      }
    };
    return formatTimeString();
  }, [currentTime, timeRange]);
  // 차트용으로 사용될 때는 문자열만 반환


  // 기존 컴포넌트 렌더링
  return (
    <div className={baseClassName}>
      <div className="time-label">
        {timeRange === "hourly" ? "현재시간" : "날짜"}
      </div>
      <div className="time-value">{formatTime}</div>
    </div>
  );
};

export default TimeDisplay;

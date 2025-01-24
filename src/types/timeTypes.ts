// 시간 표시 컴포넌트의 props 타입
export interface TimeDisplayProps {
  currentTime: string;
  timeRange: "hourly" | "daily";
  className?: string;
  format?: "display" | "chart";
}

// 포맷팅된 시간 정보 타입
export interface FormattedTimeInfo {
  date: string;
  time?: string;
  label: string;
}

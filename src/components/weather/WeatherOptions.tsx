import "./WeatherOptions.css";

interface WeatherDisplayOptions {
  timeRange: "hourly" | "daily";
  showCurrentTemp: boolean;
  showMaxTemp: boolean;
  showMinTemp: boolean;
  showPrecipitation: boolean;
  showPrecipitationSum: boolean; // 일일 강수량 합계
}

interface WeatherOptionsProps {
  displayOptions: WeatherDisplayOptions;
  onOptionsChange: (newOptions: WeatherDisplayOptions) => void;
}

const WeatherOptions = ({
  displayOptions,
  onOptionsChange,
}: WeatherOptionsProps) => {
  const handleOptionChange = (optionName: string) => {
    const newOptions = {
      ...displayOptions,
      [optionName]: !displayOptions[optionName as keyof WeatherDisplayOptions],
    };
    onOptionsChange(newOptions);
  };

  if (displayOptions.timeRange === "hourly") {
    return (
      <div className="weather-options-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={displayOptions.showCurrentTemp}
            onChange={() => handleOptionChange("showCurrentTemp")}
          />
          <span className="custom-checkbox"></span>현재기온
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={displayOptions.showPrecipitation}
            onChange={() => handleOptionChange("showPrecipitation")}
          />
          <span className="custom-checkbox"></span>시간당 강수량
        </label>
      </div>
    );
  }

  return (
    <div className="weather-options-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={displayOptions.showMaxTemp}
          onChange={() => handleOptionChange("showMaxTemp")}
        />
        <span className="custom-checkbox"></span>최고기온
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={displayOptions.showMinTemp}
          onChange={() => handleOptionChange("showMinTemp")}
        />
        <span className="custom-checkbox"></span>최저기온
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={displayOptions.showPrecipitationSum}
          onChange={() => handleOptionChange("showPrecipitationSum")}
        />
        <span className="custom-checkbox"></span>
        일일 강수량 합계
      </label>
    </div>
  );
};

export default WeatherOptions;

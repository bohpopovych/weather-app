import React from 'react';

import { useSelector } from 'react-redux';

export default function Tooltip() {
  const weatherState = useSelector((s) => s.weatherState);

  return (
    <div>
      <div>
        Temperature: <strong>{weatherState.temperature}℃</strong>
      </div>
      <div>
        Feel Likes: <strong>{weatherState.feelsLike}℃</strong>
      </div>
      <div>
        Max. Temperature: <strong>{weatherState.maxTemperature}℃</strong>
      </div>
      <div>
        Min. Temperature: <strong>{weatherState.minTemperature}℃</strong>
      </div>
      <div>
        Humidity: <strong>{weatherState.humidity}%</strong>
      </div>
    </div>
  );
}

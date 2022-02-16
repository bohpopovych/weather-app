import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Select from 'react-select';

import { useDispatch } from 'react-redux';

import countries from '../data/countries.json';

import { MAPBOX_TOKEN, WEATHER_TOKEN } from '../const';

export default function Search() {
  const [option, setOption] = useState(undefined);
  const dispatch = useDispatch();

  const getWeather = useCallback(
    async function (coordinates) {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lon=${coordinates[0]}&lat=${coordinates[1]}&appid=${WEATHER_TOKEN}`;
      const response = await fetch(url);
      const data = await response.json();

      dispatch({
        type: 'setWeatherState',
        payload: {
          temperature: Math.round(data['main']['temp']),
          humidity: data['main']['humidity'],
          feelsLike: Math.round(data['main']['feels_like']),
          maxTemperature: Math.round(data['main']['temp_max']),
          minTemperature: Math.round(data['main']['temp_min']),
        },
      });
    },
    [dispatch]
  );

  const getCoordinates = useCallback(
    async function (option) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${option.value}.json?types=country&access_token=${MAPBOX_TOKEN}`;
      const response = await fetch(url);
      const data = await response.json();
      data['features'].forEach((element) => {
        if (element['properties']['short_code'] === option.value) {
          dispatch({
            type: 'setViewState',
            payload: {
              zoom: 6,
              longitude: element['center'][0],
              latitude: element['center'][1],
            },
          });
          dispatch({
            type: 'setMarkerState',
            payload: {
              longitude: element['center'][0],
              latitude: element['center'][1],
            },
          });

          getWeather(element['center']);
        }
      });
    },
    [getWeather, dispatch]
  );

  useEffect(() => {
    if (option) {
      getCoordinates(option);
    }
  }, [option, getCoordinates]);

  const options = useMemo(() => {
    return countries.map((item) => ({
      label: item.name,
      value: item.code.toLocaleLowerCase(),
    }));
  }, []);

  return (
    <Select
      className="search"
      classNamePrefix="select"
      placeholder="Search Country"
      defaultValue={option}
      isClearable={true}
      isSearchable={true}
      name="search"
      options={options}
      onChange={setOption}
    />
  );
}

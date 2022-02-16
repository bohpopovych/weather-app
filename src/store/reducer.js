import { createStore } from 'redux';

function mapStateReducer(state, action) {
  switch (action.type) {
    case 'setViewState':
      return { ...state, viewState: action.payload };
    case 'setMarkerState':
      return { ...state, markerState: action.payload };
    case 'setWeatherState':
      return { ...state, weatherState: action.payload };

    default:
      return state;
  }
}

const defaultMapState = {
  viewState: {
    latitude: 51.5,
    longitude: -0.11,
    zoom: 6,
  },
  markerState: {
    latitude: null,
    longitude: null,
  },
  weatherState: {
    temperature: 0,
    humidity: 0,
    feelsLike: 0,
    maxTemperature: 0,
    minTemperature: 0,
  },
};

export default createStore(mapStateReducer, defaultMapState);

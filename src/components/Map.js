import React, { useCallback, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

import { useSelector, useDispatch } from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';

import Tooltip from './Tooltip';

import { MAPBOX_TOKEN } from '../const';

export default function MapView() {
  const mapRef = useRef();
  const viewState = useSelector((s) => s.viewState);
  const markerState = useSelector((s) => s.markerState);
  const dispatch = useDispatch();

  const onMove = useCallback(
    (e) => {
      dispatch({ type: 'setViewState', payload: e.viewState });
    },
    [dispatch]
  );

  return (
    <Map
      {...viewState}
      ref={mapRef}
      onMove={onMove}
      style={{ height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {markerState.latitude && (
        <Marker
          latitude={markerState.latitude}
          longitude={markerState.longitude}
          color="blue"
        />
      )}
      {markerState.longitude && (
        <Popup
          latitude={markerState.latitude}
          longitude={markerState.longitude}
          anchor="bottom"
          offset={50}
          closeButton={false}
          closeOnClick={false}
        >
          <Tooltip />
        </Popup>
      )}
    </Map>
  );
}

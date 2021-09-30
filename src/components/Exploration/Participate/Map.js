import React from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import markerIcon from "src/assets/img/location.svg";

const telescopIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function Map({ coord }) {
  return coord ? (
    <MapContainer
      // Centering on the map of france
      center={coord}
      zoom={6}
      maxZoom={18}
      minZoom={3}
    >
      {/* Add layer dark map */}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIA_API_KEY}`}
        name="tiles"
      />

      <Marker
        names="marker"
        position={coord !== null && coord.length === 2 ? coord : [0, 0]}
        icon={telescopIcon}
      />
    </MapContainer>
  ) : (
    ""
  );
}

Map.propTypes = {
  coord: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Map.defaultProps = {
  coord: [],
};

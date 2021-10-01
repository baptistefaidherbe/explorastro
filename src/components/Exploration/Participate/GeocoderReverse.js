import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'src/assets/img/location.svg';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';

const telescopIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function GeocoderReverse({ coord }) {
  const map = useMap();
  // eslint-disable-next-line max-len
  const geocoder = L.Control.Geocoder.arcgis(process.env.ARCIS_API_KEY);
  useEffect(() => {
    if (coord?.length) {
      const latLon = L.latLng(coord);
      const bounds = latLon.toBounds(500);
      map.panTo(latLon).fitBounds(bounds);
      geocoder.reverse(latLon, 1, (resp) => L.marker(coord, { icon: telescopIcon })
        .addTo(map)
        .bindPopup(resp[0].name)
        .openPopup());
    }
  }, [coord]);
  return null;
}

GeocoderReverse.propTypes = {
  coord: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

GeocoderReverse.defaultProps = {
  coord: [],
};

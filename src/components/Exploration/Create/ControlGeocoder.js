/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder";

import markerIcon from "src/assets/img/location.svg";
import L from "leaflet";
import PropTypes from "prop-types";

const telescopIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function ControlGeocoder({ coordLocation, coord }) {
  const map = useMap();
  // eslint-disable-next-line max-len
  let geocoder = L.Control.Geocoder.arcgis(process.env.ARCIS_API_KEY);
  useEffect(() => {
    if (typeof URLSearchParams !== "undefined" && location.search) {
      const params = new URLSearchParams(location.search);
      const geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      }
    }
    if (coord?.length) {
      const latLon = L.latLng(coord);
      const bounds = latLon.toBounds(500);
      map.panTo(latLon).fitBounds(bounds);
      geocoder.reverse(latLon, 1, (resp) =>
        L.marker(coord).addTo(map).bindPopup(resp[0].name).openPopup()
      );
    }
  }, [coord]);

  useEffect(() => {
    L.Control.geocoder({
      query: "",
      placeholder: "adresse... ",
      defaultMarkGeocode: false,
      geocoder,
      collapsed: false,
      position: "topleft",
    })
      .on("markgeocode", (e) => {
        const latlng = e.geocode.center;
        const tabCoord = [latlng.lat, latlng.lng];
        coordLocation(tabCoord);
        L.marker(latlng, { icon: telescopIcon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);

  return null;
}

ControlGeocoder.propTypes = {
  coordLocation: PropTypes.func.isRequired,
  coord: PropTypes.object,
};

// ControlGeocoder.defaultProps = {
//   coord: [],
// };

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer, Marker, Popup, useMap,
} from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import home from 'src/assets/img/home.svg';
import markerIcon from 'src/assets/img/location.svg';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { FaInfoCircle } from 'react-icons/fa';

const telescopIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const homeIcon = L.icon({
  iconUrl: home,
  iconSize: [30, 30],
});

export default function Map({ fieldZone, positionGeoloc, filterEvents }) {
  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      map.eachLayer((layer) => {
        if (layer?.options?.name === 'circle') {
          map.removeLayer(layer);
        }
      });
      const radius = fieldZone * 1000;
      const circle = L.circle(positionGeoloc, radius, {
        color: '#220033',
        name: 'circle',
      });

      const layerGroup = L.layerGroup([circle]);
      layerGroup.addTo(map);
    }, [fieldZone]);

    return (
      <>
        <MarkerClusterGroup className="MarkerClusterGroup">
          {filterEvents.map((element) => (
            <Marker
              key={element.id}
              position={element.coord}
              icon={telescopIcon}
            >
              <Popup name="popup" className="map-popup">
                <h3>{element.name}</h3>
                <img src={element.image_url} alt={element.name} />
                <Link
                  className="button --secondary"
                  to={`/exploration/${element.id}`}
                >
                  <span className="icon">
                    <FaInfoCircle />
                  </span>
                  <span>Informations</span>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <Marker position={positionGeoloc} icon={homeIcon}>
          <Popup>Votre domicile</Popup>
        </Marker>
      </>
    );
  };

  return (
    <MapContainer
      // Centering on the map of france
      center={[46.232192999999995, 2.209666999999996]}
      zoom={6.4}
      maxZoom={18}
      minZoom={3}
      className="map"
    >
      {/* Add layer dark map */}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIA_API_KEY}`}
        name="tiles"
      />
      {/* Add Markers events astro on the map */}
      <LocationMarker />
    </MapContainer>
  );
}

Map.propTypes = {
  fieldZone: PropTypes.number.isRequired,
  positionGeoloc: PropTypes.object.isRequired,
  filterEvents: PropTypes.array.isRequired,
};

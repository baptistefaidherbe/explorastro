import React, { useEffect, useState } from 'react';
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

// const homeIcon = L.icon({
//   iconUrl: home,
//   iconSize: [30, 20],
// });

export default function Map({ explorations }) {
  // eslint-disable-next-line new-cap
  function LocationMarker() {
    // const [positionGeoloc, setPosition] = useState(null);
    // const map = useMap();

    // useEffect(() => {
    //   let isCancelled = false;

    //   map.locate().on("locationfound", (e) => {
    //     if (!isCancelled) {
    //       setPosition(e.latlng);

    //       let circle;

    //       map.eachLayer((layer) => {
    //         if (
    //           layer.options.name !== "tiles" &&
    //           layer.name !== "MarkerClusterGroup"
    //         ) {
    //           map.removeLayer(layer);
    //         }
    //       });

    //       const radius = fieldZone * 1000;
    //       circle = L.circle(e.latlng, radius, { color: "#220033" });

    //       circle = L.circle(e.latlng, radius, { color: "#220033" });
    //       circle.addTo(map);
    //     }
    //   });

    //   return () => {
    //     isCancelled = true;
    //   };
    // }, []);

    return (
      <>
        <MarkerClusterGroup className="MarkerClusterGroup">
          {explorations.map((element) => {
            const lat = parseFloat(element.geog[0], 10);
            const long = parseFloat(element.geog[1], 10);
            const coord = [lat, long];
            console.log(coord);
            return (
              <div key={element.id}>
                <Marker names="marker" position={coord} icon={telescopIcon}>
                  <Popup name="popup" className="map-popup">
                    <h3>{element.name}</h3>
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
              </div>
            );
          })}
        </MarkerClusterGroup>
        {/* <Marker position={positionGeoloc} icon={homeIcon}>
          <Popup>Votre domicile</Popup>
        </Marker> */}
      </>
    );
  }

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
  explorations: PropTypes.arrayOf(PropTypes.object).isRequired,
  //   fieldZone: PropTypes.number.isRequired,
};

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import home from "src/assets/img/home.svg";
import markerIcon from "src/assets/img/location.svg";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { FaInfoCircle } from "react-icons/fa";

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

export default function Map({
  explorations,
  fieldZone,
  departement,
  searchName,
  searchAuthor,
  explosFilter,
  positionGeoloc,
}) {
  const LocationMarker = () => {
    const map = useMap();

    // useEffect(() => {
    //   map.eachLayer((layer) => {
    //     if (layer.options.name !== "tiles") {
    //       // map.removeLayer(layer);
    //       console.log(layer.options.radius);
    //     }
    //   });
    // });

    useEffect(() => {
      map.eachLayer((layer) => {
        if (layer?.options?.name === "toto") {
          map.removeLayer(layer);
        }
      });
      const radius = fieldZone * 1000;
      const circle = L.circle(positionGeoloc, radius, {
        color: "#220033",
        name: "toto",
      });

      const layerGroup = L.layerGroup([circle]);
      layerGroup.addTo(map);
      // layerGroup.eachLayer((layer) => {
      //   if (layerGroup.getLayers().length > 1) {
      //     layerGroup.removeLayer(layer);
      //   }
      // });
    }, [fieldZone]);

    const getDistance = (coord) => {
      let distance;
      if (coord && positionGeoloc) {
        const markerFrom = L.circleMarker(coord);
        const markerTo = L.circleMarker([
          positionGeoloc.lat,
          positionGeoloc.lng,
        ]);
        const from = markerFrom.getLatLng();
        const to = markerTo.getLatLng();

        distance = from.distanceTo(to).toFixed(0) / 1000;
      }
      return distance;
    };

    const explos = explorations.map((element) => {
      const lat = parseFloat(element.geog[0], 10);
      const long = parseFloat(element.geog[1], 10);
      const coord = [lat, long];
      const distance = getDistance(coord);
      element.coord = coord;
      element.distance = distance;
      return element;
    });

    const filterEvents = explosFilter(
      explos,
      departement,
      fieldZone,
      searchName,
      searchAuthor
    );
    return (
      <>
        <MarkerClusterGroup className="MarkerClusterGroup">
          <h1>toto</h1>
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
  explorations: PropTypes.arrayOf(PropTypes.object).isRequired,
  fieldZone: PropTypes.number.isRequired,
  departement: PropTypes.string.isRequired,
  searchName: PropTypes.string.isRequired,
  searchAuthor: PropTypes.string.isRequired,
  explosFilter: PropTypes.func.isRequired,
  positionGeoloc: PropTypes.object,
};
Map.defaultProps = {
  positionGeoloc: { lat: 43.8882303, lng: 1.5446796 },
};

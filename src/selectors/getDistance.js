import L from 'leaflet';

const getDistance = (coord, positionGeoloc) => {
  const markerFrom = L.circleMarker(coord);
  const markerTo = L.circleMarker([positionGeoloc.lat, positionGeoloc.lng]);
  const from = markerFrom.getLatLng();
  const to = markerTo.getLatLng();

  const distance = from.distanceTo(to).toFixed(0) / 1000;

  return distance;
};
export default getDistance;

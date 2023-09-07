/* eslint-disable react/prop-types */
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../Hooks/useGeolocation";
import Button from "./Button";

const Map = () => {
  // const [searchParam, setSearchParam] = useSearchParams();
  const [searchParam] = useSearchParams(); //if i dont need to change state i can eradicate set....

  const {
    isLoading: isloadingposition,
    position: geoposition,
    getPosition,
  } = useGeolocation();
  // console.log(geoposition);

  const [mapPosition, setmapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const maplat = searchParam.get("lat");
  const maplng = searchParam.get("lng");

  useEffect(
    function () {
      if (maplat && maplng) setmapPosition([maplat, maplng]);
    },
    [maplat, maplng]
  );

  useEffect(
    function () {
      if (geoposition) setmapPosition([geoposition.lat, geoposition.lng]);
    },
    [geoposition]
  );

  return (
    <div className={styles.mapContainer}>
      {geoposition && (
        <Button type="position" onClick={getPosition}>
          {isloadingposition ? "Loading..... " : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[maplat, maplng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>{" "}
              <span>
                {city.cityName}, {city.country}
              </span>
            </Popup>
          </Marker>
        ))}
        {/* <ChangeCenter position={[maplat || 10, maplng || 3]} /> */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null; //this is component so it should return jsx so we are returning null instead of jsx
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

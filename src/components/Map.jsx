import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const [mapPosition, setmapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const maplat = searchParam.get("lat");
  const maplng = searchParam.get("lng");

  const navigate = useNavigate();

  //   onClick={() => navigate("form")}

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        // center={mapPosition}
        center={[maplat, maplng]}
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
      </MapContainer>
    </div>
  );
};
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null; //this is component so it should return jsx so we are returning null instead of jsx
}

export default Map;

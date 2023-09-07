import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const [mapPosition, setmapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  const navigate = useNavigate();

  //   onClick={() => navigate("form")}

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
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

export default Map;

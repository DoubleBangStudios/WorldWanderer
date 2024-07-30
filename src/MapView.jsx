import "./MapView.css";
import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapView = () => {
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  });

  const allValuesNull = (obj) =>
    Object.values(obj).every((value) => value === null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS,
  });

  const mapViewStyle = {
    width: "400px",
    height: "400px",
    position: "absolute",
    bottom: "85px",
    right: "250px",
    zIndex: "1000",
  };

  const handleClickedMap = (e) => {
    const newCoords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setCoords(newCoords);
  };

  return isLoaded ? (
    <div className="container-view">
      <GoogleMap
        mapContainerStyle={mapViewStyle}
        zoom={1}
        center={coords}
        onClick={handleClickedMap}
      >
        <Marker
          position={
            !allValuesNull(coords) ? { lat: coords.lat, lng: coords.lng } : {}
          }
        />
      </GoogleMap>
    </div>
  ) : (
    <div></div>
  );
};

export default MapView;

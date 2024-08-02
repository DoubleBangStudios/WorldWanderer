import "./MapView.css";
import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setFirstEnd } from "./features/map/mapSlice";

const MapView = () => {
  const dispatch = useDispatch();
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

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
    dispatch(setFirstEnd(newCoords));
  };

  console.log("rerender......");

  return isLoaded ? (
    <div className="container-view">
      <GoogleMap
        mapContainerStyle={mapViewStyle}
        zoom={1}
        center={coords}
        onClick={handleClickedMap}
      >
        {coords.lat !== 0 && coords.lng !== 0 && <Marker position={coords} />}
      </GoogleMap>
    </div>
  ) : (
    <div></div>
  );
};

export default MapView;

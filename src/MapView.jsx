import "./MapView.css";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const MapView = () => {
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

  return isLoaded ? (
    <div className="container-view">
      <GoogleMap
        mapContainerStyle={mapViewStyle}
        zoom={1}
        center={{ lat: 0, lng: 0 }}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default MapView;

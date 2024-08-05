import "./MapView.css";
import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { firstStart } from "./features/map/mapSlice";
import { selectResults } from "./features/map/mapSelectors";

const MapView = () => {
  const dispatch = useDispatch();
  const [coords, setCoords] = useState({
    lat: 5,
    lng: 5,
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
    dispatch(firstStart(newCoords));
  };

  const showRes = useSelector(selectResults);

  return isLoaded && !showRes ? (
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

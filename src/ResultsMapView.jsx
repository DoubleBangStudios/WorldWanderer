import "./ResultsMapView.css";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  selectEndCoords,
  selectStartCoords,
  selectResults,
} from "./features/map/mapSelectors";

const ResultsMapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS,
  });

  const mapViewStyle = {
    width: "2400px",
    height: "1200px",
    marginLeft: "5%",
    marginTop: "2%",
    zIndex: "1000",
  };

  const showRes = useSelector(selectResults);
  const endCoords = {
    lat: useSelector(selectEndCoords).lat,
    lng: useSelector(selectEndCoords).lng,
  };
  const startCoords = {
    lat: useSelector(selectStartCoords).lat,
    lng: useSelector(selectStartCoords).lng,
  };
  const generateMiddleCoords = () => {
    const halfLat = (startCoords.lat + endCoords.lat) / 2;
    const halfLng = (startCoords.lng + endCoords.lng) / 2;
    return { lat: halfLat, lng: halfLng };
  };

  const middleCoords = generateMiddleCoords();

  return isLoaded && showRes ? (
    <>
      <div className="container-view">
        <GoogleMap
          mapContainerStyle={mapViewStyle}
          zoom={5}
          center={middleCoords}
        >
          <PolylineF
            path={[startCoords, endCoords]}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
          <MarkerF position={startCoords} />
          <MarkerF position={endCoords} />
        </GoogleMap>
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default ResultsMapView;

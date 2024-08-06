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
import { MarkerIcon } from "./assets/SVGIcons";

const ResultsMapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS,
  });

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

  const mapViewStyle = {
    width: "2400px",
    height: "1200px",
    marginLeft: "5%",
    marginTop: "2%",
    zIndex: "1000",
  };

  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
  };

  const lineOptions = {
    strokeOpacity: 0,
    fillOpacity: 0,
    zIndex: 1,
    icons: [
      {
        icon: lineSymbol,
        offset: "0",
        repeat: "15px",
      },
    ],
  };

  return isLoaded && showRes ? (
    <>
      <div className="container-view">
        <GoogleMap
          mapContainerStyle={mapViewStyle}
          zoom={5}
          center={middleCoords}
          options={{ mapTypeControl: false, streetViewControl: false }}
        >
          <PolylineF path={[startCoords, endCoords]} options={lineOptions} />
          <MarkerF
            position={startCoords}
            icon={{
              path: MarkerIcon,
              fillColor: "#39fc03",
              fillOpacity: 1,
              scale: 1.25,
            }}
          />
          <MarkerF
            position={endCoords}
            icon={{
              path: MarkerIcon,
              fillColor: "#fc0303",
              fillOpacity: 1,
              scale: 1.25,
            }}
          />
        </GoogleMap>
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default ResultsMapView;

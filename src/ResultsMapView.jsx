import "./ResultsMapView.css";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { selectResults } from "./features/map/mapSelectors";

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

  return isLoaded && showRes ? (
    <>
      <div>{"should be showing after button click........"}</div>
      <div className="container-view">
        <GoogleMap
          mapContainerStyle={mapViewStyle}
          zoom={1}
          center={{ lat: 0, lng: 0 }}
        >
          <Polyline
            path={[
              { lat: 0, lng: 0 },
              { lat: 0, lng: 0 },
            ]}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        </GoogleMap>
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default ResultsMapView;

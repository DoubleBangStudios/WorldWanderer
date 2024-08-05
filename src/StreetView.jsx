import "./StreetView.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  StreetViewPanorama,
} from "@react-google-maps/api";
import getRandomLatAndLng from "./LocationRepository";
import { useDispatch, useSelector } from "react-redux";
import { results, setFirstStart } from "./features/map/mapSlice";
import { selectResults } from "./features/map/mapSelectors";

const StreetView = () => {
  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS,
  });

  const streetViewStyle = {
    width: "2400px",
    height: "1200px",
    marginLeft: "5%",
    marginTop: "2%",
  };

  const latAndLng = getRandomLatAndLng();
  const streetViewOptions = { addressControl: false };

  const coordsRef = useRef(latAndLng);
  const [currentCoords, setCurrentCoords] = useState(latAndLng);
  const [coordsChanged, setCoordsChanged] = useState(false); // State to trigger useEffect

  // this whole function needs to be changed.  works for now, but it needs love
  const onMarkerPositionChange = useCallback(() => {
    if (
      streetViewRef.current &&
      coordsRef.current.lat &&
      coordsRef.current.lng
    ) {
      const position = streetViewRef.current.getPosition();
      const lat = parseFloat(position.lat().toFixed(7));
      const lng = parseFloat(position.lng().toFixed(7));

      if (coordsRef.current.lat !== lat || coordsRef.current.lng !== lng) {
        coordsRef.current = { lat, lng };
        setCoordsChanged((prev) => !prev); // Toggle state to trigger useEffect
        dispatch(setFirstStart({ lat: lat, lng: lng }));
      }
    }
  }, []);

  const streetViewRef = useRef();

  const onStreetViewLoad = useCallback((streetView) => {
    streetViewRef.current = streetView;
    console.log("StreetView loaded", streetView);
  }, []);

  useEffect(() => {
    setCurrentCoords(coordsRef.current);
  }, [coordsChanged]); // Dependency array includes coordsChanged

  const showRes = useSelector(selectResults);

  const handleClick = () => {
    dispatch(results(true));
  };

  return isLoaded && !showRes ? (
    <>
      <div className="container-view">
        <div
          style={{
            display: "Flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {currentCoords.lat}
          {currentCoords.lng}
          <button
            style={{ backgroundColor: "Lime", marginLeft: "5%" }}
            onClick={handleClick}
          />
        </div>
        <GoogleMap mapContainerStyle={streetViewStyle} zoom={10}>
          <div className="street-view">
            <StreetViewPanorama
              id="street-view"
              mapContainerStyle={streetViewStyle}
              position={coordsRef.current}
              visible={true}
              options={streetViewOptions}
              onLoad={onStreetViewLoad}
              onPositionChanged={onMarkerPositionChange}
            />
          </div>
        </GoogleMap>
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default StreetView;

import React from "react";
import ReactDOM from "react-dom/client";
import StreetView from "./StreetView.jsx";
import MapView from "./MapView.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ResultsMapView from "./ResultsMapView.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ResultsMapView />
      <StreetView />
      <MapView />
    </React.StrictMode>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import StreetView from "./StreetView.jsx";
import MapView from "./MapView.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StreetView />
    <MapView />
  </React.StrictMode>
);

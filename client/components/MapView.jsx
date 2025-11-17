import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon for many bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function MapView({ reports }) {
  const center = reports.length
    ? [reports[0].location.lat, reports[0].location.lng]
    : [31.632, 75.816]; 
  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {reports.map(
        (r) =>
          r.location?.lat && (
            <Marker key={r._id} position={[r.location.lat, r.location.lng]}>
              <Popup>
                <div>
                  <strong>{r.type}</strong>
                  <div>{r.description}</div>
                </div>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getCurrentPosition } from "../utils/geolocation";
import { useEffect, useState } from "react";

// ICONE
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const travelIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// LA POSIZIONE ATTUALE
const currentLocationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function TravelMap({ notes, onMarkerClick }) {
  const [userLocation, setUserLocation] = useState(null);
  const [loadLocation, setLoadLocation] = useState(true);
  const [locErr, setLocErr] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // FILTRO PER I VIAGGI
  const notesWithCoords = notes.filter(
    (note) => note.latitude && note.longitude
  );

  // SE LA GEOLOCATION VA A BUON FINE CENTRALA NELLA MAPPA
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      setLoadLocation(true);
      setLocErr(null);

      const position = await getCurrentPosition();
      setUserLocation({
        latitude: position.latitude,
        longitude: position.longitude,
      });

      console.log("Ti pigghiai", position);
    } catch (error) {
      console.error("Nun ti pigghiai", error.message);
      setLocErr(error.message);
    } finally {
      setLoadLocation(false);
      setMapReady(true);
    }
  };

  // CENTRO LA MAPPA IN BASE ALLA POSIZIONE PRESA SE NO SUI VIAGGI
  const getMapCenter = () => {
    if (userLocation) {
      return [userLocation.latitude, userLocation.longitude];
    }

    if (notesWithCoords.length > 0) {
      return [notesWithCoords[0].latitude, notesWithCoords[0].longitude];
    }

    return [41.9028, 12.4964];
  };

  const mapCenter = getMapCenter();
  const zoomLevel =
    notesWithCoords.length === 0 ? 4 : notesWithCoords.length === 1 ? 6 : 6;

  if (!mapReady) {
    return (
      <div className="mb-4">
        <h4 className="mb-3">🗺️ Dove sei Stato</h4>

        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            height: "500px",
            border: "2px dashed #dee2e6",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <h5 className="text-muted">📍 Rilevando la tua posizione...</h5>
          <p className="text-muted mb-3 text-center">
            ↖️ Consenti e la mappa si centrerà automaticamente su di te!
          </p>

          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setLoadLocation(false);
              setMapReady(true);
            }}
          >
            😓Non vuoi consentire? Vai avanti ➡️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mx-auto">🗺️ Dove sei Stato</h4>
        <div>
          {loadLocation && (
            <small className="text-muted me-2">🔄 Rilevando posizione...</small>
          )}

          {!userLocation && !loadLocation && (
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={getUserLocation}
            >
              📍 Centra su di me
            </button>
          )}
        </div>
      </div>

      {locErr && (
        <div className="alert alert-warning mb-3">
          <strong>⚠️ GPS non disponibile:</strong> {locErr}
        </div>
      )}

      <div
        style={{
          height: "500px",
          width: "w-75",
          borderRadius: "8px",
          overflow: "hidden",
          border: "2px solid #dee2e6",
          margin: "auto",
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
          zoomControl={true}
        >
          {/* MAPPA */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
            subdomains={["a", "b", "c", "d"]}
            maxZoom={20}
          />

          {/* MARKER POSIZIONE ATTUALE */}
          {userLocation && (
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={currentLocationIcon}
            >
              <Popup>
                <div style={{ minWidth: "150px" }}>
                  <h6 className="fw-bold mb-2">📍 Tu sei qui!</h6>
                  <p className="mb-1">
                    <strong>Lat:</strong> {userLocation.latitude.toFixed(4)}
                  </p>
                  <p className="mb-0">
                    <strong>Lng:</strong> {userLocation.longitude.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* MARKER VIAGGI */}
          {notesWithCoords.map((note) => (
            <Marker
              key={note.id}
              position={[note.latitude, note.longitude]}
              icon={travelIcon}
              eventHandlers={{
                click: () => onMarkerClick?.(note),
              }}
            >
              <Popup>
                <div style={{ minWidth: "200px" }}>
                  <h6 className="fw-bold mb-2">{note.title}</h6>
                  <p className="mb-1">
                    <strong>📍</strong> {note.location}
                  </p>
                  <p className="mb-1">
                    <strong>📅</strong>{" "}
                    {new Date(note.date_visited).toLocaleDateString("it-IT")}
                  </p>
                  {note.mood && (
                    <p className="mb-1">
                      <strong>😊</strong> {note.mood}
                    </p>
                  )}
                  {note.actual_expense && (
                    <p className="mb-2">
                      <strong>💶</strong> €{note.actual_expense}
                    </p>
                  )}
                  <button
                    className="btn btn-sm btn-primary w-100"
                    onClick={() => onMarkerClick?.(note)}
                  >
                    Vedi dettagli
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: '',
});

// Sensor data
const sensors = [
  { id: 1, name: 'Sensor 1 (CSIR - PME)', lat: 28.637267, lng: 77.170062, status: 'active' },
  { id: 2, name: 'Sensor 2 (CSIR - HRD)', lat: 28.637140, lng: 77.170748, status: 'active' },
  { id: 3, name: 'Sensor 3 (CSIR - LIB)', lat: 28.636357, lng: 77.170402, status: 'active' },
  { id: 4, name: 'Sensor 4 (CSIR - CAFETERIA)', lat: 28.636459, lng: 77.170821, status: 'active' },
  { id: 5, name: 'Sensor 5 (CSIR - OPP WING)', lat: 28.637197, lng: 77.171388, status: 'active' },
];

// Auto-fit to bounds
const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

// Custom marker icons
const getCustomIcon = (status) =>
  L.divIcon({
    className: '',
    html: `<div class="${status === 'active' ? 'pulse-dot' : 'inactive-dot'}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

const SensorMap = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .pulse-dot {
            width: 16px;
            height: 16px;
            background-color: #22c55e;
            border-radius: 50%;
            position: relative;
            animation: pulse 2s infinite;
            box-shadow: 0 0 0 rgba(34, 197, 94, 0.4);
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 #154734;
            }
            70% {
              transform: scale(1.2);
              box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
          }

          .inactive-dot {
            width: 16px;
            height: 16px;
            background-color: #ef4444;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 6px rgba(0,0,0,0.2);
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Map</h1>
        </div>

        <div style={styles.mapWrapper}>
          <MapContainer scrollWheelZoom={true} style={styles.map}>
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="Street View">
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer checked name="Satellite View">
                <TileLayer
                  attribution='Tiles &copy; Esri'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {sensors.map(sensor => (
              <Marker
                key={sensor.id}
                position={[sensor.lat, sensor.lng]}
                icon={getCustomIcon(sensor.status)}
              >
                <Popup>
                  <strong>{sensor.name}</strong><br />
                  Status: {sensor.status}
                </Popup>
              </Marker>
            ))}

            <FitBounds locations={sensors} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default SensorMap;

// Styles
const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#dae2f7',
    minHeight: '100vh',
    opacity: 0,
    transform: 'translateY(10px)',
    animation: 'fadeInUp 0.5s ease-out forwards'
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: '20px',
    textAlign: 'center',
  },
  headerTitle: {
    color: 'white',
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  mapWrapper: {
    margin: '20px auto',
    width: '90%',
    height: '75vh',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  map: {
    height: '100%',
    width: '100%',
  },
};
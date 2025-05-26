// SensorMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const sensors = [
  { id: 1, name: 'Sensor 1', lat: 32.535652, lng: 76.135836, status: 'active' },  
  { id: 2, name: 'Sensor 2', lat: 29.915268, lng: 73.858505, status: 'active' },
  { id: 3, name: 'Sensor 3', lat: 28.665515, lng: 77.292121, status: 'active' },
  { id: 4, name: 'Sensor 4', lat: 28.587200, lng: 77.394398, status: 'active' }   
];

const SensorMap = ({ height = '80vh', zoom = 5, center = [21.146633, 79.088860] }) => {
  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sensors.map(sensor => (
          <Marker key={sensor.id} position={[sensor.lat, sensor.lng]}>
            <Popup>
              <strong>{sensor.name}</strong><br />
              Status: {sensor.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SensorMap;

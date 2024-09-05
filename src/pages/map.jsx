import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;

// Default icon or custom icon URL
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

const MapView = ({ latitude, longitude, onMarkerDragEnd }) => {
  const map = useMap(); // Correctly use `useMap` here

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude, map]);

  useMapEvents({
    dragend() {
      const { lat, lng } = map.getCenter();
      onMarkerDragEnd(lat, lng);
    }
  });

  return null;
};

const MapLocationPicker = () => {
  const [locationText, setLocationText] = useState('Fetching location...');
  const [manualLocation, setManualLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setLocationText(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationText("Permission denied. Please enable location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationText("Location information is unavailable. Please enter your location manually.");
              break;
            case error.TIMEOUT:
              setLocationText("The request to get your location timed out.");
              break;
            default:
              setLocationText("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      setLocationText('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleManualLocationChange = (e) => {
    setManualLocation(e.target.value);
  };

  const handleLocationSubmit = async () => {
    if (manualLocation) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: manualLocation,
            format: 'json',
            limit: 1,
          },
        });

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLatitude(parseFloat(lat));
          setLongitude(parseFloat(lon));
          setLocationText(`Manual Location: ${manualLocation} (Lat: ${lat}, Lon: ${lon})`);
        } else {
          setLocationText('Location not found. Please try a different search term.');
        }
      } catch (error) {
        setLocationText('Failed to fetch the location. Please try again later.');
      }
    }
  };

  const handleMarkerDragEnd = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationText(`Dragged Location: Latitude ${lat}, Longitude ${lng}`);
  };

  return (
    <div>
      <h2>Your Location</h2>
      <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '20px' }}>
        {locationText}
      </div>
      <div>
        <label>
          Enter your location manually:
          <input
            type="text"
            value={manualLocation}
            onChange={handleManualLocationChange}
            placeholder="e.g., New York, NY"
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button onClick={handleLocationSubmit} style={{ marginLeft: '10px' }}>
          Find Location
        </button>
      </div>
      {latitude && longitude && (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapView latitude={latitude} longitude={longitude} onMarkerDragEnd={handleMarkerDragEnd} />
          <Marker 
            position={[latitude, longitude]} 
            draggable={true}
            icon={defaultIcon} // Set the custom or default icon
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                handleMarkerDragEnd(lat, lng);
              }
            }}
          >
            <Popup>
              Location: {locationText}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapLocationPicker;

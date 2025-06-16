import React, { useEffect, useRef, useState } from 'react';
import loadGoogleMapsScript from '../utils/loadGoogleMapsScript';

function MapSection({ lat, lng }) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    loadGoogleMapsScript(GOOGLE_MAPS_KEY);

    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [GOOGLE_MAPS_KEY]);

  useEffect(() => {
    if (!mapLoaded || !lat || !lng) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 16,
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: 'Reported Location',
    });
  }, [mapLoaded, lat, lng]);

  return (
    <div className="Detail-map-section">
      <div
        ref={mapRef}
        style={{ width: '100%', height: '400px', borderRadius: '12px' }}
      />
    </div>
  );
}

export default MapSection;
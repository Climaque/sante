
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address?: string;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  latitude, 
  longitude, 
  address,
  height = "300px" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulation d'une carte (remplace par une vraie intégration Leaflet ou Google Maps)
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="
          width: 100%;
          height: ${height};
          background: linear-gradient(45deg, #e3f2fd 0%, #bbdefb 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 2px dashed #2196f3;
          text-align: center;
          padding: 20px;
        ">
          <div style="font-size: 24px; margin-bottom: 10px;">📍</div>
          <div style="font-weight: bold; margin-bottom: 5px;">Localisation</div>
          <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
            Lat: ${latitude.toFixed(6)}<br>
            Lng: ${longitude.toFixed(6)}
          </div>
          ${address ? `<div style="font-size: 11px; color: #444;">${address}</div>` : ''}
          <div style="font-size: 10px; color: #999; margin-top: 10px;">
            Carte interactive (intégration en cours)
          </div>
        </div>
      `;
    }
  }, [latitude, longitude, address, height]);

  return (
    <div className="w-full">
      <div ref={mapRef} />
    </div>
  );
};

export default MapComponent;

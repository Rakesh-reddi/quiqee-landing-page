'use client'

import { MapContainer, TileLayer, Marker, Popup , Circle, Tooltip} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

//  fixes Next.js not finding the default map pin icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function CoverageMap() {
    const position: [number, number] = [17.4764, 78.2139]
    const coverageRadius = 5000 // 5000 meters = 5km
    return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Coverage Circle */}
      <Circle 
        center={position} 
        radius={coverageRadius} 
        pathOptions={{ 
          color: '#FF6B00', 
          fillColor: '#FF6B00', 
          fillOpacity: 0.15,
          weight: 2 
        }} 
      />

      <Marker position={position} icon={customOrangeIcon}>
        {/* Always-Visible Label */}
        <Tooltip 
          permanent 
          direction="top" 
          offset={[0, -30]} 
          className="font-bold border-none shadow-md text-[#FF6B00]"
        >
            Mokila & Nearby
        </Tooltip>
        {/* Click Popup */}
        <Popup>
          <strong>Quiqee Coverage Center</strong><br />
          Serving Mokila & 5km radius.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

const customOrangeIcon = L.divIcon({
  html: `
    <div style="
      display: flex; 
      align-items: center; 
      justify-content: center; 
      width: 36px; 
      height: 36px; 
      background-color: white; 
      border-radius: 50%; 
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); 
      border: 3px solid #FF6B00;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF6B00" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3" fill="white"/>
      </svg>
    </div>
  `,
  className: '', 
  iconSize: [36, 36],
  iconAnchor: [18, 36], 
  popupAnchor: [0, -40], // popup box above the custom icon
  tooltipAnchor: [0, -40],
});
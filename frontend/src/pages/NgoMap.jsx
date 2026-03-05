import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getNgos } from '../services/api';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix typical Leaflet icon issue in React for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function NgoMap() {
    const [ngos, setNgos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNgos(13.0827, 80.2707).then(res => {
            setNgos(res.data);
            setLoading(false);
        }).catch(console.error);
    }, []);

    if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading Map Data...</div>;

    return (
        <div className="space-y-6 animate-fade-in-up h-[80vh]">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">NGO Network</h2>
                    <p className="text-gray-600">Smart routing distribution points</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full border border-gray-100 relative z-0">
                <MapContainer center={[13.0827, 80.2707]} zoom={12} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    {ngos.map((ngo, idx) => (
                        <Marker key={idx} position={[ngo.lat, ngo.lng]}>
                            <Popup className="rounded-xl shadow-lg border-0">
                                <div className="p-1">
                                    <h3 className="font-bold text-lg text-primary-900 mb-1">{ngo.name || ngo.ngo_name}</h3>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3">
                                        <span className="text-gray-500 font-semibold">Capacity</span>
                                        <span className="text-right font-bold text-primary-600">{ngo.capacity} meals</span>
                                        {ngo.distance && (
                                            <>
                                                <span className="text-gray-500 font-semibold">Distance</span>
                                                <span className="text-right font-bold">{ngo.distance} km</span>
                                                <span className="text-gray-500 font-semibold">ETA</span>
                                                <span className="text-right font-bold">{ngo.pickup_eta}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}

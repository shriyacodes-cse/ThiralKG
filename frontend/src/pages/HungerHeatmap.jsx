import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getHeatmap } from '../services/api';

export default function HungerHeatmap() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHeatmap().then(res => {
            setData(res.data);
            setLoading(false);
        }).catch(console.error);
    }, []);

    if (loading) return <div className="text-center mt-20 text-xl font-bold animate-pulse">Loading Demand Data...</div>;

    return (
        <div className="space-y-6 animate-fade-in-up h-[80vh]">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Food Demand & Surplus Heatmap</h2>
                    <p className="text-gray-600">Visualizing high-need zones and recent food rescue activity</p>
                </div>
                <div className="flex space-x-4 bg-white p-3 rounded-xl shadow-sm text-sm font-semibold border border-gray-100">
                    <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span> High Demand / Donations</div>
                    <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> Biogas / Energy</div>
                    <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> Active NGO zones</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full border border-gray-100 relative z-0">
                <MapContainer center={[13.0827, 80.2707]} zoom={11} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    {data.map((point, idx) => {
                        const isBiogas = point.type === "BIOGAS_PLANT";
                        const color = isBiogas ? "#3b82f6" : (point.intensity > 0.5 ? "#ef4444" : "#22c55e");
                        const radius = Math.max(15, point.intensity * 40);

                        return (
                            <CircleMarker
                                key={idx}
                                center={[point.lat, point.lng]}
                                radius={radius}
                                pathOptions={{
                                    fillColor: color,
                                    fillOpacity: 0.6,
                                    color: color,
                                    weight: 0
                                }}
                            >
                                <Popup className="rounded-lg border-0 shadow-lg">
                                    <div className="p-1">
                                        <h3 className="font-bold text-gray-900 border-b pb-1 mb-2">Activity Zone</h3>
                                        <p className="text-sm text-gray-600 mb-1">Status: <span className="font-bold text-primary-600">{point.type}</span></p>
                                        <p className="text-sm text-gray-600 mb-1">Food: <strong>{point.food_type}</strong></p>
                                        <p className="text-sm text-gray-600">Volume: <strong>{point.quantity} meals</strong></p>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}

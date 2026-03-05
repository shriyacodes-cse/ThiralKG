import React, { useEffect, useState } from 'react';
import { getImpact } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Award, Recycle, Zap } from 'lucide-react';

export default function ImpactDashboard() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        getImpact().then(res => setMetrics(res.data)).catch(console.error);
        // Simulate live updates
        const interval = setInterval(() => {
            getImpact().then(res => setMetrics(res.data)).catch(console.error);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!metrics) return <div className="text-center mt-20 text-xl font-bold animate-pulse">Computing Impact Data...</div>;

    const mockTimeline = [
        { name: 'Mon', rescued: metrics.meals_rescued * 0.2 },
        { name: 'Tue', rescued: metrics.meals_rescued * 0.4 },
        { name: 'Wed', rescued: metrics.meals_rescued * 0.6 },
        { name: 'Thu', rescued: metrics.meals_rescued * 0.8 },
        { name: 'Today', rescued: metrics.meals_rescued },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Real-Time Impact</h2>
                    <p className="text-gray-600">Tracking our platform's environmental and social contributions</p>
                </div>
                <div className="flex items-center space-x-2 text-primary-600 bg-primary-50 px-3 py-1 rounded-full font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping"></span>
                    <span>Live Updates</span>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                <div className="glass-panel p-6 shadow-md hover:-translate-y-1 transition-transform relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Award className="w-32 h-32" />
                    </div>
                    <div className="text-primary-600 bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <Award className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Meals Rescued</p>
                    <p className="text-4xl font-extrabold text-gray-900 mt-2">{metrics.meals_rescued}</p>
                </div>

                <div className="glass-panel p-6 shadow-md hover:-translate-y-1 transition-transform relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Recycle className="w-32 h-32 text-blue-600" />
                    </div>
                    <div className="text-blue-600 bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <Recycle className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Waste Prevented</p>
                    <p className="text-4xl font-extrabold text-blue-900 mt-2">{metrics.food_waste_prevented.toFixed(1)} <span className="text-xl">kg</span></p>
                </div>

                <div className="glass-panel p-6 shadow-md hover:-translate-y-1 transition-transform relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Leaf className="w-32 h-32 text-green-600" />
                    </div>
                    <div className="text-green-600 bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <Leaf className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">CO2 Saved</p>
                    <p className="text-4xl font-extrabold text-green-900 mt-2">{metrics.co2_emissions_saved.toFixed(1)} <span className="text-xl">kg</span></p>
                </div>

                <div className="glass-panel p-6 shadow-md hover:-translate-y-1 transition-transform relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap className="w-32 h-32 text-accent-500" />
                    </div>
                    <div className="text-accent-600 bg-accent-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Energy Gen</p>
                    <p className="text-4xl font-extrabold text-accent-900 mt-2">{metrics.energy_generated.toFixed(1)} <span className="text-xl">kWh</span></p>
                </div>
            </div>

            <div className="glass-panel p-8 mt-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Weekly Progress (Meals Rescued)</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockTimeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                cursor={{ stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '5 5' }}
                            />
                            <Line type="monotone" dataKey="rescued" stroke="#22c55e" strokeWidth={4} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

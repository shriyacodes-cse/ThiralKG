import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Navigation2, Activity } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center py-12 px-4 space-y-16 animate-fade-in-up">
            {/* Hero Section */}
            <div className="text-center max-w-3xl space-y-6">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Rescue Food. <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                        Feed People. Protect the Planet.
                    </span>
                </h1>
                <p className="text-xl text-gray-600">
                    An AI-powered circular food economy platform. We detect surplus food and intelligently distribute it using location intelligence and smart routing.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                    <Link to="/report" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full shadow-lg shadow-primary-500/30 transition-all hover:scale-105">
                        Report Surplus Food
                    </Link>
                    <Link to="/map" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 rounded-full shadow-sm transition-all hover:scale-105">
                        View NGO Network
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mt-16">
                <div className="glass-panel p-8 text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold">AI Decision Engine</h3>
                    <p className="text-gray-600">Automatically routes food based on quantity, age, and location, minimizing waste.</p>
                </div>
                <div className="glass-panel p-8 text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Navigation2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Smart Distribution</h3>
                    <p className="text-gray-600">Matches donations with the nearest verified NGOs using Google Maps distance matrix scaling.</p>
                </div>
                <div className="glass-panel p-8 text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
                    <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-accent-500" />
                    </div>
                    <h3 className="text-xl font-bold">Real-time Impact</h3>
                    <p className="text-gray-600">Tracks meals rescued and CO2 emissions saved, displaying live data on the dashboard.</p>
                </div>
            </div>
        </div>
    );
}

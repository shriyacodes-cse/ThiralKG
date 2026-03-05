import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Map, Activity, PlusCircle, Globe2 } from 'lucide-react';

export default function Navigation() {
    const activeClass = "bg-primary-600 text-white rounded-lg flex items-center px-4 py-2 shadow-md transition-all";
    const defaultClass = "text-gray-600 hover:text-primary-600 flex items-center px-4 py-2 transition-all";

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-600">
                    <Leaf className="w-8 h-8" />
                    <span>AI Food Rescue</span>
                </NavLink>
                <nav className="hidden md:flex space-x-2">
                    <NavLink to="/" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                        Home
                    </NavLink>
                    <NavLink to="/report" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                        <PlusCircle className="w-5 h-5 mr-1" /> Report Food
                    </NavLink>
                    <NavLink to="/map" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                        <Map className="w-5 h-5 mr-1" /> NGOs
                    </NavLink>
                    <NavLink to="/heatmap" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                        <Globe2 className="w-5 h-5 mr-1" /> Heatmap
                    </NavLink>
                    <NavLink to="/impact" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                        <Activity className="w-5 h-5 mr-1" /> Impact
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

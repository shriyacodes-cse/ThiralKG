import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ReportFood from './pages/ReportFood';
import NgoMap from './pages/NgoMap';
import ImpactDashboard from './pages/ImpactDashboard';
import HungerHeatmap from './pages/HungerHeatmap';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportFood />} />
            <Route path="/map" element={<NgoMap />} />
            <Route path="/heatmap" element={<HungerHeatmap />} />
            <Route path="/impact" element={<ImpactDashboard />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-6 text-center">
          <p className="opacity-75 tracking-wider">© 2026 AI Food Rescue Network. Circular Food Economy Prototype.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

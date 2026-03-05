import React, { useState } from 'react';
import { reportFood } from '../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function ReportFood() {
    const [formData, setFormData] = useState({
        food_type: '',
        quantity: '',
        time_cooked: '',
        location: '',
        event_type: 'Wedding',
        lat: 13.0827,
        lng: 80.2707
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            // simulate capturing user location slightly varying per report
            const payload = { ...formData, quantity: parseInt(formData.quantity) };
            const res = await reportFood(payload);
            setResult(res.data);
        } catch (err) {
            console.error(err);
            alert("Error reporting food. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="glass-panel p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Report Surplus Food</h2>

                {!result ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
                                <input required name="food_type" placeholder="e.g. Veg Biryani" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Meals/Servings)</label>
                                <input required type="number" name="quantity" placeholder="e.g. 40" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time Cooked</label>
                                <input required name="time_cooked" placeholder="e.g. 7 PM" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input required name="location" placeholder="e.g. Chennai" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                                <select name="event_type" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all bg-white">
                                    <option>Wedding</option>
                                    <option>Corporate Event</option>
                                    <option>Restaurant</option>
                                    <option>Personal</option>
                                </select>
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center transition-all disabled:opacity-50">
                            {loading ? "Processing via AI..." : "Submit Report"}
                        </button>
                    </form>
                ) : (
                    <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-center space-y-4">
                        <CheckCircle className="w-16 h-16 text-primary-500 mx-auto" />
                        <h3 className="text-2xl font-bold text-gray-900">Food Successfully Routed!</h3>

                        <div className="bg-white p-4 rounded-lg shadow-sm text-left">
                            <p className="text-sm text-gray-500 uppercase font-semibold">AI Routing Decision</p>
                            <div className="flex justify-between items-center mt-2 border-b pb-2">
                                <span className="font-medium text-gray-700">Route Strategy</span>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">{result.route}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2 border-b pb-2">
                                <span className="font-medium text-gray-700">Priority Level</span>
                                <span className="bg-accent-500/20 text-accent-600 px-3 py-1 rounded-full text-sm font-bold">{result.priority}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2 pb-2">
                                <span className="font-medium text-gray-700">Receiver</span>
                                <span className="text-gray-800 font-semibold text-right">{result.recommended_receiver}</span>
                            </div>

                            {result.matched_ngo && result.route === "NGO_PICKUP" && (
                                <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                                    <p className="text-sm text-green-900 mb-1"><AlertCircle className="inline w-4 h-4 mr-1" /> Matched with Nearest NGO</p>
                                    <p className="font-bold text-green-800">{result.matched_ngo.ngo_name}</p>
                                    <p className="text-sm text-green-700">ETA: {result.matched_ngo.pickup_eta} ({result.matched_ngo.distance} km away)</p>
                                </div>
                            )}
                        </div>

                        <button onClick={() => setResult(null)} className="text-primary-600 font-semibold hover:underline mt-4">
                            Report Another Surplus
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // FastAPI default port
});

export const getHealth = () => api.get('/health');
export const reportFood = (data) => api.post('/report-food', data);
export const getNgos = (lat, lng) => api.get('/ngos', { params: { lat, lng } });
export const getImpact = () => api.get('/impact');
export const getHeatmap = () => api.get('/heatmap');

export default api;

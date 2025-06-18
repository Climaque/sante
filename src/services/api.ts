
import axios from 'axios';

// Configuration de base pour les appels API
const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Port correct pour Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 secondes
});

// Intercepteur pour ajouter l'authentification si nécessaire
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Gérer la déconnexion automatique
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services API pour chaque entité
export const patientsService = {
  getAll: () => api.get('/patients'),
  getById: (id: number) => api.get(`/patients/${id}`),
  create: (data: any) => api.post('/patients', data),
  update: (id: number, data: any) => api.put(`/patients/${id}`, data),
  delete: (id: number) => api.delete(`/patients/${id}`),
};

export const medecinsService = {
  getAll: () => api.get('/medecins'),
  getById: (id: number) => api.get(`/medecins/${id}`),
  create: (data: any) => api.post('/medecins', data),
  update: (id: number, data: any) => api.put(`/medecins/${id}`, data),
  delete: (id: number) => api.delete(`/medecins/${id}`),
};

export const rendezvousService = {
  getAll: () => api.get('/rendezvous'),
  getById: (id: number) => api.get(`/rendezvous/${id}`),
  create: (data: any) => api.post('/rendezvous', data),
  update: (id: number, data: any) => api.put(`/rendezvous/${id}`, data),
  delete: (id: number) => api.delete(`/rendezvous/${id}`),
  accept: (id: number) => api.patch(`/rendezvous/${id}/accept`),
  reject: (id: number) => api.patch(`/rendezvous/${id}/reject`),
};

export default api;

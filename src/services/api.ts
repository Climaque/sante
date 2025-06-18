
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

// Types pour les entités
interface Patient {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  dateNaissance: string;
  sexe: string;
}

interface Medecin {
  id?: number;
  nom: string;
  prenom: string;
  specialite: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  codePostal: string;
  disponible: boolean;
}

interface RendezVous {
  id?: number;
  patientNom: string;
  patientPrenom: string;
  medecinNom: string;
  medecinPrenom: string;
  dateRendezVous: string;
  heureRendezVous: string;
  motif: string;
  statut: string;
  notes?: string;
}

// Services API pour chaque entité
export const patientsService = {
  getAll: () => api.get<Patient[]>('/patients'),
  getById: (id: number) => api.get<Patient>(`/patients/${id}`),
  create: (data: Omit<Patient, 'id'>) => api.post<Patient>('/patients', data),
  update: (id: number, data: Omit<Patient, 'id'>) => api.put<Patient>(`/patients/${id}`, data),
  delete: (id: number) => api.delete(`/patients/${id}`),
};

export const medecinsService = {
  getAll: () => api.get<Medecin[]>('/medecins'),
  getById: (id: number) => api.get<Medecin>(`/medecins/${id}`),
  create: (data: Omit<Medecin, 'id'>) => api.post<Medecin>('/medecins', data),
  update: (id: number, data: Omit<Medecin, 'id'>) => api.put<Medecin>(`/medecins/${id}`, data),
  delete: (id: number) => api.delete(`/medecins/${id}`),
};

export const rendezvousService = {
  getAll: () => api.get<RendezVous[]>('/rendezvous'),
  getById: (id: number) => api.get<RendezVous>(`/rendezvous/${id}`),
  create: (data: Omit<RendezVous, 'id'>) => api.post<RendezVous>('/rendezvous', data),
  update: (id: number, data: Omit<RendezVous, 'id'>) => api.put<RendezVous>(`/rendezvous/${id}`, data),
  delete: (id: number) => api.delete(`/rendezvous/${id}`),
  accept: (id: number) => api.patch<RendezVous>(`/rendezvous/${id}/accept`),
  reject: (id: number) => api.patch<RendezVous>(`/rendezvous/${id}/reject`),
};

export default api;

// Export des types pour utilisation dans d'autres composants
export type { Patient, Medecin, RendezVous };

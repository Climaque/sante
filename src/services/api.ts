
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
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  dateNaissance: string;
  sexe: string;
  numeroSecuriteSociale: string;
  symptomes?: string[];
  latitude?: number;
  longitude?: number;
  historiqueConsultations?: Consultation[];
}

interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  codePostal: string;
  disponible: boolean;
  latitude?: number;
  longitude?: number;
  validated?: boolean;
  experience?: string;
  tarif?: number; // En Franc CFA
  disponibilites?: string[];
}

interface RendezVous {
  id: number;
  patientId: number;
  medecinId: number;
  patientNom: string;
  patientPrenom: string;
  medecinNom: string;
  medecinPrenom: string;
  dateRendezVous: string;
  heureRendezVous: string;
  motif: string;
  statut: 'EN_ATTENTE' | 'ACCEPTE' | 'REFUSE' | 'TERMINE';
  notes?: string;
  type: 'teleconsultation' | 'physique';
  lienVideo?: string;
}

interface Consultation {
  id: number;
  patientId: number;
  medecinId: number;
  dateConsultation: string;
  type: 'teleconsultation' | 'physique';
  symptomes: string[];
  diagnostic?: string;
  ordonnance?: string;
  recommandations?: string;
  statut: 'en_cours' | 'terminee' | 'annulee';
}

interface CentreSante {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  telephone: string;
  latitude: number;
  longitude: number;
  specialites: string[];
  horaires: string;
}

// Services API pour chaque entité
export const patientsService = {
  getAll: () => api.get<Patient[]>('/patients'),
  getById: (id: number) => api.get<Patient>(`/patients/${id}`),
  create: (data: Omit<Patient, 'id'>) => api.post<Patient>('/patients', data),
  update: (id: number, data: Partial<Patient>) => api.put<Patient>(`/patients/${id}`, data),
  delete: (id: number) => api.delete(`/patients/${id}`),
  getConsultations: (id: number) => api.get<Consultation[]>(`/patients/${id}/consultations`),
};

export const medecinsService = {
  getAll: () => api.get<Medecin[]>('/medecins'),
  getById: (id: number) => api.get<Medecin>(`/medecins/${id}`),
  create: (data: Omit<Medecin, 'id'>) => api.post<Medecin>('/medecins', data),
  update: (id: number, data: Partial<Medecin>) => api.put<Medecin>(`/medecins/${id}`, data),
  delete: (id: number) => api.delete(`/medecins/${id}`),
  validate: (id: number) => api.patch<Medecin>(`/medecins/${id}/validate`),
  getProches: (latitude: number, longitude: number, rayon: number) => 
    api.get<Medecin[]>(`/medecins/proches?lat=${latitude}&lng=${longitude}&rayon=${rayon}`),
};

export const rendezvousService = {
  getAll: () => api.get<RendezVous[]>('/rendezvous'),
  getById: (id: number) => api.get<RendezVous>(`/rendezvous/${id}`),
  create: (data: Omit<RendezVous, 'id'>) => api.post<RendezVous>('/rendezvous', data),
  update: (id: number, data: Partial<RendezVous>) => api.put<RendezVous>(`/rendezvous/${id}`, data),
  delete: (id: number) => api.delete(`/rendezvous/${id}`),
  accept: (id: number) => api.patch<RendezVous>(`/rendezvous/${id}/accept`),
  reject: (id: number) => api.patch<RendezVous>(`/rendezvous/${id}/reject`),
  startVideo: (id: number) => api.post<{lienVideo: string}>(`/rendezvous/${id}/start-video`),
};

export const consultationsService = {
  getAll: () => api.get<Consultation[]>('/consultations'),
  getById: (id: number) => api.get<Consultation>(`/consultations/${id}`),
  create: (data: Omit<Consultation, 'id'>) => api.post<Consultation>('/consultations', data),
  update: (id: number, data: Partial<Consultation>) => api.put<Consultation>(`/consultations/${id}`, data),
  terminer: (id: number, diagnostic: string, ordonnance?: string) => 
    api.patch<Consultation>(`/consultations/${id}/terminer`, { diagnostic, ordonnance }),
};

export const centresSanteService = {
  getAll: () => api.get<CentreSante[]>('/centres-sante'),
  getById: (id: number) => api.get<CentreSante>(`/centres-sante/${id}`),
  create: (data: Omit<CentreSante, 'id'>) => api.post<CentreSante>('/centres-sante', data),
  update: (id: number, data: Partial<CentreSante>) => api.put<CentreSante>(`/centres-sante/${id}`, data),
  delete: (id: number) => api.delete(`/centres-sante/${id}`),
  getProches: (latitude: number, longitude: number, rayon: number) => 
    api.get<CentreSante[]>(`/centres-sante/proches?lat=${latitude}&lng=${longitude}&rayon=${rayon}`),
};

export default api;

// Export des types pour utilisation dans d'autres composants
export type { Patient, Medecin, RendezVous, Consultation, CentreSante };

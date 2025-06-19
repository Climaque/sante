
export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'patient' | 'medecin' | 'admin';
  adresse?: string;
  ville?: string;
  specialite?: string; // Pour les médecins
  validated?: boolean; // Pour les médecins
}

class AuthService {
  private currentUser: User | null = null;

  // Simulation de la base de données des utilisateurs
  private users: User[] = [
    {
      id: 1,
      nom: 'Diallo',
      prenom: 'Amadou',
      email: 'patient@test.com',
      telephone: '+225 07 12 34 56 78',
      role: 'patient',
      adresse: 'Cocody, Abidjan',
      ville: 'Abidjan'
    },
    {
      id: 2,
      nom: 'Kouassi',
      prenom: 'Dr. Marie',
      email: 'medecin@test.com',
      telephone: '+225 01 23 45 67 89',
      role: 'medecin',
      specialite: 'Cardiologie',
      validated: true,
      ville: 'Abidjan'
    },
    {
      id: 3,
      nom: 'Admin',
      prenom: 'Système',
      email: 'admin@test.com',
      telephone: '+225 05 67 89 01 23',
      role: 'admin',
      ville: 'Abidjan'
    }
  ];

  async login(email: string, password: string): Promise<User> {
    // Simulation de la vérification des identifiants
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('auth-token', 'demo-token-' + user.role);
    
    return user;
  }

  async register(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: this.users.length + 1,
    };
    
    this.users.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('auth-token', 'demo-token-' + newUser.role);
    
    return newUser;
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth-token');
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}

export const authService = new AuthService();

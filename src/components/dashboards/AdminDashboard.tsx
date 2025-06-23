
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Users, 
  UserPlus, 
  Stethoscope,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  CheckCircle,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
              <p className="text-gray-600">Bienvenue, {user?.prenom} - Gestion de la plateforme Santé+</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-green-600">+12% ce mois</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-600">Médecins Actifs</CardTitle>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-green-600">+3 nouveaux</p>
                </div>
                <Stethoscope className="h-8 w-8 text-green-500" />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-600">RDV Aujourd'hui</CardTitle>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-green-600">+8% vs hier</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-600">Téléconsultations</CardTitle>
                  <div className="text-2xl font-bold">2,341</div>
                  <p className="text-xs text-gray-600">Ce mois</p>
                </div>
                <Activity className="h-8 w-8 text-orange-500" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Actions d'administration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Ajouter un Médecin</span>
              </CardTitle>
              <CardDescription>Enregistrer un nouveau médecin dans la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/medecins/new">
                <Button className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ajouter un médecin
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Gérer les Utilisateurs</span>
              </CardTitle>
              <CardDescription>Administration des patients et médecins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/patients" className="block">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Gérer les Patients
                  </Button>
                </Link>
                <Link to="/medecins" className="block">
                  <Button variant="outline" className="w-full">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Gérer les Médecins
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics & Rapports</span>
              </CardTitle>
              <CardDescription>Statistiques et analyses de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Voir les statistiques
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Médecins en attente de validation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Médecins en attente de validation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Konan Adjoua</p>
                    <p className="text-sm text-gray-600">Pédiatrie - Abidjan</p>
                    <p className="text-xs text-orange-600">En attente depuis 2 jours</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Valider
                  </Button>
                  <Button size="sm" variant="outline">
                    Rejeter
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Aminata Traoré</p>
                    <p className="text-sm text-gray-600">Dermatologie - Bouaké</p>
                    <p className="text-xs text-orange-600">En attente depuis 1 jour</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Valider
                  </Button>
                  <Button size="sm" variant="outline">
                    Rejeter
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

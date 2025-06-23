
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header avec image de fond */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto p-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Dashboard Administrateur</h1>
              <p className="text-blue-100 mt-2">Bienvenue, {user?.prenom} - Gestion de la plateforme Santé+</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 -mt-4">
        {/* Statistiques globales avec images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-blue-100">Total Patients</CardTitle>
                  <div className="text-3xl font-bold">1,247</div>
                  <p className="text-xs text-blue-200">+12% ce mois</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-green-100">Médecins Actifs</CardTitle>
                  <div className="text-3xl font-bold">89</div>
                  <p className="text-xs text-green-200">+3 nouveaux</p>
                </div>
                <Stethoscope className="h-8 w-8 text-green-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-purple-100">RDV Aujourd'hui</CardTitle>
                  <div className="text-3xl font-bold">156</div>
                  <p className="text-xs text-purple-200">+8% vs hier</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-orange-100">Téléconsultations</CardTitle>
                  <div className="text-3xl font-bold">2,341</div>
                  <p className="text-xs text-orange-200">Ce mois</p>
                </div>
                <Activity className="h-8 w-8 text-orange-200" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Actions d'administration avec images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <CardHeader className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-400 to-blue-600 opacity-10"></div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-fit mx-auto mb-4">
                  <UserPlus className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Ajouter un Médecin</CardTitle>
                <CardDescription className="text-gray-600">Enregistrer un nouveau médecin dans la plateforme</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/medecins/new">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ajouter un médecin
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <CardHeader className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-green-400 to-green-600 opacity-10"></div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-xl">Gérer les Utilisateurs</CardTitle>
                <CardDescription className="text-gray-600">Administration des patients et médecins</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/patients" className="block">
                  <Button variant="outline" className="w-full border-green-300 hover:bg-green-50">
                    <Users className="h-4 w-4 mr-2" />
                    Gérer les Patients
                  </Button>
                </Link>
                <Link to="/medecins" className="block">
                  <Button variant="outline" className="w-full border-green-300 hover:bg-green-50">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Gérer les Médecins
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <CardHeader className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-purple-400 to-purple-600 opacity-10"></div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-fit mx-auto mb-4">
                  <BarChart3 className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Analytics & Rapports</CardTitle>
                <CardDescription className="text-gray-600">Statistiques et analyses de la plateforme</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Voir les statistiques
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section avec image de fond pour les médecins en attente */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-blue-50">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Shield className="h-6 w-6" />
              <span>Médecins en attente de validation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-orange-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Konan Adjoua</p>
                    <p className="text-sm text-gray-600">Pédiatrie - Abidjan</p>
                    <p className="text-xs text-orange-600">En attente depuis 2 jours</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Valider
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                    Rejeter
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-orange-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Aminata Traoré</p>
                    <p className="text-sm text-gray-600">Dermatologie - Bouaké</p>
                    <p className="text-xs text-orange-600">En attente depuis 1 jour</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Valider
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
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

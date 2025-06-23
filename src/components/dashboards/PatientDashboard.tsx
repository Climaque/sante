
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Video, 
  MapPin, 
  Calendar, 
  FileText, 
  Clock,
  User,
  Phone,
  Heart,
  Activity,
  Shield
} from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header avec image de fond */}
      <div className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto p-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Bienvenue, {user?.prenom} {user?.nom}</h1>
              <p className="text-green-100 mt-2">Votre espace santé personnel - Prenez soin de vous</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 -mt-4">
        {/* Actions rapides avec images améliorées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white group">
            <CardHeader className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-400 to-blue-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Video className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Téléconsultation</CardTitle>
                <CardDescription className="text-gray-600">Consultez un médecin depuis chez vous</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/teleconsultation">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Video className="h-4 w-4 mr-2" />
                  Démarrer maintenant
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white group">
            <CardHeader className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-green-400 to-green-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-xl">Médecins proches</CardTitle>
                <CardDescription className="text-gray-600">Trouvez des spécialistes près de vous</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/medecins-proches">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MapPin className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white group">
            <CardHeader className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-400 to-purple-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Prendre RDV</CardTitle>
                <CardDescription className="text-gray-600">Planifiez votre prochaine consultation</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/patient/nouveau-rdv">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Planifier
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Section santé rapide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Votre santé en un coup d'œil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Activity className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Dernière visite</p>
                  <p className="font-semibold">Il y a 3 mois</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Statut</p>
                  <p className="font-semibold text-green-600">Bon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Urgences & Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50">
                  <Phone className="h-4 w-4 mr-2" />
                  Urgences: 185
                </Button>
                <Button variant="outline" className="w-full justify-start border-blue-300 text-blue-600 hover:bg-blue-50">
                  <Phone className="h-4 w-4 mr-2" />
                  Assistance: +225 XX XX XX XX
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mes rendez-vous avec image */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Calendar className="h-6 w-6" />
              <span>Mes rendez-vous</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-12 w-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun rendez-vous planifié</h3>
              <p className="text-gray-600 mb-6">Prenez rendez-vous avec l'un de nos médecins qualifiés</p>
              <Link to="/patient/nouveau-rdv">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  Prendre un rendez-vous
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;

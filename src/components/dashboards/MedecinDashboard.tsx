
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  Video,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  TrendingUp,
  Award
} from 'lucide-react';

const MedecinDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header avec image de fond */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto p-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Stethoscope className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Dr. {user?.prenom} {user?.nom}</h1>
              <div className="flex items-center space-x-3 mt-2">
                <p className="text-emerald-100">Spécialité: {user?.specialite}</p>
                <Badge className="bg-green-500 text-white">
                  <Award className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 -mt-4">
        {/* Statistiques avec design amélioré */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-blue-100">RDV du jour</CardTitle>
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-xs text-blue-200 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1 depuis hier
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-orange-100">En attente</CardTitle>
                  <div className="text-3xl font-bold">2</div>
                  <p className="text-xs text-orange-200">À confirmer</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-green-100">Patients total</CardTitle>
                  <div className="text-3xl font-bold">24</div>
                  <p className="text-xs text-green-200">+3 ce mois</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-purple-100">Téléconsultations</CardTitle>
                  <div className="text-3xl font-bold">8</div>
                  <p className="text-xs text-purple-200">Cette semaine</p>
                </div>
                <Video className="h-8 w-8 text-purple-200" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Actions principales avec images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Calendar className="h-6 w-6" />
                <span>Rendez-vous en attente</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-orange-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mme. Aya Traoré</p>
                      <p className="text-sm text-gray-600">Aujourd'hui 14:30</p>
                      <p className="text-xs text-orange-600">Cardiologie de routine</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">En attente</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-orange-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">M. Koffi Yao</p>
                      <p className="text-sm text-gray-600">Demain 10:00</p>
                      <p className="text-xs text-orange-600">Consultation générale</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">En attente</Badge>
                </div>
              </div>
              <Link to="/rendezvous" className="block mt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Voir tous les RDV
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Video className="h-6 w-6" />
                <span>Téléconsultations du jour</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-emerald-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mlle. Fatou Camara</p>
                      <p className="text-sm text-gray-600">15:00 - Cardiologie</p>
                      <p className="text-xs text-emerald-600">Suivi post-opératoire</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Video className="h-4 w-4 mr-1" />
                    Rejoindre
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-emerald-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">M. Ibrahim Koné</p>
                      <p className="text-sm text-gray-600">16:30 - Consultation</p>
                      <p className="text-xs text-emerald-600">Première consultation</p>
                    </div>
                  </div>
                  <Badge className="bg-teal-100 text-teal-800">Programmé</Badge>
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="h-4 w-4 mr-2" />
                Voir l'agenda complet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedecinDashboard;

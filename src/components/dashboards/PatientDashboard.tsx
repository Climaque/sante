
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
  Phone
} from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bienvenue, {user?.prenom} {user?.nom}</h1>
        <p className="text-gray-600 mt-2">Votre espace patient personnel</p>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>Téléconsultation</CardTitle>
            <CardDescription>Consulter un médecin en ligne</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/teleconsultation">
              <Button className="w-full">Démarrer</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Médecins proches</CardTitle>
            <CardDescription>Trouver des médecins près de vous</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/medecins-proches">
              <Button className="w-full" variant="outline">Rechercher</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle>Prendre RDV</CardTitle>
            <CardDescription>Planifier un rendez-vous</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/patient/nouveau-rdv">
              <Button className="w-full" variant="outline">Planifier</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Mes rendez-vous */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Mes rendez-vous</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun rendez-vous planifié</p>
            <Link to="/patient/nouveau-rdv" className="inline-block mt-4">
              <Button>Prendre un rendez-vous</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;

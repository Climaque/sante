
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
  AlertCircle
} from 'lucide-react';

const MedecinDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dr. {user?.prenom} {user?.nom}</h1>
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-gray-600">Spécialité: {user?.specialite}</p>
          <Badge className="bg-green-500">Vérifié</Badge>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">RDV du jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 depuis hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">À confirmer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Patients total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Téléconsultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Rendez-vous en attente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Mme. Aya Traoré</p>
                  <p className="text-sm text-gray-600">Aujourd'hui 14:30</p>
                </div>
                <Badge variant="outline" className="text-orange-600">En attente</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">M. Koffi Yao</p>
                  <p className="text-sm text-gray-600">Demain 10:00</p>
                </div>
                <Badge variant="outline" className="text-orange-600">En attente</Badge>
              </div>
            </div>
            <Link to="/rendezvous" className="block mt-4">
              <Button className="w-full" variant="outline">Voir tous les RDV</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Téléconsultations du jour</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Mlle. Fatou Camara</p>
                  <p className="text-sm text-gray-600">15:00 - Cardiologie</p>
                </div>
                <Button size="sm">
                  <Video className="h-4 w-4 mr-1" />
                  Rejoindre
                </Button>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Voir l'agenda complet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedecinDashboard;

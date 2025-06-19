
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
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
        <p className="text-gray-600 mt-2">Bienvenue, {user?.prenom} - Gestion de la plateforme Santé+</p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Médecins Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+3 nouveaux</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">RDV Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8% vs hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Téléconsultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions d'administration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>Ajouter un Médecin</CardTitle>
            <CardDescription>Enregistrer un nouveau médecin</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/medecins/new">
              <Button className="w-full">Ajouter</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Gérer les Utilisateurs</CardTitle>
            <CardDescription>Patients et médecins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link to="/patients" className="block">
                <Button variant="outline" className="w-full">Patients</Button>
              </Link>
              <Link to="/medecins" className="block">
                <Button variant="outline" className="w-full">Médecins</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle>Gestion RDV</CardTitle>
            <CardDescription>Supervision des rendez-vous</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/rendezvous">
              <Button className="w-full" variant="outline">Voir tous</Button>
            </Link>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Dr. Konan Adjoua</p>
                <p className="text-sm text-gray-600">Pédiatrie - Abidjan</p>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Valider
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, MapPin, Phone, Mail, Edit, Trash2, Plus } from 'lucide-react';
import { medecinsService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

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
}

const MedecinList = () => {
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMedecins();
  }, []);

  const fetchMedecins = async () => {
    try {
      const response = await medecinsService.getAll();
      setMedecins(response.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des médecins",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      try {
        await medecinsService.delete(id);
        setMedecins(medecins.filter(m => m.id !== id));
        toast({
          title: "Succès",
          description: "Médecin supprimé avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des médecins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Médecins</h1>
          <p className="text-gray-600 mt-2">Liste des médecins partenaires</p>
        </div>
        <Link to="/medecins/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Médecin
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medecins.map((medecin) => (
          <Card key={medecin.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Dr. {medecin.prenom} {medecin.nom}
                    </CardTitle>
                    <CardDescription>{medecin.specialite}</CardDescription>
                  </div>
                </div>
                <Badge variant={medecin.disponible ? "default" : "secondary"}>
                  {medecin.disponible ? "Disponible" : "Indisponible"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {medecin.telephone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {medecin.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {medecin.adresse}, {medecin.ville} {medecin.codePostal}
                </div>
              </div>
              <div className="flex space-x-2">
                <Link to={`/medecins/edit/${medecin.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(medecin.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {medecins.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucun médecin trouvé</h3>
          <p className="text-gray-500 mt-2">Commencez par ajouter votre premier médecin.</p>
          <Link to="/medecins/new">
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un médecin
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MedecinList;

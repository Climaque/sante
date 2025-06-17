
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Phone, Mail, Edit, Trash2, Plus, Calendar } from 'lucide-react';
import { patientsService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  codePostal: string;
  sexe: string;
  numeroSecuriteSociale: string;
  symptomes?: string[];
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]); // Initialisation explicite avec tableau vide
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await patientsService.getAll();
      // S'assurer que response.data est un tableau
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
      setPatients([]); // S'assurer qu'on a toujours un tableau
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des patients",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      try {
        await patientsService.delete(id);
        setPatients(patients.filter(p => p.id !== id));
        toast({
          title: "Succès",
          description: "Patient supprimé avec succès",
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

  const calculateAge = (dateNaissance: string) => {
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Patients</h1>
          <p className="text-gray-600 mt-2">Liste des patients enregistrés</p>
        </div>
        <Link to="/patients/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Patient
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(patients) && patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {patient.prenom} {patient.nom}
                    </CardTitle>
                    <CardDescription>
                      {calculateAge(patient.dateNaissance)} ans - {patient.sexe}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  Patient
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {patient.telephone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {patient.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {patient.ville} {patient.codePostal}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(patient.dateNaissance).toLocaleDateString()}
                </div>
              </div>
              
              {patient.symptomes && Array.isArray(patient.symptomes) && patient.symptomes.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Symptômes:</p>
                  <div className="flex flex-wrap gap-1">
                    {patient.symptomes.slice(0, 2).map((symptome, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {symptome}
                      </Badge>
                    ))}
                    {patient.symptomes.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{patient.symptomes.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Link to={`/patients/edit/${patient.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </Link>
                <Link to={`/patients/${patient.id}/symptomes`}>
                  <Button variant="secondary" size="sm">
                    Symptômes
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(patient.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!Array.isArray(patients) || patients.length === 0) && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucun patient trouvé</h3>
          <p className="text-gray-500 mt-2">Commencez par ajouter votre premier patient.</p>
          <Link to="/patients/new">
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un patient
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PatientList;

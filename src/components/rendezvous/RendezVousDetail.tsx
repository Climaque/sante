
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, User, UserCheck, Phone, Mail, MapPin, CheckCircle, XCircle, Edit } from 'lucide-react';
import { rendezvousService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface RendezVousDetail {
  id: number;
  patient: {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    adresse: string;
    ville: string;
    dateNaissance: string;
  };
  medecin: {
    id: number;
    nom: string;
    prenom: string;
    specialite: string;
    telephone: string;
    email: string;
  };
  dateRendezVous: string;
  heureRendezVous: string;
  motif: string;
  statut: 'EN_ATTENTE' | 'ACCEPTE' | 'REFUSE' | 'TERMINE';
  notes?: string;
  dateCreation: string;
}

const statutLabels = {
  'EN_ATTENTE': { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  'ACCEPTE': { label: 'Accepté', color: 'bg-green-100 text-green-800' },
  'REFUSE': { label: 'Refusé', color: 'bg-red-100 text-red-800' },
  'TERMINE': { label: 'Terminé', color: 'bg-blue-100 text-blue-800' }
};

const RendezVousDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [rendezvous, setRendezVous] = useState<RendezVousDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRendezVous(parseInt(id));
    }
  }, [id]);

  const fetchRendezVous = async (rdvId: number) => {
    try {
      const response = await rendezvousService.getById(rdvId);
      setRendezVous(response.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du rendez-vous",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAccepter = async () => {
    if (!rendezvous) return;
    
    try {
      await rendezvousService.accept(rendezvous.id);
      setRendezVous({ ...rendezvous, statut: 'ACCEPTE' });
      toast({
        title: "Succès",
        description: "Rendez-vous accepté",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'acceptation",
        variant: "destructive",
      });
    }
  };

  const handleRefuser = async () => {
    if (!rendezvous) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir refuser ce rendez-vous ?')) {
      try {
        await rendezvousService.reject(rendezvous.id);
        setRendezVous({ ...rendezvous, statut: 'REFUSE' });
        toast({
          title: "Succès",
          description: "Rendez-vous refusé",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors du refus",
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!rendezvous) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Rendez-vous introuvable</h1>
          <Button onClick={() => navigate('/rendezvous')} className="mt-4">
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/rendezvous')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Détail du rendez-vous #{rendezvous.id}
            </h1>
            <p className="text-gray-600 mt-2">
              Consultation du {new Date(rendezvous.dateRendezVous).toLocaleDateString()}
            </p>
          </div>
          <Badge className={`${statutLabels[rendezvous.statut].color} text-lg px-4 py-2`}>
            {statutLabels[rendezvous.statut].label}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Informations du rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <p className="text-lg">{new Date(rendezvous.dateRendezVous).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Heure:</span>
                    <p className="text-lg">{rendezvous.heureRendezVous}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Motif de consultation:</span>
                  <p className="mt-1 text-gray-800">{rendezvous.motif}</p>
                </div>
                {rendezvous.notes && (
                  <div>
                    <span className="font-medium text-gray-700">Notes:</span>
                    <p className="mt-1 text-gray-800">{rendezvous.notes}</p>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Date de création:</span>
                  <p className="text-sm text-gray-600">
                    {new Date(rendezvous.dateCreation).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations du patient
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Nom complet:</span>
                  <p className="text-lg">{rendezvous.patient.prenom} {rendezvous.patient.nom}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Âge:</span>
                  <p>{calculateAge(rendezvous.patient.dateNaissance)} ans</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{rendezvous.patient.telephone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{rendezvous.patient.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{rendezvous.patient.adresse}, {rendezvous.patient.ville}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Informations du médecin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Nom complet:</span>
                  <p className="text-lg">Dr. {rendezvous.medecin.prenom} {rendezvous.medecin.nom}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Spécialité:</span>
                  <p>{rendezvous.medecin.specialite}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{rendezvous.medecin.telephone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{rendezvous.medecin.email}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Gérer ce rendez-vous
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {rendezvous.statut === 'EN_ATTENTE' && (
                  <>
                    <Button 
                      onClick={handleAccepter}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accepter le RDV
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={handleRefuser}
                      className="w-full"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Refuser le RDV
                    </Button>
                    <Separator />
                  </>
                )}
                
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/patients/edit/${rendezvous.patient.id}`)}
                  className="w-full"
                >
                  <User className="h-4 w-4 mr-2" />
                  Voir le patient
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/medecins/edit/${rendezvous.medecin.id}`)}
                  className="w-full"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Voir le médecin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RendezVousDetail;

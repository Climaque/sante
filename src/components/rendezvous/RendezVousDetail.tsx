import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Video, 
  FileText, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Mail,
  Stethoscope
} from 'lucide-react';
import { rendezvousService, type RendezVous } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Type étendu pour les détails du rendez-vous
interface RendezVousDetail extends RendezVous {
  patient?: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
  };
  medecin?: {
    nom: string;
    prenom: string;
    specialite: string;
    email: string;
    telephone: string;
  };
  dateCreation?: string;
}

const RendezVousDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rendezVous, setRendezVous] = useState<RendezVousDetail | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRendezVous = async () => {
      if (!id) return;
      
      try {
        const response = await rendezvousService.getById(parseInt(id));
        // Conversion du type RendezVous vers RendezVousDetail
        const rdvDetail: RendezVousDetail = {
          ...response.data,
          patient: {
            nom: response.data.patientNom,
            prenom: response.data.patientPrenom,
            email: `${response.data.patientPrenom.toLowerCase()}@email.com`,
            telephone: '+225 01 23 45 67 89'
          },
          medecin: {
            nom: response.data.medecinNom,
            prenom: response.data.medecinPrenom,
            specialite: 'Médecine générale',
            email: `dr.${response.data.medecinNom.toLowerCase()}@hopital.ci`,
            telephone: '+225 07 89 01 23 45'
          },
          dateCreation: new Date().toISOString()
        };
        setRendezVous(rdvDetail);
        setNotes(rdvDetail.notes || '');
      } catch (error) {
        console.error('Erreur lors du chargement du rendez-vous:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du rendez-vous",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRendezVous();
  }, [id, toast]);

  const handleAccept = async () => {
    if (!id) return;
    try {
      await rendezvousService.accept(parseInt(id));
      toast({
        title: "Succès",
        description: "Le rendez-vous a été accepté",
      });
      // Mettre à jour l'état local
      if (rendezVous) {
        setRendezVous({
          ...rendezVous,
          statut: 'ACCEPTE'
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du rendez-vous:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'accepter le rendez-vous",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    if (!id) return;
    try {
      await rendezvousService.reject(parseInt(id));
      toast({
        title: "Succès",
        description: "Le rendez-vous a été refusé",
      });
      // Mettre à jour l'état local
      if (rendezVous) {
        setRendezVous({
          ...rendezVous,
          statut: 'REFUSE'
        });
      }
    } catch (error) {
      console.error('Erreur lors du refus du rendez-vous:', error);
      toast({
        title: "Erreur",
        description: "Impossible de refuser le rendez-vous",
        variant: "destructive",
      });
    }
  };

  const handleStartVideo = async () => {
    if (!id) return;
    try {
      const response = await rendezvousService.startVideo(parseInt(id));
      const lienVideo = response.data.lienVideo;
      
      // Ouvrir le lien dans un nouvel onglet
      window.open(lienVideo, '_blank');
      
      toast({
        title: "Téléconsultation",
        description: "La session vidéo a été démarrée",
      });
    } catch (error) {
      console.error('Erreur lors du démarrage de la vidéo:', error);
      toast({
        title: "Erreur",
        description: "Impossible de démarrer la téléconsultation",
        variant: "destructive",
      });
    }
  };

  const handleSaveNotes = async () => {
    if (!id) return;
    try {
      await rendezvousService.update(parseInt(id), { notes });
      toast({
        title: "Succès",
        description: "Les notes ont été enregistrées",
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des notes:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les notes",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <p>Chargement des détails du rendez-vous...</p>
        </div>
      </div>
    );
  }

  if (!rendezVous) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Rendez-vous non trouvé</h2>
          <p>Le rendez-vous demandé n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'EN_ATTENTE':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'ACCEPTE':
        return <Badge className="bg-green-500">Accepté</Badge>;
      case 'REFUSE':
        return <Badge className="bg-red-500">Refusé</Badge>;
      case 'TERMINE':
        return <Badge className="bg-blue-500">Terminé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Détails du Rendez-vous</h1>
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">Rendez-vous #{rendezVous.id}</p>
          {getStatusBadge(rendezVous.statut)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Informations principales */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informations du Rendez-vous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">{rendezVous.dateRendezVous}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Heure</p>
                  <p className="text-gray-600">{rendezVous.heureRendezVous}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Motif</p>
                <p className="text-gray-600">{rendezVous.motif}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Video className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Type de consultation</p>
                <p className="text-gray-600">
                  {rendezVous.type === 'teleconsultation' ? 'Téléconsultation' : 'Consultation physique'}
                </p>
              </div>
            </div>

            {rendezVous.statut === 'ACCEPTE' && rendezVous.type === 'teleconsultation' && (
              <Button onClick={handleStartVideo} className="w-full md:w-auto">
                <Video className="mr-2 h-4 w-4" />
                Démarrer la téléconsultation
              </Button>
            )}

            {rendezVous.statut === 'EN_ATTENTE' && (
              <div className="flex space-x-2">
                <Button onClick={handleAccept} className="flex-1 bg-green-600 hover:bg-green-700">
                  Accepter
                </Button>
                <Button onClick={handleReject} variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
                  Refuser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informations du patient */}
        <Card>
          <CardHeader>
            <CardTitle>Patient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Nom complet</p>
                <p className="text-gray-600">{rendezVous.patient?.prenom} {rendezVous.patient?.nom}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Téléphone</p>
                <p className="text-gray-600">{rendezVous.patient?.telephone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">{rendezVous.patient?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations du médecin */}
        <Card>
          <CardHeader>
            <CardTitle>Médecin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Nom complet</p>
                <p className="text-gray-600">Dr. {rendezVous.medecin?.prenom} {rendezVous.medecin?.nom}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Stethoscope className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Spécialité</p>
                <p className="text-gray-600">{rendezVous.medecin?.specialite}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-gray-600">{rendezVous.medecin?.telephone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Ajouter des notes concernant ce rendez-vous..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="mb-4"
            />
            <Button onClick={handleSaveNotes}>
              Enregistrer les notes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RendezVousDetail;

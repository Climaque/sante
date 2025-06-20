
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { rendezvousService, type RendezVous } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin,
  Plus,
  RefreshCw
} from 'lucide-react';

const RendezVousList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rendezvous, setRendezVous] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRendezVous();
  }, []);

  const fetchRendezVous = async () => {
    try {
      const response = await rendezvousService.getAll();
      // Filtrer les rendez-vous selon le rôle de l'utilisateur
      const filteredRdv = response.data.filter(rdv => {
        if (user?.role === 'patient') {
          return rdv.patientId === user.id;
        } else if (user?.role === 'medecin') {
          return rdv.medecinId === user.id;
        }
        return true; // Admin voit tous les rendez-vous
      });
      setRendezVous(filteredRdv);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les rendez-vous",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'EN_ATTENTE':
        return <Badge variant="secondary">En attente</Badge>;
      case 'ACCEPTE':
        return <Badge className="bg-green-500">Accepté</Badge>;
      case 'REFUSE':
        return <Badge variant="destructive">Refusé</Badge>;
      case 'TERMINE':
        return <Badge variant="outline">Terminé</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos consultations médicales
          </p>
        </div>
        
        {user?.role === 'patient' && (
          <Link to="/patient/nouveau-rdv">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouveau rendez-vous</span>
            </Button>
          </Link>
        )}
      </div>

      {rendezvous.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun rendez-vous</h3>
            <p className="text-gray-600 mb-6">
              {user?.role === 'patient' 
                ? "Vous n'avez pas encore de rendez-vous planifié."
                : "Aucun rendez-vous n'a été planifié avec vous."
              }
            </p>
            {user?.role === 'patient' && (
              <Link to="/patient/nouveau-rdv">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Planifier un rendez-vous
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {rendezvous.map((rdv) => (
            <Card key={rdv.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      {user?.role === 'patient' ? (
                        <span>Dr. {rdv.medecinPrenom} {rdv.medecinNom}</span>
                      ) : (
                        <span>{rdv.patientPrenom} {rdv.patientNom}</span>
                      )}
                      {rdv.type === 'teleconsultation' ? (
                        <Video className="h-4 w-4 text-blue-600" />
                      ) : (
                        <MapPin className="h-4 w-4 text-green-600" />
                      )}
                    </CardTitle>
                    <CardDescription>
                      {rdv.type === 'teleconsultation' ? 'Téléconsultation' : 'Consultation physique'}
                    </CardDescription>
                  </div>
                  {getStatutBadge(rdv.statut)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(rdv.dateRendezVous)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{rdv.heureRendezVous}</span>
                  </div>

                  <div className="text-sm">
                    <strong>Motif :</strong> {rdv.motif}
                  </div>

                  {rdv.notes && (
                    <div className="text-sm text-gray-600">
                      <strong>Notes :</strong> {rdv.notes}
                    </div>
                  )}

                  <div className="flex space-x-2 pt-3">
                    <Link to={`/rendezvous/${rdv.id}`}>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </Link>
                    
                    {rdv.statut === 'ACCEPTE' && rdv.type === 'teleconsultation' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Video className="h-4 w-4 mr-2" />
                        Rejoindre
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RendezVousList;

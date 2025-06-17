
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, UserCheck, Plus, Eye, CheckCircle, XCircle } from 'lucide-react';
import { rendezvousService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface RendezVous {
  id: number;
  patientNom: string;
  patientPrenom: string;
  medecinNom: string;
  medecinPrenom: string;
  dateRendezVous: string;
  heureRendezVous: string;
  motif: string;
  statut: 'EN_ATTENTE' | 'ACCEPTE' | 'REFUSE' | 'TERMINE';
  notes?: string;
}

const statutLabels = {
  'EN_ATTENTE': { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  'ACCEPTE': { label: 'Accepté', color: 'bg-green-100 text-green-800' },
  'REFUSE': { label: 'Refusé', color: 'bg-red-100 text-red-800' },
  'TERMINE': { label: 'Terminé', color: 'bg-blue-100 text-blue-800' }
};

const RendezVousList = () => {
  const [rendezvous, setRendezVous] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('TOUS');
  const { toast } = useToast();

  useEffect(() => {
    fetchRendezVous();
  }, []);

  const fetchRendezVous = async () => {
    try {
      const response = await rendezvousService.getAll();
      setRendezVous(response.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des rendez-vous",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAccepter = async (id: number) => {
    try {
      await rendezvousService.accept(id);
      setRendezVous(rendezvous.map(rdv => 
        rdv.id === id ? { ...rdv, statut: 'ACCEPTE' } : rdv
      ));
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

  const handleRefuser = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir refuser ce rendez-vous ?')) {
      try {
        await rendezvousService.reject(id);
        setRendezVous(rendezvous.map(rdv => 
          rdv.id === id ? { ...rdv, statut: 'REFUSE' } : rdv
        ));
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

  const filteredRendezVous = filter === 'TOUS' 
    ? rendezvous 
    : rendezvous.filter(rdv => rdv.statut === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des rendez-vous...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Rendez-vous</h1>
          <p className="text-gray-600 mt-2">Liste des consultations</p>
        </div>
        <Link to="/rendezvous/new">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </Link>
      </div>

      {/* Filtres */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {['TOUS', 'EN_ATTENTE', 'ACCEPTE', 'REFUSE', 'TERMINE'].map((statut) => (
              <Button
                key={statut}
                variant={filter === statut ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(statut)}
              >
                {statut === 'TOUS' ? 'Tous' : statutLabels[statut as keyof typeof statutLabels]?.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste des rendez-vous */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRendezVous.map((rdv) => (
          <Card key={rdv.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      RDV #{rdv.id}
                    </CardTitle>
                    <CardDescription>
                      {new Date(rdv.dateRendezVous).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={statutLabels[rdv.statut].color}>
                  {statutLabels[rdv.statut].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium">Patient:</span>
                  <span className="ml-2">{rdv.patientPrenom} {rdv.patientNom}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span className="font-medium">Médecin:</span>
                  <span className="ml-2">Dr. {rdv.medecinPrenom} {rdv.medecinNom}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-medium">Heure:</span>
                  <span className="ml-2">{rdv.heureRendezVous}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Motif:</span>
                  <p className="mt-1 text-gray-800">{rdv.motif}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Link to={`/rendezvous/${rdv.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir détails
                  </Button>
                </Link>
                
                {rdv.statut === 'EN_ATTENTE' && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleAccepter(rdv.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accepter
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleRefuser(rdv.id)}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Refuser
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRendezVous.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            {filter === 'TOUS' ? 'Aucun rendez-vous trouvé' : `Aucun rendez-vous ${statutLabels[filter as keyof typeof statutLabels]?.label.toLowerCase()}`}
          </h3>
          <p className="text-gray-500 mt-2">
            {filter === 'TOUS' ? 'Commencez par planifier votre premier rendez-vous.' : 'Changez le filtre pour voir d\'autres rendez-vous.'}
          </p>
          {filter === 'TOUS' && (
            <Link to="/rendezvous/new">
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Planifier un rendez-vous
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default RendezVousList;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Star, Clock, Phone, Video, Navigation, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import MapComponent from '@/components/common/MapComponent';

interface MedecinProche {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  distance: number;
  notation: number;
  nbAvis: number;
  adresse: string;
  ville: string;
  telephone: string;
  tarif: number;
  disponible: boolean;
  prochainCreneau: string;
  latitude: number;
  longitude: number;
}

const MedecinsProches = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [medecins, setMedecins] = useState<MedecinProche[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [adresseRecherche, setAdresseRecherche] = useState('');

  // Données de simulation
  const medecinsSimules: MedecinProche[] = [
    {
      id: 1,
      nom: "Martin",
      prenom: "Dr. Sophie",
      specialite: "Médecine générale",
      distance: 0.8,
      notation: 4.8,
      nbAvis: 127,
      adresse: "15 Rue de la Paix",
      ville: "Paris 1er",
      telephone: "01 42 36 12 34",
      tarif: 25,
      disponible: true,
      prochainCreneau: "Aujourd'hui 14h30",
      latitude: 48.8566,
      longitude: 2.3522
    },
    {
      id: 2,
      nom: "Dubois",
      prenom: "Dr. Pierre",
      specialite: "Cardiologie",
      distance: 1.2,
      notation: 4.9,
      nbAvis: 89,
      adresse: "22 Boulevard Saint-Germain",
      ville: "Paris 6e",
      telephone: "01 43 25 67 89",
      tarif: 50,
      disponible: true,
      prochainCreneau: "Demain 9h00",
      latitude: 48.8534,
      longitude: 2.3488
    },
    {
      id: 3,
      nom: "Rousseau",
      prenom: "Dr. Marie",
      specialite: "Dermatologie",
      distance: 2.1,
      notation: 4.7,
      nbAvis: 156,
      adresse: "8 Avenue des Champs-Élysées",
      ville: "Paris 8e",
      telephone: "01 42 89 34 56",
      tarif: 60,
      disponible: false,
      prochainCreneau: "Lundi 10h15",
      latitude: 48.8698,
      longitude: 2.3076
    }
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          fetchMedecinsProches(location.lat, location.lng, searchRadius);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          // Utiliser Paris par défaut
          const defaultLocation = { lat: 48.8566, lng: 2.3522 };
          setUserLocation(defaultLocation);
          fetchMedecinsProches(defaultLocation.lat, defaultLocation.lng, searchRadius);
          toast({
            title: "Géolocalisation",
            description: "Position par défaut utilisée (Paris centre)",
            variant: "default",
          });
        }
      );
    } else {
      // Utiliser Paris par défaut
      const defaultLocation = { lat: 48.8566, lng: 2.3522 };
      setUserLocation(defaultLocation);
      fetchMedecinsProches(defaultLocation.lat, defaultLocation.lng, searchRadius);
    }
    setLoading(false);
  };

  const fetchMedecinsProches = async (lat: number, lng: number, radius: number) => {
    try {
      // Simulation API - remplacer par vraie API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMedecins(medecinsSimules.filter(m => m.distance <= radius));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les médecins proches",
        variant: "destructive",
      });
    }
  };

  const handleReserverConsultation = (medecin: MedecinProche, type: 'physique' | 'teleconsultation') => {
    toast({
      title: "Réservation",
      description: `Rendez-vous ${type} avec ${medecin.prenom} ${medecin.nom} demandé`,
    });
    // Rediriger vers le formulaire de RDV
    navigate('/rendezvous/new', { 
      state: { medecin, type } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Médecins proches de vous</h1>
              <p className="text-gray-600 mt-2">Trouvez et consultez les médecins dans votre région</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Filtres de recherche</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="adresse">Adresse de recherche</Label>
                    <Input
                      id="adresse"
                      value={adresseRecherche}
                      onChange={(e) => setAdresseRecherche(e.target.value)}
                      placeholder="Votre adresse..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="rayon">Rayon de recherche (km)</Label>
                    <Input
                      id="rayon"
                      type="number"
                      value={searchRadius}
                      onChange={(e) => setSearchRadius(Number(e.target.value))}
                      min="1"
                      max="50"
                    />
                  </div>
                  <Button 
                    onClick={getCurrentLocation} 
                    className="w-full"
                    disabled={loading}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    {loading ? 'Recherche...' : 'Localiser autour de moi'}
                  </Button>
                </CardContent>
              </Card>

              {userLocation && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Carte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MapComponent
                      latitude={userLocation.lat}
                      longitude={userLocation.lng}
                      address="Votre position"
                      height="200px"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Recherche des médecins proches...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      {medecins.length} médecin(s) trouvé(s)
                    </h2>
                  </div>

                  {medecins.map((medecin) => (
                    <Card key={medecin.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {medecin.prenom} {medecin.nom}
                                </h3>
                                <p className="text-blue-600 font-medium">{medecin.specialite}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {medecin.distance} km
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                    {medecin.notation} ({medecin.nbAvis} avis)
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <Badge variant={medecin.disponible ? "default" : "secondary"}>
                                  {medecin.disponible ? "Disponible" : "Occupé"}
                                </Badge>
                                <p className="text-lg font-bold text-gray-900 mt-2">{medecin.tarif}€</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 inline mr-1" />
                                  {medecin.adresse}, {medecin.ville}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  <Phone className="h-4 w-4 inline mr-1" />
                                  {medecin.telephone}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  <Clock className="h-4 w-4 inline mr-1" />
                                  Prochain créneau: {medecin.prochainCreneau}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:ml-6">
                            <Button 
                              onClick={() => handleReserverConsultation(medecin, 'teleconsultation')}
                              className="bg-blue-600 hover:bg-blue-700"
                              disabled={!medecin.disponible}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Téléconsultation
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleReserverConsultation(medecin, 'physique')}
                            >
                              <MapPin className="h-4 w-4 mr-2" />
                              Consultation physique
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {medecins.length === 0 && (
                    <div className="text-center py-12">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">Aucun médecin trouvé</h3>
                      <p className="text-gray-500 mt-2">
                        Essayez d'augmenter le rayon de recherche ou changer d'adresse.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedecinsProches;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { medecinsService, type Medecin } from '@/services/api';
import { 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  Video, 
  Calendar,
  Search,
  Navigation
} from 'lucide-react';

const MedecinsProches = () => {
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Charger tous les médecins validés au démarrage
    const fetchMedecins = async () => {
      setLoading(true);
      try {
        const response = await medecinsService.getAll();
        // Filtrer seulement les médecins validés et disponibles
        const medecinsDisponibles = response.data.filter(m => m.validated && m.disponible);
        setMedecins(medecinsDisponibles);
      } catch (error) {
        console.error('Erreur lors du chargement des médecins:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des médecins",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedecins();
  }, [toast]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          searchNearbyDoctors(latitude, longitude);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          toast({
            title: "Géolocalisation",
            description: "Impossible d'obtenir votre position. Affichage de tous les médecins disponibles.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
        variant: "destructive",
      });
    }
  };

  const searchNearbyDoctors = async (lat: number, lng: number, radius: number = 10) => {
    setLoading(true);
    try {
      const response = await medecinsService.getProches(lat, lng, radius);
      setMedecins(response.data.filter(m => m.validated && m.disponible));
      toast({
        title: "Médecins trouvés",
        description: `${response.data.length} médecins trouvés dans un rayon de ${radius}km`,
      });
    } catch (error) {
      console.error('Erreur lors de la recherche de médecins proches:', error);
      toast({
        title: "Erreur",
        description: "Impossible de trouver des médecins près de vous",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMedecins = medecins.filter(medecin =>
    medecin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medecin.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medecin.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medecin.ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTarif = (tarif?: number) => {
    if (!tarif) return 'Tarif non spécifié';
    return `${tarif.toLocaleString()} FCFA`;
  };

  const calculateDistance = (medecin: Medecin) => {
    if (!userLocation || !medecin.latitude || !medecin.longitude) return null;
    
    const R = 6371; // Rayon de la Terre en km
    const dLat = (medecin.latitude - userLocation.lat) * Math.PI / 180;
    const dLon = (medecin.longitude - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(medecin.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Arrondi à 1 décimale
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Médecins Proches</h1>
        <p className="text-gray-600 mb-6">
          Trouvez des médecins qualifiés près de chez vous en Côte d'Ivoire
        </p>
        
        {/* Barre de recherche et géolocalisation */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, spécialité ou ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={getUserLocation} variant="outline" disabled={loading}>
            <Navigation className="h-4 w-4 mr-2" />
            Utiliser ma position
          </Button>
        </div>
      </div>

      {/* Liste des médecins */}
      {loading ? (
        <div className="text-center py-8">
          <p>Recherche des médecins...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedecins.map((medecin) => {
            const distance = calculateDistance(medecin);
            return (
              <Card key={medecin.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Dr. {medecin.prenom} {medecin.nom}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant="secondary" className="mr-2">
                          {medecin.specialite}
                        </Badge>
                        {medecin.disponible && (
                          <Badge className="bg-green-500">Disponible</Badge>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{medecin.ville}</span>
                    {distance && (
                      <span className="ml-2 text-blue-600 font-medium">
                        ({distance} km)
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{medecin.telephone}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Disponible maintenant</span>
                  </div>

                  <div className="text-sm font-medium text-green-600">
                    {formatTarif(medecin.tarif)}
                  </div>

                  <div className="space-y-2 pt-3">
                    <Button className="w-full" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Téléconsultation
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Prendre RDV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {filteredMedecins.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Aucun médecin trouvé avec vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
};

export default MedecinsProches;

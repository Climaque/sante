
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import { patientsService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import MapComponent from '@/components/common/MapComponent';

interface PatientFormData {
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
  latitude?: number;
  longitude?: number;
}

const PatientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<PatientFormData>({
    nom: '',
    prenom: '',
    dateNaissance: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    codePostal: '',
    sexe: '',
    numeroSecuriteSociale: ''
  });

  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchPatient(parseInt(id));
    }
  }, [id, isEditing]);

  const fetchPatient = async (patientId: number) => {
    try {
      const response = await patientsService.getById(patientId);
      setFormData(response.data);
      if (response.data.latitude && response.data.longitude) {
        setShowMap(true);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du patient",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await patientsService.update(parseInt(id), formData);
        toast({
          title: "Succès",
          description: "Patient modifié avec succès",
        });
      } else {
        await patientsService.create(formData);
        toast({
          title: "Succès",
          description: "Patient ajouté avec succès",
        });
      }
      navigate('/patients');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PatientFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGeolocation = async () => {
    const fullAddress = `${formData.adresse}, ${formData.ville} ${formData.codePostal}`;
    
    // Simulation de géolocalisation (remplace par ton service réel)
    try {
      // Ici tu peux intégrer un service de géocodage comme Google Geocoding API
      // Pour l'exemple, on utilise des coordonnées simulées
      const simulatedLat = 48.8566 + (Math.random() - 0.5) * 0.1;
      const simulatedLng = 2.3522 + (Math.random() - 0.5) * 0.1;
      
      setFormData(prev => ({
        ...prev,
        latitude: simulatedLat,
        longitude: simulatedLng
      }));
      setShowMap(true);
      
      toast({
        title: "Succès",
        description: "Localisation trouvée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de localiser l'adresse",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/patients')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Modifier le patient' : 'Nouveau patient'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isEditing ? 'Modifiez les informations du patient' : 'Ajoutez un nouveau patient au système'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations du patient</CardTitle>
                <CardDescription>
                  Remplissez tous les champs obligatoires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={formData.prenom}
                        onChange={(e) => handleInputChange('prenom', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => handleInputChange('nom', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateNaissance">Date de naissance *</Label>
                      <Input
                        id="dateNaissance"
                        type="date"
                        value={formData.dateNaissance}
                        onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sexe">Sexe *</Label>
                      <Select 
                        value={formData.sexe} 
                        onValueChange={(value) => handleInputChange('sexe', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le sexe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Homme">Homme</SelectItem>
                          <SelectItem value="Femme">Femme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        value={formData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="numeroSecuriteSociale">Numéro de Sécurité Sociale *</Label>
                    <Input
                      id="numeroSecuriteSociale"
                      value={formData.numeroSecuriteSociale}
                      onChange={(e) => handleInputChange('numeroSecuriteSociale', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="adresse">Adresse *</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="adresse"
                        value={formData.adresse}
                        onChange={(e) => handleInputChange('adresse', e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={handleGeolocation}
                        variant="outline"
                        disabled={!formData.adresse || !formData.ville}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Localiser
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ville">Ville *</Label>
                      <Input
                        id="ville"
                        value={formData.ville}
                        onChange={(e) => handleInputChange('ville', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="codePostal">Code postal *</Label>
                      <Input
                        id="codePostal"
                        value={formData.codePostal}
                        onChange={(e) => handleInputChange('codePostal', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/patients')}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {showMap && formData.latitude && formData.longitude && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                  <CardDescription>
                    Position géographique du patient
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MapComponent
                    latitude={formData.latitude}
                    longitude={formData.longitude}
                    address={`${formData.adresse}, ${formData.ville}`}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientForm;

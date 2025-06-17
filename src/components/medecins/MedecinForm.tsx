
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { medecinsService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface MedecinFormData {
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

const specialites = [
  'Médecine générale',
  'Cardiologie',
  'Dermatologie',
  'Endocrinologie',
  'Gastroentérologie',
  'Gynécologie',
  'Neurologie',
  'Ophtalmologie',
  'Orthopédie',
  'Pédiatrie',
  'Psychiatrie',
  'Radiologie',
  'Urologie'
];

const MedecinForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<MedecinFormData>({
    nom: '',
    prenom: '',
    specialite: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    codePostal: '',
    disponible: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchMedecin(parseInt(id));
    }
  }, [id, isEditing]);

  const fetchMedecin = async (medecinId: number) => {
    try {
      const response = await medecinsService.getById(medecinId);
      setFormData(response.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du médecin",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await medecinsService.update(parseInt(id), formData);
        toast({
          title: "Succès",
          description: "Médecin modifié avec succès",
        });
      } else {
        await medecinsService.create(formData);
        toast({
          title: "Succès",
          description: "Médecin ajouté avec succès",
        });
      }
      navigate('/medecins');
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

  const handleInputChange = (field: keyof MedecinFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/medecins')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Modifier le médecin' : 'Nouveau médecin'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isEditing ? 'Modifiez les informations du médecin' : 'Ajoutez un nouveau médecin au système'}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations du médecin</CardTitle>
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

              <div>
                <Label htmlFor="specialite">Spécialité *</Label>
                <Select 
                  value={formData.specialite} 
                  onValueChange={(value) => handleInputChange('specialite', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialites.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="adresse">Adresse *</Label>
                <Input
                  id="adresse"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  required
                />
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

              <div>
                <Label htmlFor="disponible">Statut</Label>
                <Select 
                  value={formData.disponible.toString()} 
                  onValueChange={(value) => handleInputChange('disponible', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Disponible</SelectItem>
                    <SelectItem value="false">Indisponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/medecins')}
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
    </div>
  );
};

export default MedecinForm;

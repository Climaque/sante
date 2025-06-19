
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Video, Plus, X, ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const symptomesCommuns = [
  'Fièvre', 'Toux', 'Mal de tête', 'Fatigue', 'Nausées', 'Douleurs abdominales',
  'Douleurs musculaires', 'Essoufflement', 'Perte d\'appétit', 'Insomnie',
  'Vertiges', 'Éruption cutanée', 'Mal de gorge', 'Congestion nasale'
];

const TeleconsultationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    sexe: '',
    telephone: '',
    email: '',
    motifConsultation: '',
    urgence: 'normale'
  });
  
  const [symptomes, setSymptomes] = useState<string[]>([]);
  const [nouveauSymptome, setNouveauSymptome] = useState('');
  const [loading, setLoading] = useState(false);

  const ajouterSymptome = (symptome: string) => {
    if (symptome.trim() && !symptomes.includes(symptome.trim())) {
      setSymptomes([...symptomes, symptome.trim()]);
      setNouveauSymptome('');
    }
  };

  const supprimerSymptome = (symptome: string) => {
    setSymptomes(symptomes.filter(s => s !== symptome));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulation de la création d'une consultation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Demande envoyée",
        description: "Un médecin va vous contacter dans les plus brefs délais",
      });
      
      // Redirection vers la salle d'attente
      navigate('/teleconsultation/attente');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la demande",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-gray-900">Nouvelle Téléconsultation</h1>
              <p className="text-gray-600 mt-2">Remplissez le formulaire pour être mis en relation avec un médecin</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="h-5 w-5" />
                    <span>Informations du patient</span>
                  </CardTitle>
                  <CardDescription>
                    Vos informations personnelles et médicales
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="age">Âge *</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
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
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Homme">Homme</SelectItem>
                            <SelectItem value="Femme">Femme</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgence">Urgence</Label>
                        <Select 
                          value={formData.urgence} 
                          onValueChange={(value) => handleInputChange('urgence', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normale">Normale</SelectItem>
                            <SelectItem value="urgente">Urgente</SelectItem>
                            <SelectItem value="critique">Critique</SelectItem>
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
                      <Label htmlFor="motifConsultation">Motif de consultation *</Label>
                      <Textarea
                        id="motifConsultation"
                        value={formData.motifConsultation}
                        onChange={(e) => handleInputChange('motifConsultation', e.target.value)}
                        placeholder="Décrivez brièvement le motif de votre consultation..."
                        required
                      />
                    </div>

                    <div>
                      <Label>Ajouter des symptômes</Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          value={nouveauSymptome}
                          onChange={(e) => setNouveauSymptome(e.target.value)}
                          placeholder="Tapez un symptôme..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              ajouterSymptome(nouveauSymptome);
                            }
                          }}
                        />
                        <Button 
                          type="button"
                          onClick={() => ajouterSymptome(nouveauSymptome)}
                          disabled={!nouveauSymptome.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Symptômes communs</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {symptomesCommuns.map((symptome) => (
                          <Button
                            key={symptome}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => ajouterSymptome(symptome)}
                            disabled={symptomes.includes(symptome)}
                            className="justify-start text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {symptome}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/')}
                      >
                        Annuler
                      </Button>
                      <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4 mr-2" />
                        {loading ? 'Envoi en cours...' : 'Demander une consultation'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Symptômes sélectionnés</CardTitle>
                  <CardDescription>
                    {symptomes.length} symptôme(s) ajouté(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {symptomes.length > 0 ? (
                    <div className="space-y-2">
                      {symptomes.map((symptome, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium">{symptome}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => supprimerSymptome(symptome)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Aucun symptôme sélectionné
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Informations importantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Délai d'attente :</strong> En moyenne 5-10 minutes
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Durée :</strong> Consultation de 15-30 minutes
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Tarif :</strong> 25€ - Remboursé par l'Assurance Maladie
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeleconsultationForm;

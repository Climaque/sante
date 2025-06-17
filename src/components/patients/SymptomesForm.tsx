
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X, Save } from 'lucide-react';
import { patientsService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  symptomes?: string[];
}

const symptomesCommuns = [
  'Fièvre',
  'Toux',
  'Mal de tête',
  'Fatigue',
  'Nausées',
  'Douleurs abdominales',
  'Douleurs musculaires',
  'Essoufflement',
  'Perte d\'appétit',
  'Insomnie',
  'Vertiges',
  'Éruption cutanée'
];

const SymptomesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [symptomes, setSymptomes] = useState<string[]>([]);
  const [nouveauSymptome, setNouveauSymptome] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPatient(parseInt(id));
    }
  }, [id]);

  const fetchPatient = async (patientId: number) => {
    try {
      const response = await patientsService.getById(patientId);
      setPatient(response.data);
      setSymptomes(response.data.symptomes || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du patient",
        variant: "destructive",
      });
    }
  };

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
    if (!patient) return;

    setLoading(true);
    try {
      await patientsService.update(patient.id, {
        ...patient,
        symptomes
      });
      toast({
        title: "Succès",
        description: "Symptômes mis à jour avec succès",
      });
      navigate('/patients');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!patient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
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
            onClick={() => navigate('/patients')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des symptômes
            </h1>
            <p className="text-gray-600 mt-2">
              Patient: {patient.prenom} {patient.nom}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter des symptômes</CardTitle>
              <CardDescription>
                Sélectionnez dans la liste ou ajoutez un nouveau symptôme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nouveauSymptome">Nouveau symptôme</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="nouveauSymptome"
                      value={nouveauSymptome}
                      onChange={(e) => setNouveauSymptome(e.target.value)}
                      placeholder="Entrez un symptôme..."
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
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {symptomesCommuns.map((symptome) => (
                      <Button
                        key={symptome}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => ajouterSymptome(symptome)}
                        disabled={symptomes.includes(symptome)}
                        className="justify-start"
                      >
                        <Plus className="h-3 w-3 mr-2" />
                        {symptome}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Symptômes actuels</CardTitle>
              <CardDescription>
                Liste des symptômes du patient ({symptomes.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {symptomes.length > 0 ? (
                    <div className="space-y-2">
                      {symptomes.map((symptome, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{symptome}</span>
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
                      Aucun symptôme enregistré
                    </div>
                  )}

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
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SymptomesForm;

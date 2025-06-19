
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth/AuthProvider';
import { medecinsService, rendezvousService, type Medecin } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Video, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NouveauRendezVous = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    medecinId: '',
    dateRendezVous: '',
    heureRendezVous: '',
    motif: '',
    type: 'teleconsultation' as 'teleconsultation' | 'physique'
  });

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const response = await medecinsService.getAll();
        // Filtrer seulement les médecins validés
        const medecinsValides = response.data.filter(m => m.validated);
        setMedecins(medecinsValides);
      } catch (error) {
        console.error('Erreur lors du chargement des médecins:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des médecins",
          variant: "destructive",
        });
      }
    };

    fetchMedecins();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const medecinSelectionne = medecins.find(m => m.id === parseInt(formData.medecinId));
      if (!medecinSelectionne) {
        throw new Error('Médecin non trouvé');
      }

      await rendezvousService.create({
        patientId: user.id,
        medecinId: parseInt(formData.medecinId),
        patientNom: user.nom,
        patientPrenom: user.prenom,
        medecinNom: medecinSelectionne.nom,
        medecinPrenom: medecinSelectionne.prenom,
        dateRendezVous: formData.dateRendezVous,
        heureRendezVous: formData.heureRendezVous,
        motif: formData.motif,
        statut: 'EN_ATTENTE',
        type: formData.type
      });

      toast({
        title: "Succès",
        description: "Votre demande de rendez-vous a été envoyée",
      });

      navigate('/patient/dashboard');
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le rendez-vous",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Prendre un Rendez-vous</h1>
        <p className="text-gray-600 mt-2">Planifiez votre consultation médicale</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nouveau Rendez-vous</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour demander un rendez-vous
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sélection du médecin */}
            <div className="space-y-2">
              <Label htmlFor="medecin">Médecin</Label>
              <Select value={formData.medecinId} onValueChange={(value) => setFormData({...formData, medecinId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un médecin" />
                </SelectTrigger>
                <SelectContent>
                  {medecins.map((medecin) => (
                    <SelectItem key={medecin.id} value={medecin.id.toString()}>
                      Dr. {medecin.prenom} {medecin.nom} - {medecin.specialite}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type de consultation */}
            <div className="space-y-2">
              <Label>Type de consultation</Label>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-colors ${formData.type === 'teleconsultation' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setFormData({...formData, type: 'teleconsultation'})}
                >
                  <CardContent className="p-4 text-center">
                    <Video className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-medium">Téléconsultation</p>
                    <p className="text-sm text-gray-600">En ligne</p>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-colors ${formData.type === 'physique' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setFormData({...formData, type: 'physique'})}
                >
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">Consultation physique</p>
                    <p className="text-sm text-gray-600">Au cabinet</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Date et heure */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  value={formData.dateRendezVous}
                  onChange={(e) => setFormData({...formData, dateRendezVous: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heure">Heure</Label>
                <Input
                  id="heure"
                  type="time"
                  value={formData.heureRendezVous}
                  onChange={(e) => setFormData({...formData, heureRendezVous: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Motif */}
            <div className="space-y-2">
              <Label htmlFor="motif">Motif de la consultation</Label>
              <Textarea
                id="motif"
                placeholder="Décrivez brièvement le motif de votre consultation..."
                value={formData.motif}
                onChange={(e) => setFormData({...formData, motif: e.target.value})}
                required
                rows={4}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Demander le rendez-vous'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/patient/dashboard')}
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NouveauRendezVous;

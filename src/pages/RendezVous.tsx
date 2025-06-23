
import React, { useState } from 'react';
import { Calendar, Plus, Search, CheckCircle, XCircle, Clock, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RendezVous = () => {
  const [rendezvous] = useState([
    {
      id: 1,
      patient: "Jean Martin",
      medecin: "Dr. Sophie Laurent",
      date: "2024-01-20",
      heure: "14:30",
      type: "Consultation",
      statut: "Confirmé",
      mode: "Présentiel"
    },
    {
      id: 2,
      patient: "Marie Dubois",
      medecin: "Dr. Marc Dubois",
      date: "2024-01-21",
      heure: "10:00",
      type: "Contrôle",
      statut: "En attente",
      mode: "Téléconsultation"
    },
    {
      id: 3,
      patient: "Pierre Bernard",
      medecin: "Dr. Anne Martin",
      date: "2024-01-22",
      heure: "16:00",
      type: "Première consultation",
      statut: "Confirmé",
      mode: "Téléconsultation"
    },
    {
      id: 4,
      patient: "Claire Moreau",
      medecin: "Dr. Sophie Laurent",
      date: "2024-01-23",
      heure: "09:15",
      type: "Suivi",
      statut: "Annulé",
      mode: "Présentiel"
    }
  ]);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Confirmé':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Annulé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Rendez-vous</h1>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau RDV
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher un rendez-vous..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
              />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des Rendez-vous</CardTitle>
            <CardDescription>
              Gérez les consultations et téléconsultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rendezvous.map((rdv) => (
                  <TableRow key={rdv.id}>
                    <TableCell className="font-medium">{rdv.patient}</TableCell>
                    <TableCell>{rdv.medecin}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{rdv.date}</div>
                        <div className="text-sm text-gray-500">{rdv.heure}</div>
                      </div>
                    </TableCell>
                    <TableCell>{rdv.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {rdv.mode === 'Téléconsultation' && (
                          <Video className="h-4 w-4 text-blue-600" />
                        )}
                        <span className={rdv.mode === 'Téléconsultation' ? 'text-blue-600' : 'text-gray-600'}>
                          {rdv.mode}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatutColor(rdv.statut)}`}>
                        {rdv.statut}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {rdv.statut === 'En attente' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        {rdv.statut === 'Confirmé' && rdv.mode === 'Téléconsultation' && (
                          <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Video className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RendezVous;

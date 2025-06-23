
import React, { useState } from 'react';
import { UserCheck, Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Medecins = () => {
  const [medecins] = useState([
    {
      id: 1,
      nom: "Dr. Sophie",
      prenom: "Laurent",
      specialite: "Cardiologie",
      telephone: "01 23 45 67 89",
      email: "s.laurent@hopital.fr",
      adresse: "12 rue de la Santé, Paris",
      statut: "Disponible",
      patients: 45
    },
    {
      id: 2,
      nom: "Dr. Marc",
      prenom: "Dubois",
      specialite: "Pédiatrie",
      telephone: "01 34 56 78 90",
      email: "m.dubois@hopital.fr",
      adresse: "8 avenue des Enfants, Lyon",
      statut: "Occupé",
      patients: 32
    },
    {
      id: 3,
      nom: "Dr. Anne",
      prenom: "Martin",
      specialite: "Dermatologie",
      telephone: "01 45 67 89 01",
      email: "a.martin@hopital.fr",
      adresse: "5 place de la République, Marseille",
      statut: "Disponible",
      patients: 28
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Médecins</h1>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Médecin
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
                placeholder="Rechercher un médecin..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
              />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des Médecins</CardTitle>
            <CardDescription>
              Gérez vos médecins partenaires et consultez leurs informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medecins.map((medecin) => (
                  <TableRow key={medecin.id}>
                    <TableCell className="font-medium">
                      {medecin.nom} {medecin.prenom}
                    </TableCell>
                    <TableCell>{medecin.specialite}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {medecin.telephone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {medecin.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start text-sm">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400 mt-0.5" />
                        {medecin.adresse}
                      </div>
                    </TableCell>
                    <TableCell>{medecin.patients}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        medecin.statut === 'Disponible' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {medecin.statut}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                        </Button>
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

export default Medecins;


import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Patients = () => {
  const [patients] = useState([
    {
      id: 1,
      nom: "Martin",
      prenom: "Jean",
      age: 45,
      telephone: "01 23 45 67 89",
      email: "jean.martin@email.com",
      dernierRdv: "2024-01-15",
      statut: "Actif"
    },
    {
      id: 2,
      nom: "Dubois",
      prenom: "Marie",
      age: 32,
      telephone: "01 34 56 78 90",
      email: "marie.dubois@email.com",
      dernierRdv: "2024-01-12",
      statut: "Actif"
    },
    {
      id: 3,
      nom: "Bernard",
      prenom: "Pierre",
      age: 58,
      telephone: "01 45 67 89 01",
      email: "pierre.bernard@email.com",
      dernierRdv: "2024-01-10",
      statut: "Inactif"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Patients</h1>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Patient
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
                placeholder="Rechercher un patient..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des Patients</CardTitle>
            <CardDescription>
              Gérez vos patients et consultez leurs informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Âge</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Dernier RDV</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.nom}</TableCell>
                    <TableCell>{patient.prenom}</TableCell>
                    <TableCell>{patient.age} ans</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {patient.telephone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {patient.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.dernierRdv}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.statut === 'Actif' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.statut}
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

export default Patients;

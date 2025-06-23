
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NavigationCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link to="/patients" className="group">
        <Card className="hover:shadow-xl transition-all duration-300 group-hover:border-blue-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Gestion des Patients</CardTitle>
                <CardDescription>
                  Liste, ajout, modification et suppression des patients
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Voir tous les patients</span>
              <TrendingUp className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/medecins" className="group">
        <Card className="hover:shadow-xl transition-all duration-300 group-hover:border-green-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Gestion des Médecins</CardTitle>
                <CardDescription>
                  Liste et coordonnées des médecins partenaires
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Gérer les médecins</span>
              <TrendingUp className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/rendezvous" className="group">
        <Card className="hover:shadow-xl transition-all duration-300 group-hover:border-purple-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Gestion des RDV</CardTitle>
                <CardDescription>
                  Consultations, acceptation et refus des demandes
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Gérer les rendez-vous</span>
              <TrendingUp className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default NavigationCards;

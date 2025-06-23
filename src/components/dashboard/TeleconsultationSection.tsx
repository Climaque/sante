
import React from 'react';
import { Smartphone, Monitor, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TeleconsultationSectionProps {
  stats: {
    teleconsultations: number;
  };
}

const TeleconsultationSection = ({ stats }: TeleconsultationSectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Téléconsultations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop" 
              alt="Téléconsultation"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Consultations Virtuelles</h4>
            <p className="text-sm text-gray-600 mb-3">Facilite l'accès aux soins à distance</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">{stats.teleconsultations}</span>
              <Smartphone className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop" 
              alt="Médecin en ligne"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Médecins Connectés</h4>
            <p className="text-sm text-gray-600 mb-3">Praticiens disponibles en ligne</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">12</span>
              <Monitor className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop" 
              alt="Patient en téléconsultation"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Satisfaction Patient</h4>
            <p className="text-sm text-gray-600 mb-3">Taux de satisfaction téléconsultation</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600">94%</span>
              <CheckCircle className="h-5 w-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeleconsultationSection;

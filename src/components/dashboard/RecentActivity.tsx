
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const RecentActivity = () => {
  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Activité Récente</span>
          </CardTitle>
          <CardDescription>Dernières actions sur la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Téléconsultation terminée: Dr. Laurent - Marie Dubois</span>
              <span className="text-gray-400">il y a 5 min</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">RDV confirmé avec Dr. Martin</span>
              <span className="text-gray-400">il y a 15 min</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Nouveau médecin: Dr. Sophie Laurent</span>
              <span className="text-gray-400">il y a 1h</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-gray-600">Téléconsultation planifiée pour 16h30</span>
              <span className="text-gray-400">il y a 2h</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;

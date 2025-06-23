
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Santé+ Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/medecins/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Médecin
              </Button>
            </Link>
            <span className="text-sm text-gray-500">Dernière mise à jour: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

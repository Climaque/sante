
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import TeleconsultationSection from '@/components/dashboard/TeleconsultationSection';
import NavigationCards from '@/components/dashboard/NavigationCards';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Index = () => {
  const [stats, setStats] = useState({
    patients: 0,
    medecins: 0,
    rendezvous: 0,
    rendezvousEnAttente: 0,
    teleconsultations: 0,
    teleconsultationsAujourdhui: 0
  });

  // Simulation des données - remplace par tes appels API
  useEffect(() => {
    const fetchStats = async () => {
      // Données simulées pour l'instant
      setStats({
        patients: 156,
        medecins: 23,
        rendezvous: 89,
        rendezvousEnAttente: 12,
        teleconsultations: 34,
        teleconsultationsAujourdhui: 8
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h2>
          <p className="text-gray-600">Vue d'ensemble de votre système de gestion médicale</p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Téléconsultation Section avec Images */}
        <TeleconsultationSection stats={stats} />

        {/* Navigation Cards */}
        <NavigationCards />

        {/* Recent Activity Section */}
        <RecentActivity />
      </main>
    </div>
  );
};

export default Index;

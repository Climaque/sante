import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  Video,
  Monitor,
  Smartphone,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  const statCards = [
    {
      title: "Total Patients",
      value: stats.patients,
      description: "Patients enregistrés",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/patients"
    },
    {
      title: "Médecins Actifs",
      value: stats.medecins,
      description: "Médecins disponibles",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/medecins"
    },
    {
      title: "Rendez-vous",
      value: stats.rendezvous,
      description: "Consultations totales",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/rendezvous"
    },
    {
      title: "En Attente",
      value: stats.rendezvousEnAttente,
      description: "À confirmer",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "/rendezvous"
    },
    {
      title: "Téléconsultations",
      value: stats.teleconsultations,
      description: "Ce mois-ci",
      icon: Video,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      link: "/rendezvous"
    },
    {
      title: "Télé Aujourd'hui",
      value: stats.teleconsultationsAujourdhui,
      description: "En cours/planifiées",
      icon: Monitor,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      link: "/rendezvous"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h2>
          <p className="text-gray-600">Vue d'ensemble de votre système de gestion médicale</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Link key={index} to={card.link} className="transform hover:scale-105 transition-transform duration-200">
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {card.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${card.bgColor}`}>
                      <IconComponent className={`h-4 w-4 ${card.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {card.value}
                    </div>
                    <p className="text-xs text-gray-500">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Téléconsultation Section avec Images */}
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

        {/* Navigation Cards */}
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

        {/* Recent Activity Section */}
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
      </main>
    </div>
  );
};

export default Index;

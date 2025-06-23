
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Clock,
  Video,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  stats: {
    patients: number;
    medecins: number;
    rendezvous: number;
    rendezvousEnAttente: number;
    teleconsultations: number;
    teleconsultationsAujourdhui: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
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
  );
};

export default StatsCards;

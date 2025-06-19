
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  Stethoscope, 
  Calendar,
  Phone,
  FileText,
  Star
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Santé+</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/patients" className="text-gray-600 hover:text-blue-600">Patients</Link>
              <Link to="/medecins" className="text-gray-600 hover:text-blue-600">Médecins</Link>
              <Link to="/rendezvous" className="text-gray-600 hover:text-blue-600">Rendez-vous</Link>
              <Link to="/centres-sante" className="text-gray-600 hover:text-blue-600">Centres de Santé</Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Connexion</Button>
              <Button>S'inscrire</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Téléconsultation Médicale
            <span className="text-blue-600"> Simplifiée</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Consultez des médecins qualifiés depuis chez vous ou trouvez les centres de santé les plus proches. 
            Votre santé, notre priorité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/teleconsultation">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Video className="h-5 w-5 mr-2" />
                Démarrer une téléconsultation
              </Button>
            </Link>
            <Link to="/medecins-proches">
              <Button size="lg" variant="outline">
                <MapPin className="h-5 w-5 mr-2" />
                Trouver un médecin proche
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Santé+ ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Téléconsultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Consultez vos médecins en vidéo, où que vous soyez
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Géolocalisation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Trouvez les médecins et centres de santé les plus proches
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Vos données médicales sont protégées et confidentielles
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Disponible 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accès aux soins médicaux à tout moment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nos Services
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle>Pour les Patients</CardTitle>
                    <CardDescription>Accès facile aux soins médicaux</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>Remplissage des symptômes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Video className="h-4 w-4 text-green-600" />
                    <span>Téléconsultation vidéo/audio</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>Médecins géolocalisés</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>Historique des consultations</span>
                  </li>
                </ul>
                <Link to="/patients/new" className="block mt-4">
                  <Button className="w-full">S'inscrire Patient</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Stethoscope className="h-8 w-8 text-green-600" />
                  <div>
                    <CardTitle>Pour les Médecins</CardTitle>
                    <CardDescription>Plateforme professionnelle</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-green-600" />
                    <span>Profil professionnel vérifié</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>Gestion des disponibilités</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Video className="h-4 w-4 text-green-600" />
                    <span>Consultations en ligne</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>Suivi des patients</span>
                  </li>
                </ul>
                <Link to="/medecins/new" className="block mt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    S'inscrire Médecin
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle>Centres de Santé</CardTitle>
                    <CardDescription>Réseau de partenaires</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>Localisation en temps réel</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>Horaires d'ouverture</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Stethoscope className="h-4 w-4 text-green-600" />
                    <span>Spécialités disponibles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span>Contact direct</span>
                  </li>
                </ul>
                <Link to="/centres-sante" className="block mt-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Voir les Centres
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Patients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Médecins partenaires</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Centres de santé</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support disponible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="h-6 w-6" />
                <span className="text-xl font-bold">Santé+</span>
              </div>
              <p className="text-gray-400">
                Plateforme de téléconsultation médicale pour un accès simplifié aux soins de santé.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Téléconsultation</li>
                <li>Géolocalisation</li>
                <li>Rendez-vous en ligne</li>
                <li>Suivi médical</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Conditions d'utilisation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@santeplus.fr</li>
                <li>01 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Santé+. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

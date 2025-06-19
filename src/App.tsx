
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MedecinList from "./components/medecins/MedecinList";
import MedecinForm from "./components/medecins/MedecinForm";
import MedecinsProches from "./components/medecins/MedecinsProches";
import PatientList from "./components/patients/PatientList";
import PatientForm from "./components/patients/PatientForm";
import SymptomesForm from "./components/patients/SymptomesForm";
import RendezVousList from "./components/rendezvous/RendezVousList";
import RendezVousDetail from "./components/rendezvous/RendezVousDetail";
import NouveauRendezVous from "./components/rendezvous/NouveauRendezVous";
import TeleconsultationForm from "./components/teleconsultation/TeleconsultationForm";
import PatientDashboard from "./components/dashboards/PatientDashboard";
import MedecinDashboard from "./components/dashboards/MedecinDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Routes pour les Dashboards */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/medecin/dashboard" element={<MedecinDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Routes for Patients */}
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/new" element={<PatientForm />} />
            <Route path="/patients/edit/:id" element={<PatientForm />} />
            <Route path="/patients/:id/symptomes" element={<SymptomesForm />} />
            
            {/* Routes for Medecins */}
            <Route path="/medecins" element={<MedecinList />} />
            <Route path="/medecins/new" element={<MedecinForm />} />
            <Route path="/medecins/edit/:id" element={<MedecinForm />} />
            <Route path="/medecins-proches" element={<MedecinsProches />} />
            
            {/* Routes for Teleconsultation */}
            <Route path="/teleconsultation" element={<TeleconsultationForm />} />
            <Route path="/teleconsultation/attente" element={<div className="p-8 text-center"><h1 className="text-2xl">Salle d'attente</h1><p className="text-gray-600 mt-4">Un médecin va vous contacter...</p></div>} />
            
            {/* Routes for Rendez-vous */}
            <Route path="/rendezvous" element={<RendezVousList />} />
            <Route path="/patient/nouveau-rdv" element={<NouveauRendezVous />} />
            <Route path="/rendezvous/:id" element={<RendezVousDetail />} />
            
            {/* Routes for Centres de Santé */}
            <Route path="/centres-sante" element={<div className="p-8 text-center"><h1 className="text-2xl">Centres de Santé</h1><p className="text-gray-600 mt-4">Liste des centres de santé partenaires (en développement)</p></div>} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

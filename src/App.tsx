
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Medecins from "./pages/Medecins";
import RendezVous from "./pages/RendezVous";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Routes for Patients */}
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/new" element={<div className="p-8 text-center"><h1 className="text-2xl">Nouveau Patient</h1><p className="text-gray-600 mt-4">Formulaire en cours de développement...</p></div>} />
          <Route path="/patients/edit/:id" element={<div className="p-8 text-center"><h1 className="text-2xl">Modifier Patient</h1><p className="text-gray-600 mt-4">Formulaire en cours de développement...</p></div>} />
          
          {/* Routes for Medecins */}
          <Route path="/medecins" element={<Medecins />} />
          <Route path="/medecins/new" element={<div className="p-8 text-center"><h1 className="text-2xl">Nouveau Médecin</h1><p className="text-gray-600 mt-4">Formulaire en cours de développement...</p></div>} />
          <Route path="/medecins/edit/:id" element={<div className="p-8 text-center"><h1 className="text-2xl">Modifier Médecin</h1><p className="text-gray-600 mt-4">Formulaire en cours de développement...</p></div>} />
          
          {/* Routes for Rendez-vous */}
          <Route path="/rendezvous" element={<RendezVous />} />
          <Route path="/rendezvous/new" element={<div className="p-8 text-center"><h1 className="text-2xl">Nouveau Rendez-vous</h1><p className="text-gray-600 mt-4">Formulaire en cours de développement...</p></div>} />
          <Route path="/rendezvous/:id" element={<div className="p-8 text-center"><h1 className="text-2xl">Détail Rendez-vous</h1><p className="text-gray-600 mt-4">Détail en cours de développement...</p></div>} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

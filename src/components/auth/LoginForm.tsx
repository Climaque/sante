
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthProvider';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.prenom} !`,
      });
      
      onClose();
      
      // Rediriger vers le dashboard approprié selon le rôle
      switch (user.role) {
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'medecin':
          navigate('/medecin/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>
          Connectez-vous à votre compte Santé+
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          {/* Comptes de test */}
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
            <p className="font-medium mb-1">Comptes de test :</p>
            <p>Patient: patient@test.com</p>
            <p>Médecin: medecin@test.com</p>
            <p>Admin: admin@test.com</p>
            <p className="mt-1">Mot de passe: password</p>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

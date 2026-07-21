import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';

const roles = [
  { id: 'student', label: 'Student' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'company', label: 'Company' },
  { id: 'admin', label: 'Admin' },
];

export default function Login() {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { data: { email, password } },
      {
        onSuccess: (response) => {
          toast({ title: 'Welcome back!', description: `Logged in as ${response.user.role}` });
          // Redirect based on role
          const roleRoutes: Record<string, string> = {
            student: '/student',
            faculty: '/faculty',
            company: '/company',
            admin: '/admin',
          };
          setLocation(roleRoutes[response.user.role] || '/student');
        },
        onError: () => {
          toast({
            title: 'Login failed',
            description: 'Invalid credentials. Please try again.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/">
            <div className="inline-block mb-6">
              <Logo />
            </div>
          </Link>
          <h1 className="font-display font-bold text-3xl text-[var(--text-hi)] mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-[var(--text-lo)]">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="border border-[var(--line)] rounded-xl p-8 bg-[var(--ink-2)]/35 backdrop-blur-sm shadow-[0_0_40px_rgba(123,44,191,0.15)]">
          {/* Role Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-[var(--ink-3)]/30 rounded-lg">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all ${
                  selectedRole === role.id
                    ? 'bg-[var(--violet-2)] text-white shadow-lg'
                    : 'text-[var(--text-lo)] hover:text-[var(--text-hi)]'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[var(--text-hi)]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)] placeholder:text-[var(--text-lo)]"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-[var(--text-hi)]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
              disabled={login.isPending}
            >
              {login.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--text-lo)]">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-[var(--violet-3)] hover:text-[var(--lilac)] font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

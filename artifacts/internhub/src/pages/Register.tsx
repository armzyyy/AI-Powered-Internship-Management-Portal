import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';

const roles = [
  { id: 'student', label: 'Student' },
  { id: 'company', label: 'Company' },
  { id: 'faculty', label: 'Faculty' },
];

export default function Register() {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<'student' | 'faculty' | 'company' | 'admin'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const register = useRegister();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure both password fields match.',
        variant: 'destructive',
      });
      return;
    }

    register.mutate(
      {
        data: {
          name,
          email,
          password,
          role: selectedRole,
          university: selectedRole === 'student' || selectedRole === 'faculty' ? university : undefined,
          companyName: selectedRole === 'company' ? companyName : undefined,
        },
      },
      {
        onSuccess: (response) => {
          toast({ title: 'Account created!', description: 'Welcome to InternHub.' });
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
            title: 'Registration failed',
            description: 'Please try again or contact support.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/">
            <div className="inline-block mb-6">
              <Logo />
            </div>
          </Link>
          <h1 className="font-display font-bold text-3xl text-[var(--text-hi)] mb-2">
            Get started
          </h1>
          <p className="text-sm text-[var(--text-lo)]">
            Create your InternHub account
          </p>
        </div>

        <div className="border border-[var(--line)] rounded-xl p-8 bg-[var(--ink-2)]/35 backdrop-blur-sm shadow-[0_0_40px_rgba(123,44,191,0.15)]">
          {/* Role Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-[var(--ink-3)]/30 rounded-lg">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as typeof selectedRole)}
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
              <Label htmlFor="name" className="text-[var(--text-hi)]">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)] placeholder:text-[var(--text-lo)]"
                required
              />
            </div>
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
            <div>
              <Label htmlFor="confirmPassword" className="text-[var(--text-hi)]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                required
              />
            </div>
            {(selectedRole === 'student' || selectedRole === 'faculty') && (
              <div>
                <Label htmlFor="university" className="text-[var(--text-hi)]">
                  University
                </Label>
                <Input
                  id="university"
                  type="text"
                  placeholder="Massachusetts Institute of Technology"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)] placeholder:text-[var(--text-lo)]"
                  required
                />
              </div>
            )}
            {selectedRole === 'company' && (
              <div>
                <Label htmlFor="companyName" className="text-[var(--text-hi)]">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Acme Corp"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)] placeholder:text-[var(--text-lo)]"
                  required
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
              disabled={register.isPending}
            >
              {register.isPending ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--text-lo)]">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[var(--violet-3)] hover:text-[var(--lilac)] font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

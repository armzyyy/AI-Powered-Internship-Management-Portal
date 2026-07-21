import { Link } from 'wouter';
import { Logo } from '@/components/Logo';
import { JourneyCard } from '@/components/JourneyCard';
import {
  UserCircle,
  Building2,
  GraduationCap,
  Shield,
  FileText,
  TrendingUp,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const roles = [
  {
    icon: UserCircle,
    title: 'Student',
    desc: 'Apply, track progress, submit reports, and leverage AI tools',
  },
  {
    icon: GraduationCap,
    title: 'Faculty Supervisor',
    desc: 'Review student reports, provide feedback, monitor progress',
  },
  {
    icon: Building2,
    title: 'Company',
    desc: 'Post internships, manage applicants, track performance',
  },
  {
    icon: Shield,
    title: 'Administrator',
    desc: 'Oversee the entire system, manage users and listings',
  },
];

const features = [
  'Live internship listings',
  'One-click applications',
  'Role-based dashboards',
  'Weekly progress reports',
  'Faculty feedback loop',
  'Profile strength scoring',
  'Real-time notifications',
  'Smart filtering & search',
  'Complete audit trail',
];

const aiTools = [
  { badge: 'Resume', title: 'Resume Review', desc: 'Score & bullet suggestions' },
  {
    badge: 'Writing',
    title: 'Cover Letter Generator',
    desc: 'Personalized for each role',
  },
  { badge: 'Reports', title: 'Report Generator', desc: 'Weekly summaries from notes' },
  { badge: 'Grammar', title: 'Writing Improvement', desc: 'Polish your text' },
  {
    badge: 'Interview',
    title: 'Interview Prep',
    desc: 'Practice questions by role',
  },
  { badge: 'Growth', title: 'Skill Gap Analysis', desc: 'Find missing skills' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a
              href="#listings"
              className="text-[var(--text-lo)] hover:text-[var(--text-hi)] transition-colors"
            >
              Listings
            </a>
            <a
              href="#roles"
              className="text-[var(--text-lo)] hover:text-[var(--text-hi)] transition-colors"
            >
              Who it's for
            </a>
            <a
              href="#features"
              className="text-[var(--text-lo)] hover:text-[var(--text-hi)] transition-colors"
            >
              Features
            </a>
            <a
              href="#ai"
              className="text-[var(--text-lo)] hover:text-[var(--text-hi)] transition-colors"
            >
              AI Tools
            </a>
            <a
              href="#how"
              className="text-[var(--text-lo)] hover:text-[var(--text-hi)] transition-colors"
            >
              How it works
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-[var(--text-lo)]">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-[var(--text-hi)] leading-tight mb-6">
            Run your internship cycle{' '}
            <span className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--lilac)] bg-clip-text text-transparent">
              properly
            </span>
          </h1>
          <p className="text-lg text-[var(--text-lo)] mb-8">
            A complete AI-powered portal connecting students, faculty, companies, and
            admins. Apply, track, report, and get certified — all in one place.
          </p>
          <div className="flex gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
              >
                Get started free
              </Button>
            </Link>
            <Link href="/listings">
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--line)] text-[var(--text-hi)]"
              >
                Browse listings
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <JourneyCard />
        </div>
      </section>

      {/* Four Roles */}
      <section id="roles" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl text-[var(--text-hi)] mb-4">
            Four roles, one system
          </h2>
          <p className="text-lg text-[var(--text-lo)]">
            Tailored dashboards and workflows for everyone involved
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm hover:border-[var(--lilac)]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[var(--text-hi)] mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-[var(--text-lo)]">{role.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl text-[var(--text-hi)] mb-4">
            Everything an internship cycle needs
          </h2>
          <p className="text-lg text-[var(--text-lo)]">
            Built for universities that take internships seriously
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-px border border-[var(--line)] rounded-xl overflow-hidden bg-[var(--line)]">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[var(--ink-1)] p-6 flex items-center gap-3 hover:bg-[var(--ink-2)]/50 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--violet-3)]/10 flex items-center justify-center">
                <span className="text-sm font-bold font-display text-[var(--violet-3)]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm font-medium text-[var(--text-hi)]">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Tools */}
      <section id="ai" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lilac)]/10 border border-[var(--lilac)]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[var(--lilac)]" />
            <span className="text-sm font-medium text-[var(--lilac)]">
              AI-Powered
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl text-[var(--text-hi)] mb-4">
            AI, built in — not bolted on
          </h2>
          <p className="text-lg text-[var(--text-lo)]">
            Six intelligent tools to help students succeed
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => (
            <div
              key={tool.badge}
              className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm hover:border-[var(--violet-3)]/40 transition-all"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--lilac)]/10 border border-[var(--lilac)]/20 mb-4">
                <span className="text-xs font-semibold text-[var(--lilac)]">
                  {tool.badge}
                </span>
              </div>
              <h3 className="font-display font-semibold text-base text-[var(--text-hi)] mb-2">
                {tool.title}
              </h3>
              <p className="text-sm text-[var(--text-lo)]">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-2xl bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] p-12 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Ready to run your internship cycle properly?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join universities already using InternHub
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-[var(--violet-2)] hover:bg-white/90">
                Get started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--line)] bg-[var(--ink-1)]/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo />
            <div className="flex gap-8 text-sm text-[var(--text-lo)]">
              <a href="#" className="hover:text-[var(--text-hi)] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[var(--text-hi)] transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-[var(--text-hi)] transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-[var(--text-lo)]">
            © 2024 InternHub. Built for universities that care.
          </div>
        </div>
      </footer>
    </div>
  );
}

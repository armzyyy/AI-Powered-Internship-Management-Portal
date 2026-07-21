import { Link, useRoute } from 'wouter';
import {
  LayoutGrid,
  Search,
  Briefcase,
  FileText,
  Sparkles,
  User,
  LogOut,
  Users,
  Building2,
  Settings,
} from 'lucide-react';
import { Logo } from './Logo';

type Role = 'student' | 'faculty' | 'company' | 'admin';

const roleNav: Record<Role, Array<{ path: string; label: string; icon: any }>> = {
  student: [
    { path: '/student', label: 'Overview', icon: LayoutGrid },
    { path: '/listings', label: 'Listings', icon: Search },
    { path: '/student/applications', label: 'Applications', icon: Briefcase },
    { path: '/reports', label: 'Weekly Reports', icon: FileText },
    { path: '/ai-tools', label: 'AI Tools', icon: Sparkles },
    { path: '/profile', label: 'Profile', icon: User },
  ],
  faculty: [
    { path: '/faculty', label: 'Overview', icon: LayoutGrid },
    { path: '/faculty/students', label: 'Students', icon: Users },
    { path: '/faculty/reports', label: 'Reports Queue', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
  ],
  company: [
    { path: '/company', label: 'Overview', icon: LayoutGrid },
    { path: '/company/listings', label: 'My Listings', icon: Briefcase },
    { path: '/company/applicants', label: 'Applicants', icon: Users },
    { path: '/profile', label: 'Profile', icon: User },
  ],
  admin: [
    { path: '/admin', label: 'Overview', icon: LayoutGrid },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/internships', label: 'Internships', icon: Briefcase },
    { path: '/admin/reports', label: 'Reports', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
  ],
};

export function Sidebar({ role }: { role: Role }) {
  const navItems = roleNav[role] || roleNav.student;

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-md flex flex-col">
      <div className="p-6 border-b border-[var(--line)]">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const [isActive] = useRoute(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--violet-2)] text-white'
                  : 'text-[var(--text-lo)] hover:text-[var(--text-hi)] hover:bg-[var(--ink-2)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-[var(--line)]">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[var(--text-lo)] hover:text-[var(--text-hi)] hover:bg-[var(--ink-2)] transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

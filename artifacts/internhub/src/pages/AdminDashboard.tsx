import { Sidebar } from '@/components/Sidebar';
import { Bell, Users, Briefcase, FileText, Database } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="admin" />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-lo)]">Admin Panel</p>
            <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">System Overview</h1>
          </div>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Total Users</p>
                <Users className="w-4 h-4 text-[var(--violet-3)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">1,247</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Total Internships</p>
                <Briefcase className="w-4 h-4 text-[var(--emerald)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">86</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Total Applications</p>
                <FileText className="w-4 h-4 text-[var(--lilac)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">542</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Total Reports</p>
                <Database className="w-4 h-4 text-[var(--rose)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">3,108</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="border border-[var(--line)] rounded-xl p-4 bg-[var(--ink-2)]/35 text-center">
              <p className="text-2xl font-display font-bold text-[var(--text-hi)]">892</p>
              <p className="text-xs text-[var(--text-lo)] mt-1">Students</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-4 bg-[var(--ink-2)]/35 text-center">
              <p className="text-2xl font-display font-bold text-[var(--text-hi)]">156</p>
              <p className="text-xs text-[var(--text-lo)] mt-1">Faculty</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-4 bg-[var(--ink-2)]/35 text-center">
              <p className="text-2xl font-display font-bold text-[var(--text-hi)]">184</p>
              <p className="text-xs text-[var(--text-lo)] mt-1">Companies</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-4 bg-[var(--ink-2)]/35 text-center">
              <p className="text-2xl font-display font-bold text-[var(--text-hi)]">15</p>
              <p className="text-xs text-[var(--text-lo)] mt-1">Admins</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

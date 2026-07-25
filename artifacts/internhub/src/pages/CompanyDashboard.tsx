import { Sidebar } from '@/components/Sidebar';
import { StatusPill } from '@/components/StatusPill';
import { Bell, Briefcase, Users, FileText } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function CompanyDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="company" />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-lo)]">Company Portal</p>
            <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">Dashboard</h1>
          </div>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
              TC
            </AvatarFallback>
          </Avatar>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Active Listings</p>
                <Briefcase className="w-4 h-4 text-[var(--violet-3)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">5</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Total Applicants</p>
                <Users className="w-4 h-4 text-[var(--emerald)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">47</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Pending Reviews</p>
                <FileText className="w-4 h-4 text-[var(--rose)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">12</p>
            </div>
          </div>

          <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-[var(--text-hi)]">
                My Internship Listings
              </h2>
              <Button size="sm" className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white">
                Post New Internship
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--line)]">
                    <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">Role</th>
                    <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">Location</th>
                    <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">Type</th>
                    <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">Applicants</th>
                    <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  <tr>
                    <td className="py-3 text-sm text-[var(--text-hi)]">Frontend Developer</td>
                    <td className="py-3 text-sm text-[var(--text-lo)]">Remote</td>
                    <td className="py-3 text-sm text-[var(--text-lo)]">Remote</td>
                    <td className="py-3 text-sm text-[var(--text-lo)]">18</td>
                    <td className="py-3"><StatusPill status="open">Open</StatusPill></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

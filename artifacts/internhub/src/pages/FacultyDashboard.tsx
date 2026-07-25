import { Sidebar } from '@/components/Sidebar';
import { StatusPill } from '@/components/StatusPill';
import { Bell, FileText, Users, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const mockReports = [
  { id: 1, student: 'Alex Davis', week: 6, title: 'API Integration Progress', date: '2024-01-20', preview: 'Completed REST API endpoints for user authentication...' },
  { id: 2, student: 'Emma Wilson', week: 5, title: 'Frontend Development', date: '2024-01-19', preview: 'Built responsive dashboard using React and Tailwind...' },
];

export default function FacultyDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="faculty" />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-lo)]">Faculty Portal</p>
            <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">Review Queue</h1>
          </div>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
              SJ
            </AvatarFallback>
          </Avatar>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Pending Reviews</p>
                <FileText className="w-4 h-4 text-[var(--rose)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">8</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Total Students</p>
                <Users className="w-4 h-4 text-[var(--violet-3)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">24</p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Reviewed This Week</p>
                <CheckCircle className="w-4 h-4 text-[var(--emerald)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">12</p>
            </div>
          </div>

          <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35">
            <h2 className="font-display font-semibold text-lg text-[var(--text-hi)] mb-4">
              Reports Awaiting Review
            </h2>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div key={report.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--ink-3)]/30 transition-colors">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
                      {report.student.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">W{report.week}</span>
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text-hi)]">{report.student}</p>
                        <p className="text-sm text-[var(--text-lo)]">{report.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-lo)] line-clamp-2">{report.preview}</p>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

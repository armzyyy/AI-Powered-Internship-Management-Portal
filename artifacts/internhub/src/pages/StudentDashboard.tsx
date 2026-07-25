import { Sidebar } from '@/components/Sidebar';
import { StatusPill } from '@/components/StatusPill';
import { JourneyCard } from '@/components/JourneyCard';
import { Bell, Briefcase, FileText, TrendingUp, User, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetStudentDashboard, useListApplications, useListReports } from '@workspace/api-client-react';
import { Link } from 'wouter';

const mockData = {
  activeInternship: 1,
  reportsSubmitted: 6,
  totalReports: 12,
  pendingFeedback: 1,
  profileStrength: 82,
  recentApplications: [
    { id: 1, company: 'TechCorp', role: 'Frontend Developer', date: '2024-01-15', status: 'interview' },
    { id: 2, company: 'DataFlow Inc', role: 'ML Engineer', date: '2024-01-12', status: 'pending' },
    { id: 3, company: 'CloudBase', role: 'Backend Developer', date: '2024-01-08', status: 'accepted' },
  ],
  weeklyReports: [
    { week: 6, title: 'API Integration Progress', date: '2024-01-20', status: 'pending' },
    { week: 5, title: 'Authentication Module Complete', date: '2024-01-13', status: 'reviewed' },
    { week: 4, title: 'Database Schema Design', date: '2024-01-06', status: 'reviewed' },
  ],
  notifications: [
    { id: 1, type: 'feedback', message: 'New feedback on Week 5 report', time: '2h ago' },
    { id: 2, type: 'deadline', message: 'Week 6 report due in 2 days', time: '1d ago' },
    { id: 3, type: 'application', message: 'TechCorp updated your application', time: '3d ago' },
  ],
};

export default function StudentDashboard() {
  const dashboard = useGetStudentDashboard();
  const data = dashboard.data || mockData;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const notificationDotColor = (type: string) => {
    switch (type) {
      case 'feedback': return 'bg-[var(--emerald)]';
      case 'deadline': return 'bg-[var(--rose)]';
      case 'application': return 'bg-[var(--violet-3)]';
      default: return 'bg-[var(--lilac)]';
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="student" />
      <main className="flex-1 ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-lo)]">{getGreeting()}</p>
            <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">
              Welcome back, Alex
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[var(--ink-2)] rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-[var(--text-lo)]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--rose)] rounded-full" />
            </button>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Active Internship</p>
                <Briefcase className="w-4 h-4 text-[var(--violet-3)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {data.activeInternship || 0}
              </p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Reports Submitted</p>
                <FileText className="w-4 h-4 text-[var(--violet-3)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {data.reportsSubmitted}/{data.totalReports}
              </p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Pending Feedback</p>
                <FileText className="w-4 h-4 text-[var(--rose)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {data.pendingFeedback}
              </p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-lo)]">Profile Strength</p>
                <TrendingUp className="w-4 h-4 text-[var(--emerald)]" />
              </div>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {data.profileStrength}%
              </p>
            </div>
          </div>

          {/* Two Columns */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - 2 units wide */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Internship */}
              <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
                <h2 className="font-display font-semibold text-lg text-[var(--text-hi)] mb-4">
                  Current Internship
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-[var(--text-hi)]">Frontend Developer</p>
                      <p className="text-sm text-[var(--text-lo)]">TechCorp Inc.</p>
                    </div>
                    <StatusPill status="in-progress">In progress</StatusPill>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[var(--text-lo)]">Supervisor</p>
                      <p className="text-[var(--text-hi)]">Dr. Sarah Johnson</p>
                    </div>
                    <div>
                      <p className="text-[var(--text-lo)]">Duration</p>
                      <p className="text-[var(--text-hi)]">Jan 1 - Mar 31, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
                <h2 className="font-display font-semibold text-lg text-[var(--text-hi)] mb-4">
                  My Applications
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--line)]">
                        <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">
                          Company
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">
                          Role
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">
                          Date
                        </th>
                        <th className="text-left text-xs font-medium text-[var(--text-lo)] pb-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--line)]">
                      {mockData.recentApplications.map((app) => (
                        <tr key={app.id}>
                          <td className="py-3 text-sm text-[var(--text-hi)]">
                            {app.company}
                          </td>
                          <td className="py-3 text-sm text-[var(--text-lo)]">
                            {app.role}
                          </td>
                          <td className="py-3 text-sm text-[var(--text-lo)]">
                            {app.date}
                          </td>
                          <td className="py-3">
                            <StatusPill status={app.status as any}>
                              {app.status}
                            </StatusPill>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Journey */}
              <JourneyCard activeStep={2} />

              {/* Notifications */}
              <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
                <h2 className="font-display font-semibold text-base text-[var(--text-hi)] mb-4">
                  Notifications
                </h2>
                <div className="space-y-3">
                  {mockData.notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notificationDotColor(notif.type)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-hi)]">{notif.message}</p>
                        <p className="text-xs text-[var(--text-lo)] mt-0.5">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Reports & AI Tools */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg text-[var(--text-hi)]">
                  Weekly Reports
                </h2>
                <Link
                  href="/reports"
                  className="text-sm text-[var(--violet-3)] hover:text-[var(--lilac)]"
                >
                  Submit new report
                </Link>
              </div>
              <div className="space-y-3">
                {mockData.weeklyReports.map((report) => (
                  <div
                    key={report.week}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--ink-3)]/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">
                        W{report.week}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-hi)]">
                        {report.title}
                      </p>
                      <p className="text-xs text-[var(--text-lo)]">{report.date}</p>
                    </div>
                    <StatusPill status={report.status as any}>
                      {report.status}
                    </StatusPill>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <h2 className="font-display font-semibold text-base text-[var(--text-hi)] mb-4">
                AI Tools
              </h2>
              <div className="space-y-2">
                {['Resume Review', 'Cover Letter', 'Interview Prep'].map((tool, idx) => (
                  <Link key={idx} href="/ai-tools">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--ink-3)]/30 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-[var(--lilac)]/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-[var(--lilac)]" />
                      </div>
                      <span className="text-sm text-[var(--text-hi)]">{tool}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

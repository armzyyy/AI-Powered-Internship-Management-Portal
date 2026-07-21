import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatusPill } from '@/components/StatusPill';
import { Bell, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const mockReports = [
  { id: 1, week: 6, title: 'API Integration Progress', date: '2024-01-20', status: 'pending', content: 'Completed REST API endpoints for user authentication.' },
  { id: 2, week: 5, title: 'Authentication Module Complete', date: '2024-01-13', status: 'reviewed', content: 'Implemented JWT-based auth system.', feedback: 'Great progress! Consider adding refresh tokens.' },
  { id: 3, week: 4, title: 'Database Schema Design', date: '2024-01-06', status: 'reviewed', content: 'Designed normalized schema for user and internship data.' },
];

export default function WeeklyReports() {
  const [open, setOpen] = useState(false);
  const [weekNumber, setWeekNumber] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({ title: 'Report submitted', description: `Week ${weekNumber} report has been submitted.` });
    setOpen(false);
    setWeekNumber('');
    setTitle('');
    setContent('');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="student" />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">Weekly Reports</h1>
          <div className="flex items-center gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[var(--ink-2)] border-[var(--line)]">
                <DialogHeader>
                  <DialogTitle className="font-display text-[var(--text-hi)]">Submit Weekly Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label className="text-[var(--text-hi)]">Week Number</Label>
                    <Input
                      type="number"
                      value={weekNumber}
                      onChange={(e) => setWeekNumber(e.target.value)}
                      className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                    />
                  </div>
                  <div>
                    <Label className="text-[var(--text-hi)]">Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                    />
                  </div>
                  <div>
                    <Label className="text-[var(--text-hi)]">Content</Label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={6}
                      className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white">
                    Submit Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 space-y-4">
          {mockReports.map((report) => (
            <div key={report.id} className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">W{report.week}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-[var(--text-hi)] mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-[var(--text-lo)]">Submitted on {report.date}</p>
                  </div>
                </div>
                <StatusPill status={report.status as any}>{report.status}</StatusPill>
              </div>
              <p className="text-sm text-[var(--text-lo)] mb-4">{report.content}</p>
              {report.feedback && (
                <div className="mt-4 p-4 rounded-lg bg-[var(--emerald)]/5 border border-[var(--emerald)]/20">
                  <p className="text-xs font-semibold text-[var(--emerald)] mb-2">Faculty Feedback</p>
                  <p className="text-sm text-[var(--text-lo)]">{report.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

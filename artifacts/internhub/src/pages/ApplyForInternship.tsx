import { useState } from 'react';
import { useParams, useLocation, Link } from 'wouter';
import { Sidebar } from '@/components/Sidebar';
import { Bell, ArrowLeft, Upload, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGetInternship, useApplyToInternship, getGetInternshipQueryKey } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';

export default function ApplyForInternship() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const id = params.id ? Number(params.id) : 0;
  const { data: internship, isLoading } = useGetInternship(id, {
    query: { enabled: !!id, queryKey: getGetInternshipQueryKey(id) },
  });
  const apply = useApplyToInternship();
  const { toast } = useToast();

  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  const handleSubmit = () => {
    apply.mutate(
      { id, data: { coverLetter, resumeUrl } },
      {
        onSuccess: () => {
          toast({
            title: 'Application submitted!',
            description: 'Your application has been sent to the company.',
          });
          setLocation('/student');
        },
      }
    );
  };

  const mockInternship = {
    role: 'Frontend Developer Intern',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Remote',
    stipend: '$2,000/month',
    deadline: '2024-02-15',
    daysLeft: 12,
  };

  const data = internship || mockInternship;

  return (
    <div className="flex min-h-screen">
      <Sidebar role="student" />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/listings">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Listings
              </Button>
            </Link>
            <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">
              Apply for Internship
            </h1>
          </div>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
        </header>

        <div className="p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Summary */}
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm h-fit">
              <h2 className="font-display font-semibold text-lg text-[var(--text-hi)] mb-4">
                Internship Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[var(--text-lo)]">Role</p>
                  <p className="text-[var(--text-hi)] font-medium">{data.role}</p>
                </div>
                <div>
                  <p className="text-[var(--text-lo)]">Company</p>
                  <p className="text-[var(--text-hi)] font-medium">{data.company}</p>
                </div>
                <div>
                  <p className="text-[var(--text-lo)]">Type</p>
                  <p className="text-[var(--text-hi)] font-medium">{data.type}</p>
                </div>
                <div>
                  <p className="text-[var(--text-lo)]">Location</p>
                  <p className="text-[var(--text-hi)] font-medium">{data.location}</p>
                </div>
                <div>
                  <p className="text-[var(--text-lo)]">Stipend</p>
                  <p className="text-[var(--text-hi)] font-medium">{data.stipend}</p>
                </div>
                <div>
                  <p className="text-[var(--text-lo)]">Deadline</p>
                  <p className="text-[var(--emerald)] font-medium">
                    {data.daysLeft} days left
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Application Form */}
            <div className="md:col-span-2 space-y-6">
              <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
                <h2 className="font-display font-semibold text-lg text-[var(--text-hi)] mb-4">
                  Upload Resume
                </h2>
                <div className="border-2 border-dashed border-[var(--violet-3)]/30 rounded-xl p-8 text-center hover:border-[var(--violet-3)]/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-[var(--violet-3)] mx-auto mb-3" />
                  <p className="text-sm text-[var(--text-hi)] mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-[var(--text-lo)]">PDF, DOC up to 5MB</p>
                </div>
              </div>

              <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-lg text-[var(--text-hi)]">
                    Cover Letter
                  </h2>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[var(--lilac)]/20 text-[var(--lilac)]"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Generate
                  </Button>
                </div>
                <Textarea
                  placeholder="Explain why you're a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={12}
                  className="bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={apply.isPending}
                className="w-full bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
              >
                {apply.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

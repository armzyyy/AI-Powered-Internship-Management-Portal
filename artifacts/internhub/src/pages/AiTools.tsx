import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Bell, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const tools = [
  { id: 'resume', badge: 'Resume', title: 'Resume Review', desc: 'Get AI feedback and improvement suggestions' },
  { id: 'cover', badge: 'Writing', title: 'Cover Letter Generator', desc: 'Create personalized cover letters' },
  { id: 'report', badge: 'Reports', title: 'Weekly Report Generator', desc: 'Transform notes into professional reports' },
  { id: 'grammar', badge: 'Grammar', title: 'Writing Improvement', desc: 'Polish and refine your text' },
  { id: 'interview', badge: 'Interview', title: 'Interview Preparation', desc: 'Practice with role-specific questions' },
  { id: 'skills', badge: 'Growth', title: 'Skill Gap Analysis', desc: 'Identify missing skills for your target role' },
];

export default function AiTools() {
  const [activeTool, setActiveTool] = useState('resume');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResult('AI-generated result would appear here based on your input. This is a demo response.');
      setIsLoading(false);
      toast({ title: 'Analysis complete', description: 'Review your results below.' });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="student" />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[var(--lilac)]" />
              <p className="text-xs text-[var(--text-lo)]">AI Assistant</p>
            </div>
            <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">
              AI Tools for You
            </h1>
          </div>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
        </header>

        <div className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`border rounded-xl p-6 text-left transition-all ${
                  activeTool === tool.id
                    ? 'border-[var(--violet-3)] bg-[var(--violet-3)]/10'
                    : 'border-[var(--line)] bg-[var(--ink-2)]/35 hover:border-[var(--violet-3)]/40'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--lilac)]/10 border border-[var(--lilac)]/20 mb-3">
                  <span className="text-xs font-semibold text-[var(--lilac)]">{tool.badge}</span>
                </div>
                <h3 className="font-display font-semibold text-base text-[var(--text-hi)] mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-[var(--text-lo)]">{tool.desc}</p>
              </button>
            ))}
          </div>

          <div className="border border-[var(--line)] rounded-xl p-8 bg-[var(--ink-2)]/35 backdrop-blur-sm space-y-6">
            <div>
              <Label className="text-[var(--text-hi)] mb-2 block">Your Input</Label>
              <Textarea
                placeholder="Paste your content here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={8}
                className="bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !input}
              className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
            >
              {isLoading ? 'Analyzing...' : 'Generate'}
            </Button>
            {result && (
              <div className="mt-6 p-6 rounded-xl bg-[var(--violet-3)]/5 border border-[var(--violet-3)]/20">
                <h3 className="font-display font-semibold text-base text-[var(--text-hi)] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--lilac)]" />
                  AI Result
                </h3>
                <p className="text-sm text-[var(--text-lo)] whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

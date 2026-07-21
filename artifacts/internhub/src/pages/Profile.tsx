import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Bell, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const [name, setName] = useState('Alex Davis');
  const [email] = useState('alex.davis@university.edu');
  const [bio, setBio] = useState('Computer Science student passionate about web development');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [university, setUniversity] = useState('Massachusetts Institute of Technology');
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Python']);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="student" />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">My Profile</h1>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
        </header>

        <div className="p-8 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm h-fit">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold text-2xl">
                    AD
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-display font-semibold text-lg text-[var(--text-hi)] mb-1">
                  {name}
                </h2>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--violet-3)]/10 text-[var(--violet-3)] border border-[var(--violet-3)]/20 mb-2">
                  Student
                </span>
                <p className="text-sm text-[var(--text-lo)]">Joined Jan 2024</p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm space-y-4">
                <div>
                  <Label className="text-[var(--text-hi)]">Full Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--text-hi)]">Email</Label>
                  <Input
                    value={email}
                    disabled
                    className="mt-1.5 bg-[var(--ink-3)]/30 border-[var(--line)] text-[var(--text-lo)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--text-hi)]">Bio</Label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--text-hi)]">Phone</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--text-hi)]">University</Label>
                  <Input
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="mt-1.5 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                  />
                </div>
              </div>

              <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
                <h3 className="font-display font-semibold text-base text-[var(--text-hi)] mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--violet-3)]/10 border border-[var(--violet-3)]/20 text-sm text-[var(--text-hi)]"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-[var(--rose)]">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                  />
                  <Button onClick={addSkill} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

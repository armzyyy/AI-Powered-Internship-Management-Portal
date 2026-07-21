import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatusPill } from '@/components/StatusPill';
import { Bell, Search, MapPin, Clock, DollarSign, Users, Eye } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useListInternships } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

const mockListings = [
  {
    id: 1,
    role: 'Frontend Developer Intern',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Remote',
    duration: '3 months',
    stipend: '$2,000/month',
    openings: 3,
    description: 'Build modern web applications using React and TypeScript. Work with senior developers on real products.',
    tags: ['React', 'TypeScript', 'CSS', 'REST APIs'],
    deadline: '2024-02-15',
    daysLeft: 12,
    status: 'open',
  },
  {
    id: 2,
    role: 'Machine Learning Intern',
    company: 'DataFlow Inc',
    location: 'New York, NY',
    type: 'Hybrid',
    duration: '6 months',
    stipend: '$3,500/month',
    openings: 2,
    description: 'Work on cutting-edge ML models for data analysis. Experience with PyTorch or TensorFlow required.',
    tags: ['Python', 'PyTorch', 'ML', 'Data Science'],
    deadline: '2024-02-10',
    daysLeft: 7,
    status: 'open',
  },
  {
    id: 3,
    role: 'Backend Engineer Intern',
    company: 'CloudBase',
    location: 'Austin, TX',
    type: 'On-site',
    duration: '4 months',
    stipend: '$2,800/month',
    openings: 5,
    description: 'Design and implement scalable backend services. Learn about distributed systems and cloud architecture.',
    tags: ['Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    deadline: '2024-02-20',
    daysLeft: 17,
    status: 'open',
  },
  {
    id: 4,
    role: 'UX Design Intern',
    company: 'DesignLab',
    location: 'Remote',
    type: 'Remote',
    duration: '3 months',
    stipend: '$1,800/month',
    openings: 2,
    description: 'Create delightful user experiences for web and mobile. Collaborate with product teams.',
    tags: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    deadline: '2024-01-25',
    daysLeft: 2,
    status: 'open',
  },
  {
    id: 5,
    role: 'Data Analyst Intern',
    company: 'FinTech Solutions',
    location: 'Chicago, IL',
    type: 'Hybrid',
    duration: '5 months',
    stipend: '$2,500/month',
    openings: 1,
    description: 'Analyze financial data and build dashboards. SQL and Excel proficiency required.',
    tags: ['SQL', 'Python', 'Excel', 'Tableau'],
    deadline: '2024-01-20',
    daysLeft: -3,
    status: 'closed',
  },
  {
    id: 6,
    role: 'Mobile Developer Intern',
    company: 'AppWorks',
    location: 'Seattle, WA',
    type: 'On-site',
    duration: '4 months',
    stipend: '$3,000/month',
    openings: 4,
    description: 'Build native mobile applications for iOS and Android. Experience with Swift or Kotlin preferred.',
    tags: ['React Native', 'Swift', 'Kotlin', 'Mobile'],
    deadline: '2024-02-28',
    daysLeft: 25,
    status: 'open',
  },
];

export default function InternshipListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [workType, setWorkType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { toast } = useToast();
  
  const listings = useListInternships();
  const data = listings.data?.results || mockListings;

  const filteredListings = data.filter((listing) => {
    const matchesSearch =
      listing.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = workType === 'all' || listing.type.toLowerCase() === workType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleApply = (id: number) => {
    toast({
      title: 'Application started',
      description: 'Redirecting to application form...',
    });
  };

  const stats = {
    openRoles: data.filter((l) => l.status === 'open').length,
    companies: new Set(data.map((l) => l.company)).size,
    remoteRoles: data.filter((l) => l.type === 'Remote').length,
    closingSoon: data.filter((l) => l.daysLeft > 0 && l.daysLeft <= 7).length,
  };

  const getTypePillVariant = (type: string) => {
    if (type === 'Remote') return 'open';
    if (type === 'Hybrid') return 'interview';
    return 'review';
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="student" />
      <main className="flex-1 ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink-1)]/80 backdrop-blur-lg px-8 h-16 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-[var(--emerald)] rounded-full animate-pulse" />
              <p className="text-xs text-[var(--text-lo)]">Live listings</p>
            </div>
            <h1 className="font-display font-semibold text-lg text-[var(--text-hi)]">
              Internship Listings
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[var(--ink-2)] rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-[var(--text-lo)]" />
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
              <p className="text-sm text-[var(--text-lo)] mb-2">Open Roles</p>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {stats.openRoles}
              </p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <p className="text-sm text-[var(--text-lo)] mb-2">Companies Hiring</p>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {stats.companies}
              </p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <p className="text-sm text-[var(--text-lo)] mb-2">Remote Roles</p>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {stats.remoteRoles}
              </p>
            </div>
            <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
              <p className="text-sm text-[var(--text-lo)] mb-2">Closing Soon</p>
              <p className="text-3xl font-display font-bold text-[var(--text-hi)]">
                {stats.closingSoon}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="border border-[var(--violet-3)]/30 rounded-xl p-4 bg-[var(--ink-2)]/35 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-lo)]" />
                <Input
                  placeholder="Search roles or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]"
                />
              </div>
              <Select value={workType} onValueChange={setWorkType}>
                <SelectTrigger className="w-full md:w-[180px] bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="on-site">On-site</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px] bg-[var(--ink-3)]/50 border-[var(--line)] text-[var(--text-hi)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="deadline">Deadline soonest</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-[var(--text-lo)] flex items-center">
                {filteredListings.length} results
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm hover:border-[var(--lilac)]/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-[var(--violet-2)] to-[var(--violet-3)] text-white font-semibold">
                      {listing.company.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-base text-[var(--text-hi)] mb-1">
                      {listing.role}
                    </h3>
                    <p className="text-sm text-[var(--text-lo)]">{listing.company}</p>
                  </div>
                  <StatusPill status={getTypePillVariant(listing.type) as any}>
                    {listing.type}
                  </StatusPill>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-lo)]">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-lo)]">
                    <Clock className="w-4 h-4" />
                    <span>{listing.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-lo)]">
                    <DollarSign className="w-4 h-4" />
                    <span>{listing.stipend}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-lo)]">
                    <Users className="w-4 h-4" />
                    <span>{listing.openings} openings</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--text-lo)] mb-4 line-clamp-2">
                  {listing.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--ink-3)]/50 border border-[var(--line)] text-[var(--text-hi)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
                  <p className="text-sm text-[var(--text-lo)]">
                    Apply by{' '}
                    {listing.daysLeft > 0 ? (
                      <span className="text-[var(--emerald)] font-medium">
                        {listing.daysLeft} days left
                      </span>
                    ) : (
                      <span className="text-[var(--rose)] font-medium">Closed</span>
                    )}{' '}
                    · {listing.deadline}
                  </p>
                  <Link href={`/apply/${listing.id}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[var(--violet-2)] to-[var(--violet-3)] text-white hover:opacity-90"
                      disabled={listing.status === 'closed'}
                    >
                      {listing.status === 'closed' ? 'Closed' : 'Apply now'}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

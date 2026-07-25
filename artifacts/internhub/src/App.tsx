import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

// Import all pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import StudentDashboard from '@/pages/StudentDashboard';
import InternshipListings from '@/pages/InternshipListings';
import ApplyForInternship from '@/pages/ApplyForInternship';
import WeeklyReports from '@/pages/WeeklyReports';
import FacultyDashboard from '@/pages/FacultyDashboard';
import CompanyDashboard from '@/pages/CompanyDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import AiTools from '@/pages/AiTools';
import Profile from '@/pages/Profile';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/student" component={StudentDashboard} />
      <Route path="/listings" component={InternshipListings} />
      <Route path="/apply/:id" component={ApplyForInternship} />
      <Route path="/reports" component={WeeklyReports} />
      <Route path="/faculty" component={FacultyDashboard} />
      <Route path="/company" component={CompanyDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/ai-tools" component={AiTools} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

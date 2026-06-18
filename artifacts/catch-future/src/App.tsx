import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import FutureScanner from "@/pages/FutureScanner";

// Sections
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Puresar } from "@/components/sections/Puresar";
import { Process } from "@/components/sections/Process";
import { Collections } from "@/components/sections/Collections";
import { Impact } from "@/components/sections/Impact";
import { Inquiry } from "@/components/sections/Inquiry";
import { Footer } from "@/components/sections/Footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <main className="min-h-screen w-full bg-beige selection:bg-forest selection:text-beige">
      <Hero />
      <Introduction />
      <Puresar />
      <Process />
      <Collections />
      <Impact />
      <Inquiry />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route
        path="/future-scanner"
        component={FutureScanner}
      />

      <Route
        path="/admin/login"
        component={AdminLogin}
      />

      <Route
        path="/admin"
        component={AdminDashboard}
      />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

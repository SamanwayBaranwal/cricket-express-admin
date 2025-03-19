import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import MatchDetails from "./pages/MatchDetails";
import NotFound from "./pages/NotFound";
import EmptyPage from "./pages/EmptyPage";
import BlogDetail from "./pages/BlogDetail";
import { AuthProvider } from "@/hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTournaments from "./pages/admin/Tournaments";
import AdminTeams from "./pages/admin/Teams";
import AdminPlayers from "./pages/admin/Players";
import AdminMatches from "./pages/admin/Matches";
import AdminPages from "./pages/admin/Pages";
import AdminUsers from "./pages/admin/Users";
import AdminNews from "./pages/admin/News";
import AdminLayout from "@/components/admin/AdminLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/match/:id" element={<MatchDetails />} />
              <Route path="/news/:id" element={<BlogDetail />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="tournaments" element={<AdminTournaments />} />
                <Route path="teams" element={<AdminTeams />} />
                <Route path="players" element={<AdminPlayers />} />
                <Route path="matches" element={<AdminMatches />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="news" element={<AdminNews />} />
              </Route>
              
              {/* Main Navigation Routes */}
              <Route path="/matches" element={
                <EmptyPage 
                  title="All Cricket Matches" 
                  description="View all ongoing and upcoming cricket matches across formats. This page is WordPress-powered, allowing editors to add match previews, highlights, and commentary."
                />
              } />
              <Route path="/ipl-2025" element={
                <EmptyPage 
                  title="IPL 2025" 
                  description="Follow the latest news, standings, and match updates from the Indian Premier League 2025 season. Content is managed through the WordPress backend."
                />
              } />
              <Route path="/news" element={
                <EmptyPage 
                  title="Cricket News" 
                  description="Stay updated with the latest cricket news from around the world. All content is manageable through the WordPress interface."
                />
              } />
              <Route path="/wpl-2025" element={
                <EmptyPage 
                  title="Women's Premier League 2025" 
                  description="Follow the WPL 2025 with matches, news, and player updates. Content editors can update this page through WordPress."
                />
              } />
              <Route path="/series/world-cup" element={
                <EmptyPage 
                  title="Cricket World Cup" 
                  description="Follow the ICC Cricket World Cup with fixtures, results, and standings. All content is managed through WordPress."
                />
              } />
              <Route path="/photos" element={
                <EmptyPage 
                  title="Cricket Photos" 
                  description="View the latest cricket photos from matches and events. Media is uploadable through the WordPress media library."
                />
              } />
              <Route path="/videos" element={
                <EmptyPage 
                  title="Cricket Videos" 
                  description="Watch highlights, interviews, and analysis videos. Video content is manageable through WordPress."
                />
              } />
              <Route path="/rankings" element={
                <EmptyPage 
                  title="ICC Rankings" 
                  description="View the latest ICC rankings for teams and players across formats. This data can be updated via WordPress."
                />
              } />
              
              {/* Secondary Navigation Routes */}
              <Route path="/india-mens-fixtures" element={
                <EmptyPage 
                  title="India Men's Fixtures" 
                  description="View upcoming and recent matches for the Indian men's cricket team. Fixture information is managed through WordPress."
                />
              } />
              <Route path="/india-womens-fixtures" element={
                <EmptyPage 
                  title="India Women's Fixtures" 
                  description="View upcoming and recent matches for the Indian women's cricket team. Fixture information is managed through WordPress."
                />
              } />
              <Route path="/ask-cricinfo" element={
                <EmptyPage 
                  title="Ask CricketExpress" 
                  description="Get answers to your cricket questions. This interactive feature is integrated with WordPress content management."
                />
              } />
              <Route path="/icc-team-rankings" element={
                <EmptyPage 
                  title="ICC Team Rankings" 
                  description="View the latest ICC rankings for international cricket teams. Rankings are updatable through WordPress."
                />
              } />
              <Route path="/icc-player-rankings" element={
                <EmptyPage 
                  title="ICC Player Rankings" 
                  description="View the latest ICC rankings for international cricket players. Player data is managed through WordPress."
                />
              } />
              <Route path="/writers" element={
                <EmptyPage 
                  title="CricketExpress Writers" 
                  description="Meet our team of cricket writers and experts. Writer profiles are managed through WordPress user accounts."
                />
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

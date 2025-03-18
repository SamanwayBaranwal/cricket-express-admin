import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ListChecks, Newspaper, Shield, TrendingUp, Trophy, Users, PlaySquare } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminService, useAdminStore } from "@/services/adminService";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Get data from admin store
  const tournaments = useAdminStore((state) => state.tournaments);
  const teams = useAdminStore((state) => state.teams);
  const players = useAdminStore((state) => state.players);
  const matches = useAdminStore((state) => state.matches);
  const activities = useAdminStore((state) => state.activities);
  
  // Calculate dashboard metrics
  const activeTournaments = tournaments.filter(t => t.status === "Upcoming" || t.status === "Ongoing").length;
  const liveMatches = matches.filter(m => m.status === "Live").length;
  const totalTeams = teams.length;
  const registeredPlayers = players.length;
  
  // Get upcoming matches
  const upcomingMatches = adminService.getUpcomingMatches(3);
  
  // Get recent activities
  const recentActivities = adminService.getRecentActivities(3);

  // Redirect if not logged in or not an admin
  React.useEffect(() => {
    if (!user || !isAdmin()) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.name}
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeTournaments}</div>
                  <p className="text-xs text-muted-foreground">
                    {activeTournaments > 3 ? "+2 from last month" : "Same as last month"}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Live Matches</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{liveMatches}</div>
                  <p className="text-xs text-muted-foreground">
                    {liveMatches > 0 ? "+1 from yesterday" : "No live matches today"}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Teams</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTeams}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalTeams > teams.length - 2 ? `+${totalTeams - (teams.length - 2)} from last month` : "Same as last month"}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Players</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{registeredPlayers}</div>
                  <p className="text-xs text-muted-foreground">
                    {registeredPlayers > 10 ? "+3 from last month" : "Same as last month"}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Upcoming Matches</CardTitle>
                  <CardDescription>
                    Matches scheduled for the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMatches.length > 0 ? (
                      upcomingMatches.map((match) => (
                        <div key={match.id} className="flex items-center">
                          <div className="w-1/4">
                            <p className="text-sm font-medium">{format(new Date(match.date), 'MMM dd, HH:mm')}</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{match.team1Name} vs {match.team2Name}</p>
                            <p className="text-sm text-muted-foreground">{match.tournamentName}</p>
                          </div>
                          <div className="w-1/4 text-right">
                            <p className="text-sm font-medium">{match.venue.split(',')[0]}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No upcoming matches scheduled.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Recent changes and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        {activity.type === 'tournament' && <Trophy className="h-5 w-5 text-muted-foreground" />}
                        {activity.type === 'team' && <Shield className="h-5 w-5 text-muted-foreground" />}
                        {activity.type === 'player' && <Users className="h-5 w-5 text-muted-foreground" />}
                        {activity.type === 'match' && <PlaySquare className="h-5 w-5 text-muted-foreground" />}
                        {activity.type === 'news' && <Newspaper className="h-5 w-5 text-muted-foreground" />}
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(activity.timestamp), 'MMM dd, HH:mm')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
                <CardDescription>
                  User traffic and engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics dashboard content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and view reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reports dashboard content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  System notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Notifications dashboard content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

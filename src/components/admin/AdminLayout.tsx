import React, { ReactNode } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Calendar,
  Home,
  Newspaper,
  Settings,
  Shield,
  Trophy,
  Users,
  LogOut,
  ChevronDown,
  PlaySquare,
  FileText,
  UserCog,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Redirect if not logged in or not an admin
  React.useEffect(() => {
    if (!user || !isAdmin()) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="grid lg:grid-cols-5">
      {/* Sidebar */}
      <aside className="lg:col-span-1 border-r bg-background h-screen sticky top-0">
        <div className="h-full px-4 py-6 lg:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-6 w-6" />
            <span className="font-semibold">Cricket Express Admin</span>
          </div>
          <nav className="space-y-2">
            <Link
              to="/admin"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/tournaments"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin/tournaments" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Tournaments</span>
            </Link>
            <Link
              to="/admin/teams"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin/teams" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Teams</span>
            </Link>
            <Link
              to="/admin/players"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin/players" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Players</span>
            </Link>
            <Link
              to="/admin/matches"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin/matches" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <PlaySquare className="h-4 w-4" />
              <span>Matches</span>
            </Link>
            <Link
              to="/admin/news"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin/news" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <Newspaper className="h-4 w-4" />
              <span>News & Articles</span>
            </Link>
            <Link
              to="/admin/pages"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin/pages" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Pages</span>
            </Link>
            <Link
              to="/admin/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                location.pathname === "/admin/users" ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <UserCog className="h-4 w-4" />
              <span>User Management</span>
            </Link>
          </nav>
          {/* User Menu */}
          <div className="mt-auto pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span>{user?.name}</span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="col-span-3 lg:col-span-4 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Tournament {
  id: string;
  name: string;
  format: string;
  startDate: Date;
  endDate: Date;
  teams: number;
  status: string;
  featured: boolean;
  description: string;
  location?: string;
  logo?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  tournament: string;
  coach: string;
  captain: string;
  homeGround: string;
  logo: string;
  playerCount: number;
  description: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  country: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  age: number;
  image: string;
  statistics: {
    matches: number;
    runs: number;
    wickets: number;
    average: number;
    strikeRate: number;
  };
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  team1Id: string;
  team1Name: string;
  team2Id: string;
  team2Name: string;
  venue: string;
  date: Date;
  status: string;
  type: string;
  score1: string;
  score2: string;
  result: string;
  featured: boolean;
  matchNumber?: string;
}

export interface PageSection {
  id: string;
  type: 'text' | 'image' | 'video' | 'team-grid' | 'tournament-details' | 'live-scores';
  content: any;
  layout?: 'circle' | 'rectangle';
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  sections: PageSection[];
  navbarPosition?: number;
  showInNavbar: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Initial mock data
const initialTournaments: Tournament[] = [
  {
    id: "1",
    name: "IPL 2025",
    format: "T20",
    startDate: new Date("2025-03-22"),
    endDate: new Date("2025-05-29"),
    teams: 10,
    status: "Upcoming",
    featured: true,
    description: "The 18th season of the Indian Premier League",
  },
  {
    id: "2",
    name: "WPL 2025",
    format: "T20",
    startDate: new Date("2025-02-15"),
    endDate: new Date("2025-03-10"),
    teams: 6,
    status: "Completed",
    featured: true,
    description: "The 3rd season of the Women's Premier League",
  },
  {
    id: "3",
    name: "ICC World Cup 2027",
    format: "ODI",
    startDate: new Date("2027-02-10"),
    endDate: new Date("2027-03-25"),
    teams: 10,
    status: "Upcoming",
    featured: true,
    description: "The 14th edition of the Cricket World Cup",
  },
  {
    id: "4",
    name: "T20 World Cup 2026",
    format: "T20",
    startDate: new Date("2026-06-04"),
    endDate: new Date("2026-06-30"),
    teams: 20,
    status: "Upcoming",
    featured: false,
    description: "The 10th edition of the ICC T20 World Cup",
  },
  {
    id: "5",
    name: "Border-Gavaskar Trophy 2025-26",
    format: "Test",
    startDate: new Date("2025-12-10"),
    endDate: new Date("2026-01-20"),
    teams: 2,
    status: "Upcoming",
    featured: true,
    description: "Test cricket series between India and Australia",
  },
];

const initialTeams: Team[] = [
  {
    id: "1",
    name: "Mumbai Indians",
    shortName: "MI",
    tournament: "IPL 2025",
    coach: "Mahela Jayawardene",
    captain: "Rohit Sharma",
    homeGround: "Wankhede Stadium, Mumbai",
    logo: "/teams/mi.png",
    playerCount: 25,
    description: "Five-time IPL champions",
  },
  {
    id: "2",
    name: "Chennai Super Kings",
    shortName: "CSK",
    tournament: "IPL 2025",
    coach: "Stephen Fleming",
    captain: "MS Dhoni",
    homeGround: "MA Chidambaram Stadium, Chennai",
    logo: "/teams/csk.png",
    playerCount: 24,
    description: "Four-time IPL champions",
  },
  {
    id: "3",
    name: "Royal Challengers Bengaluru",
    shortName: "RCB",
    tournament: "IPL 2025",
    coach: "Andy Flower",
    captain: "Faf du Plessis",
    homeGround: "M. Chinnaswamy Stadium, Bengaluru",
    logo: "/teams/rcb.png",
    playerCount: 23,
    description: "One of the most popular teams in IPL",
  },
  {
    id: "4",
    name: "Delhi Capitals",
    shortName: "DC",
    tournament: "IPL 2025",
    coach: "Ricky Ponting",
    captain: "Rishabh Pant",
    homeGround: "Arun Jaitley Stadium, Delhi",
    logo: "/teams/dc.png",
    playerCount: 22,
    description: "Formerly known as Delhi Daredevils",
  },
  {
    id: "5",
    name: "Australia",
    shortName: "AUS",
    tournament: "ICC World Cup 2027",
    coach: "Andrew McDonald",
    captain: "Pat Cummins",
    homeGround: "Melbourne Cricket Ground",
    logo: "/teams/aus.png",
    playerCount: 20,
    description: "Five-time World Cup champions",
  },
];

const initialPlayers: Player[] = [
  {
    id: "1",
    name: "Rohit Sharma",
    team: "Mumbai Indians",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    age: 38,
    image: "/players/rohit.png",
    statistics: {
      matches: 230,
      runs: 6500,
      wickets: 15,
      average: 31.5,
      strikeRate: 135.2,
    },
  },
  {
    id: "2",
    name: "MS Dhoni",
    team: "Chennai Super Kings",
    country: "India",
    role: "Wicket-keeper",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    age: 43,
    image: "/players/dhoni.png",
    statistics: {
      matches: 250,
      runs: 5200,
      wickets: 0,
      average: 38.8,
      strikeRate: 140.5,
    },
  },
  {
    id: "3",
    name: "Virat Kohli",
    team: "Royal Challengers Bengaluru",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    age: 36,
    image: "/players/kohli.png",
    statistics: {
      matches: 235,
      runs: 7500,
      wickets: 4,
      average: 42.5,
      strikeRate: 130.8,
    },
  },
  {
    id: "4",
    name: "Jasprit Bumrah",
    team: "Mumbai Indians",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    age: 31,
    image: "/players/bumrah.png",
    statistics: {
      matches: 120,
      runs: 180,
      wickets: 170,
      average: 21.5,
      strikeRate: 120.3,
    },
  },
  {
    id: "5",
    name: "Pat Cummins",
    team: "Australia",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    age: 32,
    image: "/players/cummins.png",
    statistics: {
      matches: 110,
      runs: 480,
      wickets: 150,
      average: 24.8,
      strikeRate: 110.5,
    },
  },
];

const initialMatches: Match[] = [
  {
    id: "1",
    tournamentId: "1",
    tournamentName: "IPL 2025",
    team1Id: "1",
    team1Name: "Mumbai Indians",
    team2Id: "2",
    team2Name: "Chennai Super Kings",
    venue: "Wankhede Stadium, Mumbai",
    date: new Date("2025-03-25T19:30:00"),
    status: "Upcoming",
    type: "T20",
    score1: "",
    score2: "",
    result: "",
    featured: true,
  },
  {
    id: "2",
    tournamentId: "1",
    tournamentName: "IPL 2025",
    team1Id: "3",
    team1Name: "Royal Challengers Bengaluru",
    team2Id: "4",
    team2Name: "Delhi Capitals",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-03-27T19:30:00"),
    status: "Upcoming",
    type: "T20",
    score1: "",
    score2: "",
    result: "",
    featured: true,
  },
  {
    id: "3",
    tournamentId: "5",
    tournamentName: "Border-Gavaskar Trophy 2025-26",
    team1Id: "5",
    team1Name: "Australia",
    team2Id: "6",
    team2Name: "India",
    venue: "Melbourne Cricket Ground",
    date: new Date("2025-12-26T10:30:00"),
    status: "Scheduled",
    type: "Test",
    score1: "",
    score2: "",
    result: "",
    featured: true,
  },
  {
    id: "4",
    tournamentId: "1",
    tournamentName: "IPL 2025",
    team1Id: "1",
    team1Name: "Mumbai Indians",
    team2Id: "3",
    team2Name: "Royal Challengers Bengaluru",
    venue: "Wankhede Stadium, Mumbai",
    date: new Date("2025-04-02T19:30:00"),
    status: "Upcoming",
    type: "T20",
    score1: "",
    score2: "",
    result: "",
    featured: false,
  },
  {
    id: "5",
    tournamentId: "2",
    tournamentName: "WPL 2025",
    team1Id: "7",
    team1Name: "Mumbai Indians Women",
    team2Id: "8",
    team2Name: "Delhi Capitals Women",
    venue: "Brabourne Stadium, Mumbai",
    date: new Date("2025-02-25T15:30:00"),
    status: "Completed",
    type: "T20",
    score1: "165/5",
    score2: "142/8",
    result: "Mumbai Indians Women won by 23 runs",
    featured: true,
  },
];

const initialCustomPages: CustomPage[] = [];

const initialActivities: any[] = [
  {
    id: "1",
    type: "tournament",
    description: "IPL 2025 schedule updated",
    timestamp: new Date("2025-03-15T10:30:00"),
  },
  {
    id: "2",
    type: "team",
    description: "Mumbai Indians roster updated",
    timestamp: new Date("2025-03-10T14:45:00"),
  },
  {
    id: "3",
    type: "player",
    description: "Rohit Sharma profile updated",
    timestamp: new Date("2025-03-08T09:15:00"),
  },
];

// Create store types
interface AdminStore {
  tournaments: Tournament[];
  teams: Team[];
  players: Player[];
  matches: Match[];
  customPages: CustomPage[];
  activities: any[];
  
  // Tournament actions
  addTournament: (tournament: Omit<Tournament, "id">) => void;
  updateTournament: (tournament: Tournament) => void;
  deleteTournament: (id: string) => void;
  
  // Team actions
  addTeam: (team: Omit<Team, "id">) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (id: string) => void;
  
  // Player actions
  addPlayer: (player: Omit<Player, "id">) => void;
  updatePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
  
  // Match actions
  addMatch: (match: Omit<Match, "id">) => void;
  updateMatch: (match: Match) => void;
  deleteMatch: (id: string) => void;
  
  // Custom Page actions
  addCustomPage: (page: Omit<CustomPage, "id" | "createdAt" | "updatedAt">) => void;
  updateCustomPage: (id: string, updates: Partial<CustomPage>) => void;
  deleteCustomPage: (id: string) => void;
  
  // Helper functions
  getTournamentById: (id: string) => Tournament | undefined;
  getTeamById: (id: string) => Team | undefined;
  getPlayerById: (id: string) => Player | undefined;
  getMatchById: (id: string) => Match | undefined;
  getCustomPageById: (id: string) => CustomPage | undefined;
  getTeamsByTournament: (tournamentId: string) => Team[];
  getUpcomingMatches: (limit?: number) => Match[];
  getRecentActivities: (limit?: number) => any[];
}

// Create the store
export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      tournaments: initialTournaments,
      teams: initialTeams,
      players: initialPlayers,
      matches: initialMatches,
      customPages: initialCustomPages,
      activities: initialActivities,
      
      // Tournament actions
      addTournament: (tournament) => {
        const id = Date.now().toString();
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "tournament",
            description: `New tournament "${tournament.name}" added`,
            timestamp: new Date(),
          };
          
          return {
            tournaments: [...state.tournaments, { ...tournament, id }],
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      updateTournament: (tournament) => {
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "tournament",
            description: `Tournament "${tournament.name}" updated`,
            timestamp: new Date(),
          };
          
          return {
            tournaments: state.tournaments.map((t) => 
              t.id === tournament.id ? tournament : t
            ),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      deleteTournament: (id) => {
        set((state) => {
          const tournament = state.tournaments.find((t) => t.id === id);
          if (!tournament) return state;
          
          const newActivity = {
            id: Date.now().toString(),
            type: "tournament",
            description: `Tournament "${tournament.name}" deleted`,
            timestamp: new Date(),
          };
          
          return {
            tournaments: state.tournaments.filter((t) => t.id !== id),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      // Team actions
      addTeam: (team) => {
        const id = Date.now().toString();
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "team",
            description: `New team "${team.name}" added`,
            timestamp: new Date(),
          };
          
          return {
            teams: [...state.teams, { ...team, id }],
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      updateTeam: (team) => {
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "team",
            description: `Team "${team.name}" updated`,
            timestamp: new Date(),
          };
          
          return {
            teams: state.teams.map((t) => 
              t.id === team.id ? team : t
            ),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      deleteTeam: (id) => {
        set((state) => {
          const team = state.teams.find((t) => t.id === id);
          if (!team) return state;
          
          const newActivity = {
            id: Date.now().toString(),
            type: "team",
            description: `Team "${team.name}" deleted`,
            timestamp: new Date(),
          };
          
          return {
            teams: state.teams.filter((t) => t.id !== id),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      // Player actions
      addPlayer: (player) => {
        const id = Date.now().toString();
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "player",
            description: `New player "${player.name}" added`,
            timestamp: new Date(),
          };
          
          return {
            players: [...state.players, { ...player, id }],
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      updatePlayer: (player) => {
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "player",
            description: `Player "${player.name}" updated`,
            timestamp: new Date(),
          };
          
          return {
            players: state.players.map((p) => 
              p.id === player.id ? player : p
            ),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      deletePlayer: (id) => {
        set((state) => {
          const player = state.players.find((p) => p.id === id);
          if (!player) return state;
          
          const newActivity = {
            id: Date.now().toString(),
            type: "player",
            description: `Player "${player.name}" deleted`,
            timestamp: new Date(),
          };
          
          return {
            players: state.players.filter((p) => p.id !== id),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      // Match actions
      addMatch: (match) => {
        const id = Date.now().toString();
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "match",
            description: `New match "${match.team1Name} vs ${match.team2Name}" added`,
            timestamp: new Date(),
          };
          
          return {
            matches: [...state.matches, { ...match, id }],
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      updateMatch: (match) => {
        set((state) => {
          const newActivity = {
            id: Date.now().toString(),
            type: "match",
            description: `Match "${match.team1Name} vs ${match.team2Name}" updated`,
            timestamp: new Date(),
          };
          
          return {
            matches: state.matches.map((m) => 
              m.id === match.id ? match : m
            ),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      deleteMatch: (id) => {
        set((state) => {
          const match = state.matches.find((m) => m.id === id);
          if (!match) return state;
          
          const newActivity = {
            id: Date.now().toString(),
            type: "match",
            description: `Match "${match.team1Name} vs ${match.team2Name}" deleted`,
            timestamp: new Date(),
          };
          
          return {
            matches: state.matches.filter((m) => m.id !== id),
            activities: [newActivity, ...state.activities],
          };
        });
      },
      
      // Custom Page actions
      addCustomPage: (page) => {
        const newPage: CustomPage = {
          ...page,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        set((state) => ({
          customPages: [...state.customPages, newPage],
          activities: [
            { id: Date.now().toString(), type: 'create', entity: 'page', name: page.title, timestamp: new Date() },
            ...state.activities
          ]
        }));
      },
      
      updateCustomPage: (id, updates) => {
        set((state) => ({
          customPages: state.customPages.map((page) =>
            page.id === id ? { ...page, ...updates, updatedAt: new Date() } : page
          ),
          activities: [
            { id: Date.now().toString(), type: 'update', entity: 'page', name: updates.title || '', timestamp: new Date() },
            ...state.activities
          ]
        }));
      },
      
      deleteCustomPage: (id) => {
        set((state) => ({
          customPages: state.customPages.filter((page) => page.id !== id),
          activities: [
            { id: Date.now().toString(), type: 'delete', entity: 'page', name: '', timestamp: new Date() },
            ...state.activities
          ]
        }));
      },
      
      // Helper functions
      getTournamentById: (id) => {
        return get().tournaments.find((t) => t.id === id);
      },
      
      getTeamById: (id) => {
        return get().teams.find((t) => t.id === id);
      },
      
      getPlayerById: (id) => {
        return get().players.find((p) => p.id === id);
      },
      
      getMatchById: (id) => {
        return get().matches.find((m) => m.id === id);
      },
      
      getCustomPageById: (id) => {
        return get().customPages.find((p) => p.id === id);
      },
      
      getTeamsByTournament: (tournamentId) => {
        const tournament = get().tournaments.find((t) => t.id === tournamentId);
        if (!tournament) return [];
        
        return get().teams.filter((team) => team.tournament === tournament.name);
      },
      
      getUpcomingMatches: (limit = 5) => {
        return get().matches
          .filter((match) => match.status === "Upcoming")
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, limit);
      },
      
      getRecentActivities: (limit = 5) => {
        return get().activities
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, limit);
      },
    }),
    {
      name: 'cricket-express-admin-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str, (key, value) => {
            if (value && typeof value === 'object' && value.__date) {
              return new Date(value.__date);
            }
            return value;
          });
        },
        setItem: (name, value) => {
          const str = JSON.stringify(value, (key, val) => {
            if (val instanceof Date) {
              return { __date: val.toISOString() };
            }
            return val;
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

// Export singleton instance
export const adminService = {
  // Tournament methods
  getTournaments: () => useAdminStore.getState().tournaments,
  addTournament: useAdminStore.getState().addTournament,
  updateTournament: useAdminStore.getState().updateTournament,
  deleteTournament: useAdminStore.getState().deleteTournament,
  getTournamentById: useAdminStore.getState().getTournamentById,
  
  // Team methods
  getTeams: () => useAdminStore.getState().teams,
  addTeam: useAdminStore.getState().addTeam,
  updateTeam: useAdminStore.getState().updateTeam,
  deleteTeam: useAdminStore.getState().deleteTeam,
  getTeamById: useAdminStore.getState().getTeamById,
  getTeamsByTournament: useAdminStore.getState().getTeamsByTournament,
  
  // Player methods
  getPlayers: () => useAdminStore.getState().players,
  addPlayer: useAdminStore.getState().addPlayer,
  updatePlayer: useAdminStore.getState().updatePlayer,
  deletePlayer: useAdminStore.getState().deletePlayer,
  getPlayerById: useAdminStore.getState().getPlayerById,
  
  // Match methods
  getMatches: () => useAdminStore.getState().matches,
  addMatch: useAdminStore.getState().addMatch,
  updateMatch: useAdminStore.getState().updateMatch,
  deleteMatch: useAdminStore.getState().deleteMatch,
  getMatchById: useAdminStore.getState().getMatchById,
  getUpcomingMatches: useAdminStore.getState().getUpcomingMatches,
  
  // Custom Page methods
  getCustomPages: () => useAdminStore.getState().customPages,
  addCustomPage: useAdminStore.getState().addCustomPage,
  updateCustomPage: useAdminStore.getState().updateCustomPage,
  deleteCustomPage: useAdminStore.getState().deleteCustomPage,
  getCustomPageById: useAdminStore.getState().getCustomPageById,
  
  // Activity methods
  getRecentActivities: useAdminStore.getState().getRecentActivities,
};

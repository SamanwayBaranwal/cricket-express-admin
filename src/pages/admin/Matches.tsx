import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminStore, Match, Team, Tournament } from "@/services/adminService";
import { format, isDate } from "date-fns";

export default function AdminMatches() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Use admin store for data
  const matches = useAdminStore((state) => state.matches);
  const teams = useAdminStore((state) => state.teams);
  const tournaments = useAdminStore((state) => state.tournaments);
  const addMatch = useAdminStore((state) => state.addMatch);
  const updateMatch = useAdminStore((state) => state.updateMatch);
  const deleteMatch = useAdminStore((state) => state.deleteMatch);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tournamentFilter, setTournamentFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  type MatchFormData = Omit<Match, 'id'> & {
    matchNumber?: string;
  };

  // Form states
  const [formData, setFormData] = useState<MatchFormData>({
    tournamentId: "",
    tournamentName: "",
    type: "T20",
    team1Id: "",
    team1Name: "",
    score1: "",
    team2Id: "",
    team2Name: "",
    score2: "",
    venue: "",
    date: new Date(),
    status: "Scheduled",
    result: "",
    featured: false,
    matchNumber: "",
  });

  // Redirect if not logged in or not an admin
  React.useEffect(() => {
    if (!user || !isAdmin()) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  const filteredMatches = matches.filter((match) => {
    const matchesSearch = 
      match.team1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTournament = tournamentFilter ? match.tournamentId === tournamentFilter : true;
    const matchesStatus = statusFilter ? match.status === statusFilter : true;
    
    return matchesSearch && matchesTournament && matchesStatus;
  });

  const handleAddMatch = () => {
    const tournament = tournaments.find(t => t.id === formData.tournamentId);
    const team1 = teams.find(t => t.id === formData.team1Id);
    const team2 = teams.find(t => t.id === formData.team2Id);
    
    const newMatch = {
      ...formData,
      tournamentName: tournament ? tournament.name : "",
      team1Name: team1 ? team1.name : "",
      team2Name: team2 ? team2.name : "",
      date: formData.date instanceof Date ? formData.date : new Date(formData.date),
    };
    
    addMatch(newMatch);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditMatch = () => {
    const tournament = tournaments.find(t => t.id === formData.tournamentId);
    const team1 = teams.find(t => t.id === formData.team1Id);
    const team2 = teams.find(t => t.id === formData.team2Id);
    
    const updatedMatch = {
      ...selectedMatch,
      ...formData,
      tournamentName: tournament ? tournament.name : selectedMatch.tournamentName,
      team1Name: team1 ? team1.name : selectedMatch.team1Name,
      team2Name: team2 ? team2.name : selectedMatch.team2Name,
      date: formData.date instanceof Date ? formData.date : new Date(formData.date),
    };
    
    updateMatch(updatedMatch);
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteMatch = () => {
    deleteMatch(selectedMatch.id);
    setIsDeleteDialogOpen(false);
    setSelectedMatch(null);
  };

  const resetForm = () => {
    setFormData({
      tournamentId: "",
      tournamentName: "",
      type: "T20",
      team1Id: "",
      team1Name: "",
      score1: "",
      team2Id: "",
      team2Name: "",
      score2: "",
      venue: "",
      date: new Date(),
      status: "Scheduled",
      result: "",
      featured: false,
      matchNumber: "",
    });
  };

  const openEditDialog = (match: Match) => {
    setSelectedMatch(match);
    setFormData({
      tournamentId: match.tournamentId,
      tournamentName: match.tournamentName,
      type: match.type || "T20",
      team1Id: match.team1Id,
      team1Name: match.team1Name,
      score1: match.score1 || "",
      team2Id: match.team2Id,
      team2Name: match.team2Name,
      score2: match.score2 || "",
      venue: match.venue,
      date: new Date(match.date),
      status: match.status,
      result: match.result || "",
      featured: match.featured || false,
      matchNumber: match.matchNumber || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (match: Match) => {
    setSelectedMatch(match);
    setIsDeleteDialogOpen(true);
  };

  const formatDate = (dateValue: Date | string) => {
    if (!dateValue) return '';
    
    if (isDate(dateValue)) {
      return format(dateValue, "MMM d, yyyy");
    } else {
      return format(new Date(dateValue), "MMM d, yyyy");
    }
  };

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Match Management</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Match
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Match</DialogTitle>
                <DialogDescription>
                  Create a new match with teams, venue, and schedule information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tournamentId">Tournament</Label>
                    <Select
                      value={formData.tournamentId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, tournamentId: value })
                      }
                    >
                      <SelectTrigger id="tournamentId">
                        <SelectValue placeholder="Select tournament" />
                      </SelectTrigger>
                      <SelectContent>
                        {tournaments.map((tournament) => (
                          <SelectItem key={tournament.id} value={tournament.id}>
                            {tournament.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matchNumber">Match Number/Title</Label>
                    <Input
                      id="matchNumber"
                      value={formData.matchNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, matchNumber: e.target.value })
                      }
                      placeholder="e.g. Match 1, Final, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team1Id">Team 1</Label>
                    <Select
                      value={formData.team1Id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, team1Id: value })
                      }
                    >
                      <SelectTrigger id="team1Id">
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team2Id">Team 2</Label>
                    <Select
                      value={formData.team2Id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, team2Id: value })
                      }
                    >
                      <SelectTrigger id="team2Id">
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    placeholder="e.g. Wankhede Stadium, Mumbai"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date & Time</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date instanceof Date ? formData.date.toISOString().slice(0, 16) : formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: new Date(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matchType">Match Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger id="matchType">
                        <SelectValue placeholder="Select match type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["T20", "ODI", "Test", "T10"].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Scheduled", "Live", "Completed"].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.status !== "Scheduled" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="team1Score">Team 1 Score</Label>
                      <Input
                        id="team1Score"
                        value={formData.score1}
                        onChange={(e) =>
                          setFormData({ ...formData, score1: e.target.value })
                        }
                        placeholder="e.g. 186/4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team2Score">Team 2 Score</Label>
                      <Input
                        id="team2Score"
                        value={formData.score2}
                        onChange={(e) =>
                          setFormData({ ...formData, score2: e.target.value })
                        }
                        placeholder="e.g. 183/7"
                      />
                    </div>
                  </div>
                )}

                {formData.status === "Completed" && (
                  <div className="space-y-2">
                    <Label htmlFor="result">Match Result</Label>
                    <Input
                      id="result"
                      value={formData.result}
                      onChange={(e) =>
                        setFormData({ ...formData, result: e.target.value })
                      }
                      placeholder="e.g. Mumbai Indians won by 3 runs"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddMatch}>Add Match</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Match Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Match</DialogTitle>
              <DialogDescription>
                Update match details, scores, and results.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-tournamentId">Tournament</Label>
                  <Select
                    value={formData.tournamentId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, tournamentId: value })
                    }
                  >
                    <SelectTrigger id="edit-tournamentId">
                      <SelectValue placeholder="Select tournament" />
                    </SelectTrigger>
                    <SelectContent>
                      {tournaments.map((tournament) => (
                        <SelectItem key={tournament.id} value={tournament.id}>
                          {tournament.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-matchNumber">Match Number/Title</Label>
                  <Input
                    id="edit-matchNumber"
                    value={formData.matchNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, matchNumber: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-team1Id">Team 1</Label>
                  <Select
                    value={formData.team1Id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, team1Id: value })
                    }
                  >
                    <SelectTrigger id="edit-team1Id">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-team2Id">Team 2</Label>
                  <Select
                    value={formData.team2Id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, team2Id: value })
                    }
                  >
                    <SelectTrigger id="edit-team2Id">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-venue">Venue</Label>
                <Input
                  id="edit-venue"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date & Time</Label>
                  <Input
                    id="edit-date"
                    type="datetime-local"
                    value={formData.date instanceof Date ? formData.date.toISOString().slice(0, 16) : formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: new Date(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-matchType">Match Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger id="edit-matchType">
                      <SelectValue placeholder="Select match type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["T20", "ODI", "Test", "T10"].map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Scheduled", "Live", "Completed"].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.status !== "Scheduled" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-team1Score">Team 1 Score</Label>
                    <Input
                      id="edit-team1Score"
                      value={formData.score1}
                      onChange={(e) =>
                        setFormData({ ...formData, score1: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-team2Score">Team 2 Score</Label>
                    <Input
                      id="edit-team2Score"
                      value={formData.score2}
                      onChange={(e) =>
                        setFormData({ ...formData, score2: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {formData.status === "Completed" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-result">Match Result</Label>
                  <Input
                    id="edit-result"
                    value={formData.result}
                    onChange={(e) =>
                      setFormData({ ...formData, result: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditMatch}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Match Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the match "{selectedMatch?.tournamentName} - {selectedMatch?.matchNumber}"?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteMatch}>
                Delete Match
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Search and Filter */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search matches by team or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={tournamentFilter} onValueChange={setTournamentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tournament" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tournaments</SelectItem>
                {tournaments.map((tournament) => (
                  <SelectItem key={tournament.id} value={tournament.id}>
                    {tournament.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {["Scheduled", "Live", "Completed"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Match List */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Match Details</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No matches found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMatches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{match.tournamentName}</p>
                        <p className="text-xs text-muted-foreground">
                          {match.matchNumber || ""} • {match.type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center gap-2">
                          <p className="font-medium">{match.team1Name}</p>
                          <p className="text-sm">{match.score1}</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <p className="font-medium">{match.team2Name}</p>
                          <p className="text-sm">{match.score2}</p>
                        </div>
                        {match.result && (
                          <p className="text-xs italic text-muted-foreground">{match.result}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{match.venue}</TableCell>
                    <TableCell>{formatDate(match.date)}</TableCell>
                    <TableCell>
                      <div className={`
                        inline-block px-2 py-1 rounded-full text-xs font-medium
                        ${match.status === 'Live' ? 'bg-green-100 text-green-800' : ''}
                        ${match.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                        ${match.status === 'Completed' ? 'bg-gray-100 text-gray-800' : ''}
                      `}>
                        {match.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(match)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(match)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

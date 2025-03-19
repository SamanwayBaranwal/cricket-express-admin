import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useAdminStore, Team } from "@/services/adminService";

export default function AdminTeams() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Use admin store for data
  const teams = useAdminStore((state) => state.teams);
  const tournaments = useAdminStore((state) => state.tournaments);
  const addTeam = useAdminStore((state) => state.addTeam);
  const updateTeam = useAdminStore((state) => state.updateTeam);
  const deleteTeam = useAdminStore((state) => state.deleteTeam);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tournamentFilter, setTournamentFilter] = useState<string>("");

  // Form states
  const [formData, setFormData] = useState<Omit<Team, 'id'>>({
    name: "",
    shortName: "",
    tournament: "",
    coach: "",
    captain: "",
    homeGround: "",
    logo: "",
    playerCount: 0,
    description: "",
  });

  // Redirect if not logged in or not an admin
  React.useEffect(() => {
    if (!user || !isAdmin()) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTournament = tournamentFilter ? team.tournament === tournamentFilter : true;
    return matchesSearch && matchesTournament;
  });

  const handleAddTeam = () => {
    addTeam(formData);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditTeam = () => {
    updateTeam({ ...selectedTeam, ...formData });
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteTeam = () => {
    deleteTeam(selectedTeam.id);
    setIsDeleteDialogOpen(false);
    setSelectedTeam(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      shortName: "",
      tournament: "",
      coach: "",
      captain: "",
      homeGround: "",
      logo: "",
      playerCount: 0,
      description: "",
    });
  };

  const openEditDialog = (team: Team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      shortName: team.shortName,
      tournament: team.tournament,
      coach: team.coach,
      captain: team.captain,
      homeGround: team.homeGround,
      logo: team.logo,
      playerCount: team.playerCount,
      description: team.description,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteDialogOpen(true);
  };

  // Tournament options from store
  const tournamentOptions = tournaments.map((t) => ({
    id: t.id,
    name: t.name,
  }));

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Team
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Team</DialogTitle>
              <DialogDescription>
                Create a new team with details and settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Team Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Mumbai Indians"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortName">Short Name</Label>
                  <Input
                    id="shortName"
                    value={formData.shortName}
                    onChange={(e) =>
                      setFormData({ ...formData, shortName: e.target.value })
                    }
                    placeholder="e.g. MI"
                    maxLength={5}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tournament">Tournament</Label>
                <Select
                  value={formData.tournament}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tournament: value })
                  }
                >
                  <SelectTrigger id="tournament">
                    <SelectValue placeholder="Select tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournamentOptions.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.name}>
                        {tournament.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coach">Coach</Label>
                  <Input
                    id="coach"
                    value={formData.coach}
                    onChange={(e) =>
                      setFormData({ ...formData, coach: e.target.value })
                    }
                    placeholder="e.g. Rahul Dravid"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="captain">Captain</Label>
                  <Input
                    id="captain"
                    value={formData.captain}
                    onChange={(e) =>
                      setFormData({ ...formData, captain: e.target.value })
                    }
                    placeholder="e.g. Rohit Sharma"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeGround">Home Ground</Label>
                <Input
                  id="homeGround"
                  value={formData.homeGround}
                  onChange={(e) =>
                    setFormData({ ...formData, homeGround: e.target.value })
                  }
                  placeholder="e.g. Wankhede Stadium, Mumbai"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Team Logo URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.value })
                    }
                    placeholder="https://example.com/logo.png"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Team Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description about the team..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTeam}>Add Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
          <div className="grid gap-2">
            <Label htmlFor="search">Search Teams</Label>
            <Input
              id="search"
              placeholder="Search by team name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[250px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tournamentFilter">Filter by Tournament</Label>
            <Select
              value={tournamentFilter}
              onValueChange={setTournamentFilter}
            >
              <SelectTrigger id="tournamentFilter" className="w-[180px]">
                <SelectValue placeholder="All Tournaments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tournaments</SelectItem>
                {tournamentOptions.map((tournament) => (
                  <SelectItem key={tournament.id} value={tournament.name}>
                    {tournament.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Coach</TableHead>
                <TableHead>Captain</TableHead>
                <TableHead>Home Ground</TableHead>
                <TableHead>Players</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No teams found. Add a new team to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {team.logo && (
                          <img
                            src={team.logo}
                            alt={team.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div>{team.name}</div>
                          <div className="text-xs text-gray-500">
                            {team.shortName}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{team.tournament}</TableCell>
                    <TableCell>{team.coach}</TableCell>
                    <TableCell>{team.captain}</TableCell>
                    <TableCell>{team.homeGround}</TableCell>
                    <TableCell>{team.playerCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(team)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => openDeleteDialog(team)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update team details and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Team Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-shortName">Short Name</Label>
                <Input
                  id="edit-shortName"
                  value={formData.shortName}
                  onChange={(e) =>
                    setFormData({ ...formData, shortName: e.target.value })
                  }
                  maxLength={5}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tournament">Tournament</Label>
              <Select
                value={formData.tournament}
                onValueChange={(value) =>
                  setFormData({ ...formData, tournament: value })
                }
              >
                <SelectTrigger id="edit-tournament">
                  <SelectValue placeholder="Select tournament" />
                </SelectTrigger>
                <SelectContent>
                  {tournamentOptions.map((tournament) => (
                    <SelectItem key={tournament.id} value={tournament.name}>
                      {tournament.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-coach">Coach</Label>
                <Input
                  id="edit-coach"
                  value={formData.coach}
                  onChange={(e) =>
                    setFormData({ ...formData, coach: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-captain">Captain</Label>
                <Input
                  id="edit-captain"
                  value={formData.captain}
                  onChange={(e) =>
                    setFormData({ ...formData, captain: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-homeGround">Home Ground</Label>
              <Input
                id="edit-homeGround"
                value={formData.homeGround}
                onChange={(e) =>
                  setFormData({ ...formData, homeGround: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-logo">Team Logo URL</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-logo"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Team Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTeam}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this team? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeam}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


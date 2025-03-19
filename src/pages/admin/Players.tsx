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
import { Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useAdminStore, Player, Team } from "@/services/adminService";

export default function AdminPlayers() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Use admin store for data
  const players = useAdminStore((state) => state.players);
  const teams = useAdminStore((state) => state.teams);
  const addPlayer = useAdminStore((state) => state.addPlayer);
  const updatePlayer = useAdminStore((state) => state.updatePlayer);
  const deletePlayer = useAdminStore((state) => state.deletePlayer);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>("");

  // Form states
  const [formData, setFormData] = useState<Omit<Player, 'id'>>({
    name: "",
    team: "",
    country: "",
    role: "",
    battingStyle: "",
    bowlingStyle: "",
    age: 0,
    image: "",
    statistics: {
      matches: 0,
      runs: 0,
      wickets: 0,
      average: 0,
      strikeRate: 0,
    },
  });

  // Redirect if not logged in or not an admin
  React.useEffect(() => {
    if (!user || !isAdmin()) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = teamFilter ? player.team === teamFilter : true;
    return matchesSearch && matchesTeam;
  });

  const handleAddPlayer = () => {
    addPlayer(formData);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditPlayer = () => {
    updatePlayer({ ...selectedPlayer, ...formData });
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeletePlayer = () => {
    deletePlayer(selectedPlayer.id);
    setIsDeleteDialogOpen(false);
    setSelectedPlayer(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      team: "",
      country: "",
      role: "",
      battingStyle: "",
      bowlingStyle: "",
      age: 0,
      image: "",
      statistics: {
        matches: 0,
        runs: 0,
        wickets: 0,
        average: 0,
        strikeRate: 0,
      }
    });
  };

  const openEditDialog = (player: Player) => {
    setSelectedPlayer(player);
    setFormData({
      name: player.name,
      team: player.team,
      country: player.country,
      role: player.role,
      battingStyle: player.battingStyle,
      bowlingStyle: player.bowlingStyle,
      age: player.age,
      image: player.image,
      statistics: { ...player.statistics }
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (player: Player) => {
    setSelectedPlayer(player);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Player Management</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Player
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Player</DialogTitle>
                <DialogDescription>
                  Create a new player profile with details and statistics.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Player Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Virat Kohli"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Team</Label>
                    <Select
                      value={formData.team}
                      onValueChange={(value) =>
                        setFormData({ ...formData, team: value })
                      }
                    >
                      <SelectTrigger id="team">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      placeholder="e.g. India"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          age: parseInt(e.target.value),
                        })
                      }
                      placeholder="Player age"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Batsman", "Bowler", "All-rounder", "Wicket-keeper", "Wicket-keeper Batsman"].map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="battingStyle">Batting Style</Label>
                    <Input
                      id="battingStyle"
                      value={formData.battingStyle}
                      onChange={(e) =>
                        setFormData({ ...formData, battingStyle: e.target.value })
                      }
                      placeholder="e.g. Right-handed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bowlingStyle">Bowling Style</Label>
                    <Input
                      id="bowlingStyle"
                      value={formData.bowlingStyle}
                      onChange={(e) =>
                        setFormData({ ...formData, bowlingStyle: e.target.value })
                      }
                      placeholder="e.g. Right-arm fast"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Player Photo</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="/players/photo.png"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Player Statistics</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="matches">Matches</Label>
                      <Input
                        id="matches"
                        type="number"
                        value={formData.statistics.matches}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            statistics: {
                              ...formData.statistics,
                              matches: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="runs">Runs</Label>
                      <Input
                        id="runs"
                        type="number"
                        value={formData.statistics.runs}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            statistics: {
                              ...formData.statistics,
                              runs: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wickets">Wickets</Label>
                      <Input
                        id="wickets"
                        type="number"
                        value={formData.statistics.wickets}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            statistics: {
                              ...formData.statistics,
                              wickets: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="average">Average</Label>
                      <Input
                        id="average"
                        type="number"
                        value={formData.statistics.average}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            statistics: {
                              ...formData.statistics,
                              average: parseFloat(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="strikeRate">Strike Rate</Label>
                      <Input
                        id="strikeRate"
                        type="number"
                        value={formData.statistics.strikeRate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            statistics: {
                              ...formData.statistics,
                              strikeRate: parseFloat(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddPlayer}>Add Player</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Player Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Player</DialogTitle>
              <DialogDescription>
                Update player details and statistics.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Player Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-team">Team</Label>
                  <Select
                    value={formData.team}
                    onValueChange={(value) =>
                      setFormData({ ...formData, team: value })
                    }
                  >
                    <SelectTrigger id="edit-team">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-country">Country</Label>
                  <Input
                    id="edit-country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Batsman", "Bowler", "All-rounder", "Wicket-keeper", "Wicket-keeper Batsman"].map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-battingStyle">Batting Style</Label>
                  <Input
                    id="edit-battingStyle"
                    value={formData.battingStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, battingStyle: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-bowlingStyle">Bowling Style</Label>
                  <Input
                    id="edit-bowlingStyle"
                    value={formData.bowlingStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, bowlingStyle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image">Player Photo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="/players/photo.png"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Player Statistics</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-matches">Matches</Label>
                    <Input
                      id="edit-matches"
                      type="number"
                      value={formData.statistics.matches}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statistics: {
                            ...formData.statistics,
                            matches: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-runs">Runs</Label>
                    <Input
                      id="edit-runs"
                      type="number"
                      value={formData.statistics.runs}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statistics: {
                            ...formData.statistics,
                            runs: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-wickets">Wickets</Label>
                    <Input
                      id="edit-wickets"
                      type="number"
                      value={formData.statistics.wickets}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statistics: {
                            ...formData.statistics,
                            wickets: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-average">Average</Label>
                    <Input
                      id="edit-average"
                      type="number"
                      value={formData.statistics.average}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statistics: {
                            ...formData.statistics,
                            average: parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-strikeRate">Strike Rate</Label>
                    <Input
                      id="edit-strikeRate"
                      type="number"
                      value={formData.statistics.strikeRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statistics: {
                            ...formData.statistics,
                            strikeRate: parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditPlayer}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Player Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the player "{selectedPlayer?.name}"?
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
              <Button variant="destructive" onClick={handleDeletePlayer}>
                Delete Player
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Search and Filter */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Player List */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No players found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {player.image ? (
                            <img
                              src={player.image}
                              alt={player.name}
                              className="h-9 w-9 object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold">
                              {player.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Age: {player.age}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>{player.role}</TableCell>
                    <TableCell>{player.country}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p>M: {player.statistics.matches} | R: {player.statistics.runs}</p>
                        <p>W: {player.statistics.wickets} | Avg: {player.statistics.average}</p>
                        <p>SR: {player.statistics.strikeRate}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(player)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(player)}
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
  );
}


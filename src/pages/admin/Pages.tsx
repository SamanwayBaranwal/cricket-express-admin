import React, { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Image, Video, Type, Grid, Trophy, Activity } from "lucide-react";
import { useAdminStore, CustomPage, PageSection } from "@/services/adminService";

export default function AdminPages() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Get data from admin store
  const pages = useAdminStore((state) => state.customPages);
  const addPage = useAdminStore((state) => state.addCustomPage);
  const updatePage = useAdminStore((state) => state.updateCustomPage);
  const deletePage = useAdminStore((state) => state.deleteCustomPage);
  
  // UI states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<CustomPage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    showInNavbar: true,
    navbarPosition: 0,
    sections: [] as PageSection[]
  });
  
  // Section management
  const [currentSection, setCurrentSection] = useState<PageSection>({
    id: "",
    type: "text",
    content: "",
    layout: "rectangle"
  });
  
  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      showInNavbar: true,
      navbarPosition: 0,
      sections: []
    });
    setCurrentSection({
      id: "",
      type: "text",
      content: "",
      layout: "rectangle"
    });
  };
  
  // Add new section
  const addSection = () => {
    const newSection = {
      ...currentSection,
      id: Date.now().toString()
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setCurrentSection({
      id: "",
      type: "text",
      content: "",
      layout: "rectangle"
    });
  };
  
  // Remove section
  const removeSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (selectedPage) {
      updatePage(selectedPage.id, formData);
      setIsEditDialogOpen(false);
    } else {
      addPage(formData);
      setIsAddDialogOpen(false);
    }
    resetForm();
  };
  
  // Open edit dialog
  const openEditDialog = (page: CustomPage) => {
    setSelectedPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      showInNavbar: page.showInNavbar,
      navbarPosition: page.navbarPosition || 0,
      sections: page.sections
    });
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (page: CustomPage) => {
    setSelectedPage(page);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle delete
  const handleDelete = () => {
    if (selectedPage) {
      deletePage(selectedPage.id);
      setIsDeleteDialogOpen(false);
      setSelectedPage(null);
    }
  };

  // Redirect if not logged in or not an admin
  React.useEffect(() => {
    if (!user || !isAdmin()) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pages</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Page
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Pages Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>URL Slug</TableHead>
              <TableHead>Show in Navbar</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages
              .filter((page) =>
                page.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  <TableCell>
                    {page.showInNavbar ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(page)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteDialog(page)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedPage ? "Edit Page" : "Add New Page"}
            </DialogTitle>
            <DialogDescription>
              Create or edit a custom page. Add sections with different content types.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                />
              </div>
            </div>
            
            {/* Navigation Settings */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.showInNavbar}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, showInNavbar: checked })
                  }
                />
                <Label>Show in Navigation Bar</Label>
              </div>
              {formData.showInNavbar && (
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    type="number"
                    value={formData.navbarPosition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        navbarPosition: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20"
                  />
                </div>
              )}
            </div>
            
            {/* Sections */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Page Sections</h3>
              
              {/* Add Section Form */}
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Section Type</Label>
                  <Select
                    value={currentSection.type}
                    onValueChange={(value: any) =>
                      setCurrentSection({ ...currentSection, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">
                        <div className="flex items-center">
                          <Type className="h-4 w-4 mr-2" />
                          Text
                        </div>
                      </SelectItem>
                      <SelectItem value="image">
                        <div className="flex items-center">
                          <Image className="h-4 w-4 mr-2" />
                          Image
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          Video
                        </div>
                      </SelectItem>
                      <SelectItem value="team-grid">
                        <div className="flex items-center">
                          <Grid className="h-4 w-4 mr-2" />
                          Team Grid
                        </div>
                      </SelectItem>
                      <SelectItem value="tournament-details">
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-2" />
                          Tournament Details
                        </div>
                      </SelectItem>
                      <SelectItem value="live-scores">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2" />
                          Live Scores
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(currentSection.type === "image" || currentSection.type === "team-grid") && (
                  <div className="space-y-2">
                    <Label>Layout</Label>
                    <Select
                      value={currentSection.layout}
                      onValueChange={(value: any) =>
                        setCurrentSection({ ...currentSection, layout: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rectangle">Rectangle</SelectItem>
                        <SelectItem value="circle">Circle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="col-span-2 space-y-2">
                  <Label>Content</Label>
                  {currentSection.type === "text" ? (
                    <Textarea
                      value={currentSection.content}
                      onChange={(e) =>
                        setCurrentSection({
                          ...currentSection,
                          content: e.target.value,
                        })
                      }
                      placeholder="Enter text content..."
                    />
                  ) : (
                    <Input
                      value={currentSection.content}
                      onChange={(e) =>
                        setCurrentSection({
                          ...currentSection,
                          content: e.target.value,
                        })
                      }
                      placeholder={
                        currentSection.type === "image"
                          ? "Enter image URL..."
                          : currentSection.type === "video"
                          ? "Enter video URL..."
                          : "Enter content ID..."
                      }
                    />
                  )}
                </div>
                
                <div className="col-span-2">
                  <Button onClick={addSection} className="w-full">
                    Add Section
                  </Button>
                </div>
              </div>
              
              {/* Section List */}
              <div className="space-y-2">
                {formData.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      {section.type === "text" && <Type className="h-4 w-4" />}
                      {section.type === "image" && <Image className="h-4 w-4" />}
                      {section.type === "video" && <Video className="h-4 w-4" />}
                      {section.type === "team-grid" && <Grid className="h-4 w-4" />}
                      {section.type === "tournament-details" && (
                        <Trophy className="h-4 w-4" />
                      )}
                      {section.type === "live-scores" && (
                        <Activity className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {section.type.charAt(0).toUpperCase() +
                          section.type.slice(1)}{" "}
                        Section
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {selectedPage ? "Save Changes" : "Create Page"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this page? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

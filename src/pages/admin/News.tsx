import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  FileText, 
  MoreHorizontal, 
  Search, 
  Plus, 
  RefreshCw, 
  Trash2, 
  Edit, 
  Eye 
} from "lucide-react";
import TipTapEditor from "@/components/editor/TipTapEditor";

// Mock data for articles
const MOCK_ARTICLES = [
  {
    id: "1",
    title: "India Wins T20 World Cup in Dramatic Final",
    slug: "india-wins-t20-world-cup",
    excerpt: "India clinches the T20 World Cup after a nail-biting super over against Australia.",
    content: "<p>In a thrilling finale to the T20 World Cup, India emerged victorious against Australia after a nail-biting super over. The match, played at the iconic Melbourne Cricket Ground, saw both teams tied at 180 runs after their allotted 20 overs.</p><p>Virat Kohli was named Player of the Match for his stellar 92 not out, while Jasprit Bumrah's economical bowling in the super over sealed the deal for India.</p>",
    category: "tournaments",
    tags: ["t20-world-cup", "india", "australia"],
    author: "Harsha Bhogle",
    status: "published",
    featuredImage: "https://placehold.co/600x400/png",
    publishedAt: "2025-03-15T10:30:00Z",
    updatedAt: "2025-03-15T14:45:00Z",
  },
  {
    id: "2",
    title: "Rohit Sharma Announces Retirement from T20 Internationals",
    slug: "rohit-sharma-retirement-t20",
    excerpt: "Indian captain Rohit Sharma has announced his retirement from T20 International cricket.",
    content: "<p>Indian cricket team captain Rohit Sharma has announced his retirement from T20 International cricket, following India's recent World Cup triumph. The 38-year-old veteran, who led India to their second T20 World Cup title, stated that he wanted to focus on ODIs and Test cricket for the remainder of his career.</p><p>\"It's been an incredible journey, but I feel this is the right time to step away from T20Is and give opportunity to younger players,\" Sharma said in an emotional press conference.</p>",
    category: "players",
    tags: ["rohit-sharma", "india", "retirement"],
    author: "Sunil Gavaskar",
    status: "published",
    featuredImage: "https://placehold.co/600x400/png",
    publishedAt: "2025-03-17T09:15:00Z",
    updatedAt: "2025-03-17T13:20:00Z",
  },
  {
    id: "3",
    title: "IPL 2025 Auction: Records Broken as Teams Splurge",
    slug: "ipl-2025-auction-records",
    excerpt: "The IPL 2025 auction saw multiple records broken as teams spent big on key players.",
    content: "<p>The IPL 2025 mega auction witnessed unprecedented spending as franchises broke the bank to secure top cricket talent from around the world. A total of ₹650 crore was spent across the two-day event held in Mumbai.</p><p>The biggest surprise came when uncapped Indian pacer Rajveer Singh was picked up for a record ₹24 crore by Chennai Super Kings, making him the most expensive player in IPL history.</p>",
    category: "ipl",
    tags: ["ipl", "auction", "csk"],
    author: "Ravi Shastri",
    status: "draft",
    featuredImage: "https://placehold.co/600x400/png",
    publishedAt: null,
    updatedAt: "2025-03-10T16:45:00Z",
  },
];

// Article categories
const ARTICLE_CATEGORIES = [
  { value: "tournaments", label: "Tournaments" },
  { value: "players", label: "Players" },
  { value: "teams", label: "Teams" },
  { value: "ipl", label: "IPL" },
  { value: "analysis", label: "Analysis" },
  { value: "interviews", label: "Interviews" },
];

// Article status options
const ARTICLE_STATUS = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
];

export default function AdminNews() {
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [filteredArticles, setFilteredArticles] = useState(MOCK_ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "tournaments",
    tags: "",
    status: "draft",
    featuredImage: "",
  });

  // Filter articles based on search query and filters
  useEffect(() => {
    let result = articles;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((article) => article.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((article) => article.status === statusFilter);
    }

    setFilteredArticles(result);
  }, [searchQuery, categoryFilter, statusFilter, articles]);

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "tournaments",
      tags: "",
      status: "draft",
      featuredImage: "",
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle content change from editor
  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    });
  };

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  // Add new article
  const handleAddArticle = () => {
    const newArticle = {
      id: Date.now().toString(),
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      author: "Admin User", // In a real app, this would be the current user
      publishedAt: formData.status === "published" ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    };

    setArticles([newArticle, ...articles]);
    toast.success("Article added successfully");
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Edit article
  const handleEditArticle = () => {
    const updatedArticles = articles.map((article) =>
      article.id === selectedArticle.id
        ? {
            ...article,
            ...formData,
            tags: typeof formData.tags === "string" 
              ? formData.tags.split(",").map((tag) => tag.trim())
              : formData.tags,
            updatedAt: new Date().toISOString(),
            publishedAt: 
              formData.status === "published" && !article.publishedAt
                ? new Date().toISOString()
                : article.publishedAt,
          }
        : article
    );

    setArticles(updatedArticles);
    toast.success("Article updated successfully");
    setIsEditDialogOpen(false);
  };

  // Delete article
  const handleDeleteArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
    toast.success("Article deleted successfully");
  };

  // Open edit dialog and populate form data
  const openEditDialog = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: Array.isArray(article.tags) ? article.tags.join(", ") : article.tags,
      status: article.status,
      featuredImage: article.featuredImage,
    });
    setIsEditDialogOpen(true);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-500">Draft</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">News & Articles</h1>
          <p className="text-gray-500">Manage cricket news, articles, and content</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Article
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search articles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {ARTICLE_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {ARTICLE_STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setStatusFilter("all");
              }}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>
            Total Articles: {articles.length} | Showing: {filteredArticles.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{article.excerpt}</div>
                      </TableCell>
                      <TableCell>
                        {ARTICLE_CATEGORIES.find(cat => cat.value === article.category)?.label || article.category}
                      </TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>
                        <StatusBadge status={article.status} />
                      </TableCell>
                      <TableCell>
                        {article.publishedAt 
                          ? new Date(article.publishedAt).toLocaleDateString() 
                          : new Date(article.updatedAt).toLocaleDateString() + " (Updated)"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openEditDialog(article)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteArticle(article.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No articles found matching the current filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Article Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add New Article</DialogTitle>
            <DialogDescription>
              Create a new news article or blog post
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="slug" className="text-right">
                Slug
              </label>
              <Input
                id="slug"
                name="slug"
                className="col-span-3"
                value={formData.slug}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="excerpt" className="text-right">
                Excerpt
              </label>
              <Textarea
                id="excerpt"
                name="excerpt"
                className="col-span-3"
                value={formData.excerpt}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="content" className="text-right pt-2">
                Content
              </label>
              <div className="col-span-3 border rounded-md">
                <TipTapEditor 
                  content={formData.content} 
                  onChange={handleContentChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                Category
              </label>
              <Select 
                name="category" 
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ARTICLE_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tags" className="text-right">
                Tags
              </label>
              <Input
                id="tags"
                name="tags"
                placeholder="Comma-separated tags"
                className="col-span-3"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select 
                name="status" 
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {ARTICLE_STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="featuredImage" className="text-right">
                Featured Image URL
              </label>
              <Input
                id="featuredImage"
                name="featuredImage"
                className="col-span-3"
                value={formData.featuredImage}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddArticle}>
              Add Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>
              Update article details and content
            </DialogDescription>
          </DialogHeader>
          {selectedArticle && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-title" className="text-right">
                  Title
                </label>
                <Input
                  id="edit-title"
                  name="title"
                  className="col-span-3"
                  value={formData.title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-slug" className="text-right">
                  Slug
                </label>
                <Input
                  id="edit-slug"
                  name="slug"
                  className="col-span-3"
                  value={formData.slug}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-excerpt" className="text-right">
                  Excerpt
                </label>
                <Textarea
                  id="edit-excerpt"
                  name="excerpt"
                  className="col-span-3"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="edit-content" className="text-right pt-2">
                  Content
                </label>
                <div className="col-span-3 border rounded-md">
                  <TipTapEditor 
                    content={formData.content} 
                    onChange={handleContentChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-category" className="text-right">
                  Category
                </label>
                <Select 
                  name="category" 
                  value={formData.category}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ARTICLE_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-tags" className="text-right">
                  Tags
                </label>
                <Input
                  id="edit-tags"
                  name="tags"
                  placeholder="Comma-separated tags"
                  className="col-span-3"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right">
                  Status
                </label>
                <Select 
                  name="status" 
                  value={formData.status}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ARTICLE_STATUS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-featuredImage" className="text-right">
                  Featured Image URL
                </label>
                <Input
                  id="edit-featuredImage"
                  name="featuredImage"
                  className="col-span-3"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditArticle}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


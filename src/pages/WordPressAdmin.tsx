
import React, { useState } from 'react';
import { createWordPressPost } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const WordPressAdmin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('news');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast.error('Please provide both title and content');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await createWordPressPost({
        title,
        content,
        category,
        featuredImage: featuredImage ? featuredImage.name : null
      });
      
      if (response.success) {
        toast.success('Post created successfully!');
        // Reset form
        setTitle('');
        setContent('');
        setCategory('news');
        setFeaturedImage(null);
      } else {
        toast.error('Failed to create post: ' + response.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An error occurred while creating the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cricket-darkGray">WordPress Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">Home</Button>
                    <Button variant="ghost" className="w-full justify-start font-bold text-cricket-blue">Posts</Button>
                    <Button variant="ghost" className="w-full justify-start">Media</Button>
                    <Button variant="ghost" className="w-full justify-start">Pages</Button>
                    <Button variant="ghost" className="w-full justify-start">Comments</Button>
                    <Button variant="ghost" className="w-full justify-start">Appearance</Button>
                    <Button variant="ghost" className="w-full justify-start">Plugins</Button>
                    <Button variant="ghost" className="w-full justify-start">Users</Button>
                    <Button variant="ghost" className="w-full justify-start">Settings</Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Post</CardTitle>
                  <CardDescription>Create a new post for your cricket website</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Post Title
                        </label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter post title"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                          Post Content
                        </label>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Enter post content"
                          rows={10}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="news">News</SelectItem>
                            <SelectItem value="match-reports">Match Reports</SelectItem>
                            <SelectItem value="analysis">Analysis</SelectItem>
                            <SelectItem value="interviews">Interviews</SelectItem>
                            <SelectItem value="ipl">IPL</SelectItem>
                            <SelectItem value="world-cup">World Cup</SelectItem>
                            <SelectItem value="womens-cricket">Women's Cricket</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="featured-image" className="block text-sm font-medium text-gray-700 mb-1">
                          Featured Image
                        </label>
                        <Input
                          id="featured-image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {featuredImage && (
                          <p className="text-sm text-gray-500 mt-1">
                            Selected: {featuredImage.name}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit" disabled={isSubmitting} className="bg-cricket-blue hover:bg-cricket-darkBlue">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                          </>
                        ) : 'Publish'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  All posts will be synced with your WordPress installation.
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WordPressAdmin;

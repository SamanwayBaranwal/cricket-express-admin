import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlogPost, fetchBlogCategories, BlogCategory } from '../services/wordpress';
import { toast } from 'react-hot-toast';

interface BlogPostEditorProps {
    onSubmit?: (postData: any) => void;
    initialData?: any;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ onSubmit, initialData }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        content: initialData?.content || '',
        excerpt: initialData?.excerpt || '',
        blog_categories: initialData?.blog_categories || [],
        status: initialData?.status || 'draft'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const fetchedCategories = await fetchBlogCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error loading categories:', error);
            toast.error('Failed to load categories');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = parseInt(e.target.value);
        setFormData(prev => ({
            ...prev,
            blog_categories: e.target.checked
                ? [...prev.blog_categories, categoryId]
                : prev.blog_categories.filter(id => id !== categoryId)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await createBlogPost({
                ...formData,
                status: formData.status as 'publish' | 'draft'
            });

            toast.success('Post created successfully!');
            
            if (onSubmit) {
                onSubmit(response);
            } else {
                navigate(`/blog/${response.slug}`);
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Excerpt
                </label>
                <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                </label>
                <div className="space-y-2">
                    {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                value={category.id}
                                checked={formData.blog_categories.includes(category.id)}
                                onChange={handleCategoryChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor={`category-${category.id}`}
                                className="ml-2 block text-sm text-gray-900"
                            >
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                    <option value="pending">Pending Review</option>
                </select>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : 'Save Post'}
                </button>
            </div>
        </form>
    );
};

export default BlogPostEditor;

import React, { useEffect, useState } from 'react';
import { fetchBlogCategories, BlogCategory } from '../services/wordpress';
import { Link } from 'react-router-dom';

interface BlogCategoriesProps {
    onCategorySelect?: (categoryId: number) => void;
    className?: string;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ onCategorySelect, className = '' }) => {
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchBlogCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Error loading blog categories:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded mb-2"></div>
                ))}
            </div>
        );
    }

    return (
        <div className={`blog-categories ${className}`}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Blog Categories</h3>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link
                            to={`/blog/category/${category.slug}`}
                            className="flex items-center justify-between group"
                            onClick={() => onCategorySelect?.(category.id)}
                        >
                            <span className="text-gray-700 group-hover:text-blue-600">
                                {category.name}
                            </span>
                            {category.count > 0 && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {category.count}
                                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogCategories;

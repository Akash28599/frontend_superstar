import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const StoriesBlogs = ({ type = 'blogs' }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(5);
    const navigate = useNavigate();
    
    useEffect(() => {
        const API_URL_ALL = `${process.env.REACT_APP_STRAPI_URL}/api/blogs?fields[0]=blog_title&fields[1]=sub_title&fields[2]=user_name&fields[3]=post_date&fields[4]=short_display_description&fields[5]=read_time&fields[6]=views&fields[7]=likes&fields[8]=comments&fields[9]=createdAt&fields[10]=updatedAt&fields[11]=publishedAt&populate=blog_thumbail&filters[sub_title][$ne]=story`;
        const API_URL_STORIES = `${process.env.REACT_APP_STRAPI_URL}/api/blogs?fields[0]=blog_title&fields[1]=sub_title&fields[2]=user_name&fields[3]=post_date&fields[4]=short_display_description&fields[5]=read_time&fields[6]=views&fields[7]=likes&fields[8]=comments&fields[9]=createdAt&fields[10]=updatedAt&fields[11]=publishedAt&filters[sub_title][$eq]=story&populate=blog_thumbail&sort=post_date:asc`;

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const url = type === 'stories' ? API_URL_STORIES : API_URL_ALL;
                const response = await fetch(url);
                const data = await response.json();
                let fetchedPosts = data.data || [];

                if (type === 'stories') {
                    fetchedPosts.sort((a, b) => {
                        const getEpisodeNum = (post) => {
                            const title = post.blog_title || "";
                            // Check for explicit "Episode X"
                            const match = title.match(/Episode\s+(\d+)/i);
                            if (match) return parseInt(match[1], 10);
                            
                            // Fallback: If subtitle is 'story' and no Episode # found, treat as Episode 1
                            const sub = post.sub_title || "";
                            if (sub.toLowerCase().trim() === 'story') return 1;
                            
                            return 9999;
                        };
                        return getEpisodeNum(a) - getEpisodeNum(b);
                    });
                }

                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [type]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 5);
    };

    const visiblePosts = posts.slice(0, visibleCount);
    const hasMore = visibleCount < posts.length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 font-sans">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-12 text-left">
                {type === 'stories' ? 'Stories' : 'Blogs'}
            </h1>

            {/* List */}
            {loading ? (
                <div className="flex justify-center py-20">Loading...</div>
            ) : (
                <>
                    <div className="space-y-8">
                        {visiblePosts?.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => navigate(type === 'stories' ? `/stories/${post.documentId}` : `/blog/${post.documentId}`)}
                            >
                                {/* Image Section */}
                                <div className="md:w-1/3 h-64 md:h-auto relative bg-gray-100">
                                    {post.blog_thumbail ? (
                                        <img
                                            src={post.blog_thumbail.url}
                                            alt={post.blog_title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                                            <div className="font-semibold text-gray-900">{post.user_name}</div>
                                            <span>•</span>
                                            <div>{formatDate(post.post_date)}</div>
                                            <span>•</span>
                                            <div>{post.read_time}</div>
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 text-left">
                                            {post.blog_title}
                                        </h2>

                                        <p className="text-gray-600 mb-6 line-clamp-3 text-left">
                                            {post.short_display_description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                                        <div className="flex items-center space-x-6">
                                            <span>{post.views} views</span>
                                            <span>0 comments</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span>{post.likes}</span>
                                            <Heart size={16} className="text-red-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={handleShowMore}
                                className="px-8 py-3 bg-[#E31837] text-white font-bold rounded-full 
                                           hover:bg-[#c41530] transition-all duration-300 
                                           hover:shadow-lg hover:-translate-y-1
                                           flex items-center gap-2"
                            >
                                Show More
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StoriesBlogs;


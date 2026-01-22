import { CommentOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecentBlogs = ({ id, }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const type = location.pathname.includes('/blog') ? 'blog' : 'story';

    console.log(location)
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const url =
                    `${process.env.REACT_APP_STRAPI_URL}/api/blogs` +
                    `?fields[0]=blog_title` +
                    `&fields[1]=sub_title` +
                    `&fields[2]=user_name` +
                    `&fields[3]=post_date` +
                    `&fields[4]=short_display_description` +
                    `&fields[5]=read_time` +
                    `&fields[6]=views` +
                    `&fields[7]=likes` +
                    `&fields[8]=comments` +
                    `&populate=blog_thumbail` +
                    `&pagination[limit]=3` +
                    `&filters[documentId][$ne]=${id}` +
                    `&filters[sub_title][$eq]=${type}` +
                    `&sort=post_date:desc`;

                const response = await fetch(url);
                const data = await response.json();
                setPosts(data?.data || []);
            } catch (error) {
                console.error("Error fetching recents:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPosts();
    }, [id, type]);

    const BlogCard = ({ post }) => {
        const {
            blog_title,
            views,
            comments,
            likes,
            documentId,
            blog_thumbail,
        } = post;

        const imageUrl = blog_thumbail?.url;

        return (
            <div
                onClick={() => {
                    navigate(`/blog/${documentId}`);
                    window.scrollTo({ top: 0, left: 0 });
                }}

                className="
          cursor-pointer
          bg-white
          rounded-lg
          shadow-sm
          hover:shadow-md
          transition
          flex
          flex-col
          overflow-hidden
          h-full
        "
            >
                <div className="w-full bg-gray-100 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={blog_title}
                        className="w-full h-40 object-cover"
                    />
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                    <h4 className="font-semibold text-lg line-clamp-2 text-left">
                        {blog_title}
                    </h4>

                    <div className="mt-3 flex justify-between text-xs text-gray-600">
                        <div className="flex gap-3">
                            <span className="flex items-center gap-1">
                                <VisibilityOutlined fontSize="small" /> {views}
                            </span>
                            <span className="flex items-center gap-1">
                                <CommentOutlined fontSize="small" /> {comments}
                            </span>
                        </div>

                        <span className="flex items-center gap-1">
                            <Heart size={14} /> {likes}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-between">
                <h3 className="font-semibold">{type === "blog" ? 'Recent Blogs' : "Recent Stories"}</h3>
                <h3 className="font-semibold cursor-pointer hover:underline"
                    onClick={() => {
                        window.scrollTo({ top: 0, left: 0 })
                        type === "blog" ? navigate('/blog') : navigate('/stories')
                    }
                    }
                >
                    See All
                </h3>
            </div>
            {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}

            {!loading && (
                <div
                    className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            mt-4
          "
                >
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentBlogs;

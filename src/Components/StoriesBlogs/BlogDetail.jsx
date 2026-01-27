import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { AiFillLinkedin } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";

import Episode1 from '../../assets/pdfs/Episode1.pdf';
import Episode2 from '../../assets/pdfs/Episode2.pdf';
import Episode4 from '../../assets/pdfs/Episode4.pdf';
import Episode5 from '../../assets/pdfs/Episode5.pdf';
import RecentBlogs from './RecentBlogs';
import StoryBookViewer from './StoryBookViewer';
import { openUrl } from '../../Utils/Utilities';

const BlogDetail = ({ siteSettings }) => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentsList, setCommentsList] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [copied, setCopied] = useState(false);

    const handlePostComment = () => {
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            user: "Guest User", // Placeholder user
            text: commentText,
            date: new Date().toISOString(),
            likes: 0
        };

        setCommentsList([newComment, ...commentsList]);
        setCommentText("");
    };
    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    useEffect(() => {
        const API_URL_FULL = `${process.env.REACT_APP_STRAPI_URL}/api/blogs/${id}?fields[0]=blog_title&fields[1]=sub_title&fields[2]=user_name&fields[3]=post_date&fields[4]=short_display_description&fields[5]=read_time&fields[6]=views&fields[7]=likes&fields[8]=comments&fields[9]=blog_body&populate=blog_thumbail`;

        const fetchBlog = async () => {
            try {
                const response = await fetch(API_URL_FULL);
                const data = await response.json();
                setBlog(data.data);
            } catch (error) {
                console.error("Error fetching blog detail:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) return <div className="flex justify-center py-20">Loading...</div>;
    if (!blog) return <div className="flex justify-center py-20">Blog not found</div>;

    // Helper to render body content
    const renderBodySection = (key, section) => {
        // Determine PDF to show
        let pdfToDisplay = section.pdf;
        let pdfTitle = "Story Book";

        if (pdfToDisplay) {
            const lowerBlogTitle = blog.blog_title?.toLowerCase() || "";
            const lowerSubTitle = blog.sub_title?.toLowerCase() || "";

            if (lowerBlogTitle.includes('episode 5')) {
                pdfToDisplay = Episode5;
                pdfTitle = "Episode 5: The Grand Finale";
            } else if (lowerBlogTitle.includes('episode 4')) {
                pdfToDisplay = Episode4;
                pdfTitle = "Episode 4";
            } else if (lowerBlogTitle.includes('episode 3')) {
                pdfToDisplay = null; // Not available
            } else if (lowerBlogTitle.includes('episode 2')) {
                pdfToDisplay = Episode2;
                pdfTitle = "Episode 2";
            } else if (lowerSubTitle === 'story') {
                // Fallback for generic story -> Episode 1
                pdfToDisplay = Episode1;
                pdfTitle = "Episode 1: The Beginning";
            }
        }

        return (

            <div key={key} className="mb-12">
                {/* Section Image */}
                {section.image && (
                    <div className="mb-6">
                        <img src={section.image} alt={section.title || "Section Image"} className="w-full h-auto rounded-lg" />
                    </div>
                )}

                {/* Section Title */}
                {section.title && (
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left">{section.title}</h3>
                )}

                {/* PDF Link */}
                {/* PDF Link */}
                {/* PDF Story Book Viewer */}
                {pdfToDisplay && (
                    <div className="mb-12 w-full">
                        <StoryBookViewer
                            pdfUrl={pdfToDisplay}
                            title={pdfTitle}
                        />
                    </div>
                )}

                {/* Description Content */}
                {section.description && Array.isArray(section.description) ? (
                    section.description.map((descItem, index) => {
                        if (typeof descItem === 'string') {
                            return <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4">{descItem}</p>;
                        }

                        // Handle object content
                        if (descItem.content_type === 'text') {
                            if (Array.isArray(descItem.content)) {
                                // Sometimes content might be array of strings? Or handled differently?
                                // Based on sample: "content": "..." (string)
                                return <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4 text-left">{descItem.content}</p>;
                            }
                            return <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4 text-left">{descItem.content}</p>;
                        }

                        // if (descItem.content_type === 'points' || descItem.content_type === 'point') {
                        //     if(descItem.content.length>1){
                        //     return (
                        //         <ol key={index} className="list-decimal pl-5 space-y-4 mb-6 text-left">
                        //             {Array.isArray(descItem.content) && descItem.content.map((point, pIndex) => {
                        //                 if (typeof point === 'object') {
                        //                     const displayTitle = (!point.title || (typeof point.title === 'string' && point.title.startsWith('http'))) ? point.value : point.title;
                        //                     const isReferences = section.title && section.title.toLowerCase().includes('references');
                        //                     const linkClass = isReferences
                        //                         ? "text-blue-600 font-bold underline"
                        //                         : "text-gray-900 font-bold hover:text-blue-600 hover:underline";

                        //                     // Handle complex points like links
                        //                     /*
                        //                       {
                        //                         "link": "...",
                        //                         "title": "...",
                        //                         "value": "...",
                        //                         "Skills Developed": "..."
                        //                       }
                        //                     */
                        //                     return (
                        //                         <li key={pIndex} className="text-lg text-gray-700 text-left">
                        //                             {point.link ? (
                        //                                 <a href={point.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        //                                     {displayTitle}
                        //                                 </a>
                        //                             ) : (
                        //                                 <span className="font-bold text-gray-900">{displayTitle}</span>
                        //                             )}
                        //                             {point.value && point.value !== displayTitle && <span className="block mt-1">{point.value}</span>}
                        //                             {/* Display extra fields like Skills Developed if present */}
                        //                             {Object.entries(point).map(([k, v]) => {
                        //                                 if (k !== 'link' && k !== 'title' && k !== 'value' && k !== 'content_type') {
                        //                                     return <div key={k} className="mt-1 text-sm text-gray-600"><span className="font-semibold">{k}:</span> {v}</div>
                        //                                 }
                        //                                 return null;
                        //                             })}
                        //                         </li>
                        //                     );
                        //                 }
                        //                 return <li key={pIndex} className="text-lg text-gray-700 text-left">{point.value || point}</li>;
                        //             })}
                        //         </ol>
                        //     );
                        // }
                        // return (
                        //         <ul key={index} className="pl-5 space-y-4 mb-6 text-left">
                        //             {Array.isArray(descItem.content) && descItem.content.map((point, pIndex) => {
                        //                 if (typeof point === 'object') {
                        //                     const displayTitle = (!point.title || (typeof point.title === 'string' && point.title.startsWith('http'))) ? point.value : point.title;
                        //                     const isReferences = section.title && section.title.tulowerCase().includes('references');
                        //                     const linkClass = isReferences
                        //                         ? "text-blue-600 font-bold underline"
                        //                         : "text-gray-900 font-bold hover:text-blue-600 hover:underline";

                        //                     // Handle complex points like links
                        //                     /*
                        //                       {
                        //                         "link": "...",
                        //                         "title": "...",
                        //                         "value": "...",
                        //                         "Skills Developed": "..."
                        //                       }
                        //                     */
                        //                     return (
                        //                         <li key={pIndex} className="text-lg text-gray-700 text-left">
                        //                             {point.link ? (
                        //                                 <a href={point.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        //                                     {displayTitle}
                        //                                 </a>
                        //                             ) : (
                        //                                 <span className="font-bold text-gray-900">{displayTitle}</span>
                        //                             )}
                        //                             {point.value && point.value !== displayTitle && <span className="block mt-1">{point.value}</span>}
                        //                             {/* Display extra fields like Skills Developed if present */}
                        //                             {Object.entries(point).map(([k, v]) => {
                        //                                 if (k !== 'link' && k !== 'title' && k !== 'value' && k !== 'content_type') {
                        //                                     return <div key={k} className="mt-1 text-sm text-gray-600"><span className="font-semibold">{k}:</span> {v}</div>
                        //                                 }
                        //                                 return null;
                        //                             })}
                        //                         </li>
                        //                     );
                        //                 }
                        //                 return <li key={pIndex} className="text-lg text-gray-700 text-left">{point.value || point}</li>;
                        //             })}
                        //         </ul>
                        //     );
                        // }

                        // Fallback for simple string in content array

                        if (descItem.content_type === 'points' || descItem.content_type === 'point') {

                            const isOrdered = Array.isArray(descItem.content) && descItem.content.length > 1;
                            const ListTag = isOrdered ? 'ol' : 'ul';

                            const isReferences =
                                typeof section?.title === 'string' &&
                                section.title.toLowerCase().includes('references');

                            const linkClass = isReferences
                                ? "text-blue-600 font-bold underline"
                                : "text-gray-900 font-bold hover:text-blue-600 hover:underline";

                            return (
                                <ListTag
                                    key={index}
                                    className={`${isOrdered ? 'list-decimal' : ''} pl-5 space-y-4 mb-6 text-left`}
                                >
                                    {Array.isArray(descItem.content) &&
                                        descItem.content.map((point, pIndex) => {

                                            if (typeof point === 'object' && point !== null) {

                                                const displayTitle =
                                                    (!point.title || (typeof point.title === 'string' && point.title.startsWith('http')))
                                                        ? point.value
                                                        : point.title;

                                                return (
                                                    <li key={pIndex} className="text-lg text-gray-700 text-left">

                                                        {point.link ? (
                                                            <a href={point.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                                                {displayTitle}
                                                            </a>
                                                        ) : (
                                                            <span className="font-bold text-gray-900">{displayTitle}</span>
                                                        )}

                                                        {point.value && point.value !== displayTitle && (
                                                            <span className="block mt-1">{point.value}</span>
                                                        )}

                                                        {Object.entries(point).map(([k, v]) => {
                                                            if (!['link', 'title', 'value', 'content_type'].includes(k)) {
                                                                return (
                                                                    <div key={k} className="mt-1 text-sm text-gray-600">
                                                                        <span className="font-semibold">{k}:</span> {v}
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })}

                                                    </li>
                                                );
                                            }

                                            return (
                                                <li key={pIndex} className="text-lg text-gray-700 text-left">
                                                    {point?.value || point}
                                                </li>
                                            );
                                        })}
                                </ListTag>
                            );
                        }

                        return null;
                    })
                ) : (
                    // specific case where description is just a string
                    typeof section.description === 'string' && (
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">{section.description}</p>
                    )
                )}
            </div>
        );
    };

    // Parse blog_body keys
    const sortedBodyKeys = blog.blog_body ? Object.keys(blog.blog_body).sort((a, b) => parseInt(a) - parseInt(b)) : [];


    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 font-kelloggs">
            {/* Header Info */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                        {blog.user_name ? blog.user_name.charAt(0) : 'A'}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">{blog.user_name}</div>
                        <div className="text-sm text-gray-500">{formatDate(blog.post_date)} • {blog.read_time}</div>
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight text-left">
                    {blog.blog_title}
                </h1>

                {/* Optional: Add "Updated" date if available */}
                {/* <div className="text-sm text-gray-500 mb-8">Updated Sep 10, 2026</div> */}


            </div>

            {/* Social Share (Placeholder) */}
            <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 mb-10">
                <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-gray-600" onClick={() => openUrl(siteSettings?.facebookurl)}><FiFacebook size={20} /></button>
                    <button className="text-gray-400 hover:text-gray-600" onClick={() => openUrl(siteSettings?.twitterurl)}><RiTwitterXFill size={20} /></button>
                    <button className="text-gray-400 hover:text-gray-600" ><AiFillLinkedin size={20} /></button>
                    <button className="text-gray-400 hover:text-gray-600 relative" onClick={handleCopy}><IoIosLink size={20} />
                        {copied && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded">
                                Copied!
                            </span>
                        )}</button>
                </div>
                <div className="flex space-x-4 text-gray-500 text-sm">
                    {/* <span>{blog.views} views</span>
                    <span>{blog.comments} comments</span> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                {sortedBodyKeys.map(key => renderBodySection(key, blog.blog_body[key]))}
            </div>

            {/* Bottom Interactions */}
            <div className="border-t border-gray-200 mt-12 pt-8 flex items-center justify-between">
                <div className="flex items-center space-x-6 text-gray-500">
                    <span>{blog.views} views</span>
                    <span>{commentsList.length} comments</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span>{blog.likes}</span>
                    <FaRegHeart className="text-red-500 cursor-pointer hover:fill-current" />
                </div>
            </div>
            <div className='mt-12'>
                <RecentBlogs id={id} />
            </div>
            {/* Comment Section */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Drop your answer in the comment section below</h3>
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-500">G</div>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                            rows="3"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handlePostComment}
                            disabled={!commentText.trim()}
                            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="mt-10 space-y-8">
                    {commentsList.map((comment) => (
                        <div key={comment.id} className="flex space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
                                {comment.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-gray-900">{comment.user}</span>
                                    <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                                </div>
                                <p className="text-gray-700 text-left">{comment.text}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                    <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                                        <FaRegHeart size={14} />
                                        <span>Like</span>
                                    </button>
                                    <button className="hover:text-blue-600 transition-colors">Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;

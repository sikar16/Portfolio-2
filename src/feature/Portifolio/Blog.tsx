import { useState } from "react";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";

// Define a type for a blog post
interface BlogPost {
    id: number;
    title: string;
    description: string;
    image: string; // Assuming images are strings (URLs)
    details: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "How To Make Web Templates",
        description:
            "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Vitae Nulla Diam In Ac Dictum A Urna",
        image: image1,
        details: "Detailed content about making web templates...",
    },
    {
        id: 2,
        title: "Make Business Card",
        description:
            "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Vitae Nulla Diam In Ac Dictum A Urna",
        image: image2,
        details: "Step-by-step guide to making professional business cards...",
    },
    {
        id: 3,
        title: "How To Make Flyer Design",
        description:
            "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Vitae Nulla Diam In Ac Dictum A Urna",
        image: image3,
        details: "Learn how to design stunning flyers easily...",
    },
];

export default function Blog() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const closeDialog = () => setSelectedPost(null);

    return (
        <div className="p-6 lg:ps-[6%]">
            <h1 className="text-black text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center lg:text-left">
                <span className='text-orange-500'>My</span> Blog
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <div key={post.id} className="p-4 rounded-lg">
                        <img src={post.image} alt={post.title} className="rounded-lg w-full h-56 object-cover" />
                        <h3 className="font-semibold text-lg mt-4">{post.title}</h3>
                        <p className="text-gray-600">{post.description}</p>
                        <button
                            className="text-yellow-500 font-medium mt-2"
                            onClick={() => setSelectedPost(post)} // No need for 'as any'
                        >
                            Learn More →
                        </button>
                    </div>
                ))}
            </div>

            {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
                        <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                        <p className="mt-4 text-gray-700">{selectedPost.details}</p>
                        <button
                            onClick={closeDialog}
                            className="mt-4 text-blue-500 font-semibold hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
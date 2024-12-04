import { Button } from "@mui/material";
import { useState } from "react";
import { useAddBlogMutation } from "../../../../service/blogApi";

function AddBlog({ onClose }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([{ imageUrl: "" }]);
    const [addBlog, { isError, isLoading, isSuccess }] = useAddBlogMutation();

    const handleAddBlog = async (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            content: content,
            blogImage: images.filter(image => image.imageUrl)
        };
        // console.log(formData);
        try {
            await addBlog(formData).unwrap();
            alert("Blog added successfully!");
            onClose()
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setImages([{ imageUrl: "" }]);
    };

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index].imageUrl = value;
        setImages(newImages);
    };

    const addImageField = () => {
        setImages([...images, { imageUrl: "" }]);
    };

    return (
        <form className="p-4" onSubmit={handleAddBlog}>
            <div>
                <div className="mb-4 flex justify-between gap-2">
                    <label htmlFor="title" className="block w-full text-sm font-medium text-gray-600">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                        placeholder="Enter blog title"
                        required
                    />
                </div>
                <div className="mb-4 flex justify-between gap-2">
                    <label htmlFor="content" className="block w-full text-sm font-medium text-gray-600">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                        placeholder="Enter blog content"
                        rows={4}
                        required
                    />
                </div>
                <div>
                    {images.map((image, index) => (
                        <div key={index} className="mb-4 flex justify-between gap-2">
                            <label htmlFor={`image-${index}`} className="block w-full text-sm font-medium text-gray-600">Image URL {index + 1}</label>
                            <span onClick={addImageField} className="text-2xl cursor-pointer">+</span>
                            <input
                                type="text"
                                id={`image-${index}`}
                                value={image.imageUrl}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                                placeholder="Enter image URL"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between">
                <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                <Button color="primary" type="submit" disabled={isLoading}>Add Blog</Button>
            </div>
        </form>
    );
}

export default AddBlog;
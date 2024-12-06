import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateBlogMutation } from "../../../../service/blogApi"; // Ensure this points to your correct service
import { useForm, SubmitHandler } from "react-hook-form";

interface BlogType {
    title: string;
    content: string;
    id: number;
    blogImage: string[];
}

interface UpdateBlogProps {
    handleCloseDialog: () => void;
    selectedRowData: BlogType | null;
}

interface UpdateBlogFormType {
    title: string;
    content: string;
    blogImage: string[];
}

const UpdateBlog: React.FC<UpdateBlogProps> = ({
    handleCloseDialog,
    selectedRowData,
}) => {
    const [updateBlog, { isLoading }] = useUpdateBlogMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateBlogFormType>({
        defaultValues: {
            title: selectedRowData?.title || "",
            content: selectedRowData?.content || "",
            blogImage: selectedRowData?.blogImage || [""], // Pre-fill with existing images or an empty array
        },
    });

    const onSubmit: SubmitHandler<UpdateBlogFormType> = async (data) => {
        if (selectedRowData) {
            try {
                await updateBlog({
                    id: selectedRowData.id,
                    ...data,
                }).unwrap();
                alert("Blog updated successfully!");
                handleCloseDialog();
            } catch (error: any) {
                alert(error);
            }
        }
    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    return (
        <div className="mx-10 mb-10 w-[400px]">
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputLabel id="blog-label" className="mt-3 text-xl font-bold">
                    Update Blog
                </InputLabel>

                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                {errors.content && <p className="text-red-500">{errors.content.message}</p>}

                <div className="mb-4 flex flex-col">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register("title", { required: "Title is required" })}
                        className={`mt-1 text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.title ? 'border-red-500' : ''}`}
                        placeholder="Enter blog title"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-600">
                        Content
                    </label>
                    <textarea
                        id="content"
                        {...register("content", { required: "Content is required" })}
                        className={`mt-1 text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.content ? 'border-red-500' : ''}`}
                        placeholder="Enter blog content"
                        rows={4}
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="blogImage" className="block text-sm font-medium text-gray-600">
                        Image URLs
                    </label>
                    {(selectedRowData?.blogImage || []).map((img, index) => (
                        <input
                            key={index}
                            type="text"
                            {...register(`blogImage.${index}`, { required: "Image URL is required" })}
                            className={`mt-1 text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.blogImage?.[index] ? 'border-red-500' : ''}`}
                            placeholder="Enter image URL"
                            defaultValue={img} // Pre-fill with existing image URLs
                            disabled={isLoading}
                        />
                    ))}
                </div>

                <div className="pt-5">
                    <div className="flex justify-between gap-5">
                        <Button color="secondary" onClick={handleDiscard}>
                            Discard
                        </Button>
                        <Button color="primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Blog"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
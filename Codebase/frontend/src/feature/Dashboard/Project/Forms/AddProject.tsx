import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAddNewProjectMutation } from "../../../../service/projectApi"; // Adjust the service name as necessary
import { useGetAllprojectCategoryQuery } from "../../../../service/projectCategoryApi"; // Adjust the service name as necessary

function AddProject() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [technology, setTechnology] = useState("");
    const [projectCategoryId, setProjectCategoryId] = useState("");
    const [projectImage, setprojectImage] = useState([""]); // Array for image URLs

    const [addProject, { isLoading, error }] = useAddNewProjectMutation();
    const { data: categories, isLoading: categoriesLoading } = useGetAllprojectCategoryQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: projectName,
            description,
            demoLink,
            technology,
            projectCategoryId: Number(projectCategoryId),
            projectImage: projectImage.map(image => ({ image })) // Prepare image data
        };

        try {
            await addProject(formData).unwrap();

            alert("Project added successfully");
            // Reset form fields
            setProjectName("");
            setDescription("");
            setDemoLink("");
            setTechnology("");
            setProjectCategoryId("");
            setprojectImage([""]);
        } catch (err) {
            console.error(err);
            alert(error?.data?.message || "Failed to add project");
        }
    };

    const handleImageChange = (index, value) => {
        const newImages = [...projectImage];
        newImages[index] = value;
        setprojectImage(newImages);
    };

    const addImageField = () => {
        setprojectImage([...projectImage, ""]); // Add a new empty field
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-600">Project Name</label>
                <TextField
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1 w-full"
                    placeholder="Enter project name"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                <TextField
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full"
                    placeholder="Enter project description"
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="demoLink" className="block text-sm font-medium text-gray-600">Demo Link</label>
                <TextField
                    id="demoLink"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    className="mt-1 w-full"
                    placeholder="Enter demo link"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="technology" className="block text-sm font-medium text-gray-600">Technology</label>
                <TextField
                    id="technology"
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    className="mt-1 w-full"
                    placeholder="Enter technologies used"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="projectCategory" className="block text-sm font-medium text-gray-600">Project Category</label>
                <select
                    id="projectCategory"
                    value={projectCategoryId}
                    onChange={(e) => setProjectCategoryId(e.target.value)}
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="" disabled>Select a category</option>
                    {categoriesLoading ? (
                        <option>Loading categories...</option>
                    ) : (
                        categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Project Images</label>
                {projectImage.map((image, index) => (
                    <div key={index} className="flex mb-2">
                        <TextField
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            className="mt-1 w-full"
                            placeholder="Enter image URL"
                            variant="outlined"
                            size="small"
                        />
                    </div>
                ))}
                <Button variant="contained" onClick={addImageField}>
                    Add Another Image
                </Button>
            </div>

            <div className="flex justify-between">
                <Button color="secondary">Cancel</Button>
                <Button color="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Project"}
                </Button>
            </div>
        </form>
    );
}

export default AddProject;
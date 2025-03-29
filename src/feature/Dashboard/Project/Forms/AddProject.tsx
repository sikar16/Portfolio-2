import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAddNewProjectMutation } from "../../../../service/projectApi"; // Adjust the service name as necessary
import { useGetAllprojectCategoryQuery } from "../../../../service/projectCategoryApi"; // Adjust the service name as necessary

function AddProject({ onClose }) {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [technology, settechnology] = useState("");
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
            settechnology("");
            setProjectCategoryId("");
            setprojectImage([""]);
            onClose()
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
            <div className="mb-4 flex justify-between">
                <label htmlFor="projectName" className="block text-sm font-medium  w-full text-gray-600">Project Name</label>
                <TextField
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                    placeholder="Enter project name"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4 flex justify-between">
                <label htmlFor="description" className="block text-sm font-medium  w-full text-gray-600">Description</label>
                <TextField
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                    placeholder="Enter project description"
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4 flex justify-between">
                <label htmlFor="demoLink" className="block text-sm font-medium  w-full text-gray-600">Demo Link</label>
                <TextField
                    id="demoLink"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                    placeholder="Enter demo link"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4 flex justify-between">
                <label htmlFor="technology" className="block text-sm font-medium  w-full text-gray-600">technology</label>
                <TextField
                    id="technology"
                    value={technology}
                    onChange={(e) => settechnology(e.target.value)}
                    className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                    placeholder="Enter technologies used"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4 flex ">
                <label htmlFor="projectCategory" className="block text-sm  w-full font-medium text-gray-600">Project Category</label>
                <select
                    id="projectCategory"
                    value={projectCategoryId}
                    onChange={(e) => setProjectCategoryId(e.target.value)}
                    className="mt-1 mx-[5%] w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"                >
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

            <div className="mb-4 flex ">
                <label htmlFor="projectImage" className="block text-sm w-full font-medium text-gray-600">Project Images</label>
                <div className="flex flex-wrap">
                    {projectImage.map((image, index) => (
                        <>
                            <div key={index} className="flex mb-2">
                                <TextField
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="mt-1 text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                                    placeholder="Enter image URL"
                                    variant="outlined"
                                    size="small"
                                />
                                <div>
                                    <button onClick={addImageField} className="text-center align-middle items-center mx-4" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="none" stroke="#F57920" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h7m7 0h-7m0 0V5m0 7v7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </>
                    ))}
                </div>


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
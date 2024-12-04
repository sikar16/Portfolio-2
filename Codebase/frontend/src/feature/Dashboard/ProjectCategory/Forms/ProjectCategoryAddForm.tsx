import { Button } from "@mui/material";
import { useAddNewProjectCategoryMutation } from "../../../../service/projectCategoryApi";
import { useState } from "react";

function ProjectCategoryAddForm({ onClose }) {
    const [projectCategoryName, setProjectCategoryName] = useState("");
    const [addProjectCategory, { isError, isLoading, error }] =
        useAddNewProjectCategoryMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = {
            name: projectCategoryName,
        };
        console.log(formdata)
        try {
            addProjectCategory(formdata).unwrap()
            alert("Project category added successfully!");
            onClose();
        }
        catch (err: any) {
            alert(err);

        };
    }
    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4 flex justify-between gap-2">
                <label htmlFor="projectCategoryName" className="block w-full text-sm font-medium text-gray-600">Project Category Name</label>
                <input
                    type="text"
                    id="projectCategoryName"
                    value={projectCategoryName}
                    onChange={(e) => setProjectCategoryName(e.target.value)}
                    className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                    placeholder="Enter project category name"
                    required
                />
            </div>
            {isError && <div className="text-red-600">{error.message}</div>}
            <div className="flex justify-between">
                <Button color="secondary" onClick={() => setProjectCategoryName("")}>Cancel</Button>
                <Button color="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Category"}
                </Button>
            </div>
        </form>
    );
}

export default ProjectCategoryAddForm;
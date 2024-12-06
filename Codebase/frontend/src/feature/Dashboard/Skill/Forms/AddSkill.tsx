import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAddNewSkillMutation } from "../../../../service/skillApi";
import { useGetAllSkillCategoryQuery } from "../../../../service/skillCategoryApi";

function AddSkill() {
    const [skillName, setSkillName] = useState("");
    const [skillCategoryId, setSkillCategoryId] = useState(""); // Changed to match API expectation
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [addSkill, { isLoading, error }] = useAddNewSkillMutation();
    const { data: categories, isLoading: categoriesLoading } = useGetAllSkillCategoryQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: skillName,
            skillCategoryId: Number(skillCategoryId), // Ensure this is a number
            description: skillName,
            image: skillName,
        };

        try {
            await addSkill(formData).unwrap();
            alert("Skill added successfully");
            onclose()
            // Reset form fields
            setSkillName("");
            setSkillCategoryId("");
            setDescription("");
            setImage("");
        } catch (err) {
            console.log(err);
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4 flex justify-between gap-2 ">
                <label htmlFor="skillName" className="block text-sm font-medium w-full  text-gray-600">Skill Name</label>
                <TextField
                    id="skillName"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    className="mt-1 text-sm border-none text-slate-600 w-screen rounded-md outline-none bg-white shadow-sm"
                    placeholder="Enter skill name"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4 flex justify-between gap-2 ">
                <label htmlFor="skillCategory" className="block text-sm font-medium w-full text-gray-600">Skill Category</label>
                <select
                    id="skillCategory"
                    value={skillCategoryId}
                    onChange={(e) => setSkillCategoryId(Number(e.target.value))} className="mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
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

            <div className="mb-4 gap-2">
                <label htmlFor="description" className="block text-sm font-medium w-full text-gray-600">Skill Description</label>
                <TextField
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 text-sm border-none text-slate-600 w-full rounded-md outline-none bg-white shadow-sm"
                    placeholder="Enter skill description"
                    multiline
                    rows={5}
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="mb-4 flex justify-between gap-2 ">
                <label htmlFor="image" className="block text-sm font-medium w-full text-gray-600">Image URL</label>
                <TextField
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="mt-1 text-sm border-none text-slate-600 w-screen rounded-md outline-none bg-white shadow-sm"
                    placeholder="Enter image URL"
                    variant="outlined"
                    size="small"
                />
            </div>

            <div className="flex justify-between">
                <Button color="secondary">Cancel</Button>
                <Button color="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Skill"}
                </Button>
            </div>
        </form>
    );
}

export default AddSkill;
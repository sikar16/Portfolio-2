import { Button } from "@mui/material"
import { useState } from "react"
import { useAddAllSkillCategoryMutation } from "../../../../service/skillCategoryApi";

function AddSkillCategory({ onClose }) {
    const [skillCategoryName, setSkillCategoryName] = useState("");
    const [addskillcategory, { isError, isLoading, error }] = useAddAllSkillCategoryMutation()
    const handlsumbit = async (e) => {
        e.preventDefault();
        const formData = {
            name: skillCategoryName,
        };

        try {
            await addskillcategory(formData).unwrap();
            alert("Skill category added successfully");
            setSkillCategoryName("");
            onClose();
        } catch (error) {
            alert(error || "Failed to add skill category");
        }
    }
    return (
        <>
            <form className="p-4" onSubmit={handlsumbit}>
                <div className="p-4">
                    <div className="mb-4 flex justify-between gap-2">
                        <label htmlFor="categoryName" className="block text-sm font-medium w-full text-gray-600">Category Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            value={skillCategoryName}
                            onChange={(e) => setSkillCategoryName(e.target.value)}

                            className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm block px-3 py-2 bg-white"
                            placeholder="Enter category name"
                        />
                    </div>
                </div>

                {isError && <div className="text-red-600">{error.message}</div>}

                <div className="flex justify-between">
                    <Button color="secondary" onClick={() => setSkillCategoryName("")}>Cancel</Button>
                    <Button color="primary" type="submit" >
                        {isLoading ? "Adding" : " Add Category"}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AddSkillCategory

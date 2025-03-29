import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateskillMutation } from "../../../../service/skillApi"; // Adjust the service name as necessary
import { useForm, SubmitHandler } from "react-hook-form";

interface SkillType {
    name: string;
    description: string;
    image: string;
    id: number;
}

interface UpdateSkillProps {
    handleCloseDialog: () => void;
    selectedRowData: SkillType | null;
}

interface UpdateSkillFormType {
    name: string;
    description: string;
    image: string;
}

const UpdateSkill: React.FC<UpdateSkillProps> = ({
    handleCloseDialog,
    selectedRowData,
}) => {
    const [updateSkill, { isLoading }] = useUpdateskillMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateSkillFormType>({
        defaultValues: {
            name: selectedRowData?.name || "",
            description: selectedRowData?.description || "",
            image: selectedRowData?.image || "",
        },
    });

    const onSubmit: SubmitHandler<UpdateSkillFormType> = async (data) => {
        if (selectedRowData) {
            try {
                await updateSkill({
                    body: {
                        name: data.name,
                        description: data.description,
                        image: data.image
                    },
                    params: selectedRowData.id,
                }).unwrap();
                alert("Skill updated successfully");
                handleCloseDialog();
            } catch (error: any) {
                console.log(error)
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
                <InputLabel id="skill-label" className="mt-3 text-xl font-bold">
                    Update Skill
                </InputLabel>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}

                <div className="mb-4 flex flex-col">
                    <label htmlFor="skillName" className="block text-sm font-medium text-gray-600">
                        Skill Name
                    </label>
                    <input
                        type="text"
                        id="skillName"
                        {...register("name", { required: "Skill name is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter skill name"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="skillDescription" className="block text-sm font-medium text-gray-600">
                        Skill Description
                    </label>
                    <textarea
                        id="skillDescription"
                        {...register("description", { required: "Description is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.description ? 'border-red-500' : ''}`}
                        placeholder="Enter skill description"
                        rows={4}
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="skillImage" className="block text-sm font-medium text-gray-600">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="skillImage"
                        {...register("image", { required: "Image URL is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.image ? 'border-red-500' : ''}`}
                        placeholder="Enter image URL"
                        disabled={isLoading}
                    />
                </div>

                <div className="pt-5">
                    <div className="flex justify-between gap-5">
                        <Button color="secondary" onClick={handleDiscard}>
                            Discard
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update Skill"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateSkill;
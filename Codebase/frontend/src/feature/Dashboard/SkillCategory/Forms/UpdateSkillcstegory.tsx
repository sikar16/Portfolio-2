import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateskillCatagoryMutation } from "../../../../service/skillCategoryApi";

interface CategoryType {
    name: string;
    id: number;
}

interface updateskillcategoruProps {
    handleCloseDialog: () => void;
    selectedRowData: CategoryType | null;
}

interface updateskillcategoruFormType {
    name: string;
}

const UpdateSkillcstegory: React.FC<updateskillcategoruProps> = ({
    handleCloseDialog,
    selectedRowData,
}) => {
    const [updateskillcategoru, { isLoading }] = useUpdateskillCatagoryMutation("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<updateskillcategoruFormType>({
        defaultValues: {
            name: selectedRowData?.name || "",
        },
    });

    const onSubmit: SubmitHandler<updateskillcategoruFormType> = async (data) => {
        if (selectedRowData) {
            try {
                await updateskillcategoru({
                    body: { name: data.name },
                    params: selectedRowData.id,
                }).unwrap();
                alert("Update successfully");
                handleCloseDialog();
            } catch (error: any) {
                alert(error?.data?.message || "Failed to update category");
            }
        }
    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    return (
        <div className="mx-10 mb-10 w-[400px]">
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputLabel id="category-label" className="mt-3 text-xl font-bold">
                    Update Category
                </InputLabel>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <div className="mb-4 flex justify-between gap-4">
                    <label htmlFor="projectCategoryName" className="block text-sm font-medium text-gray-600">
                        Project Category Name
                    </label>
                    <input
                        type="text"
                        id="projectCategoryName"
                        {...register("name", { required: "Category name is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter project category name"
                        disabled={isLoading} />
                </div>

                <div className="pt-5    ">
                    <div className="flex justify-between gap-5">
                        <Button color="secondary" onClick={handleDiscard}>
                            Discard
                        </Button>
                        <Button
                            color="primary" type="submit" disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update Category"}
                        </Button>



                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateSkillcstegory;
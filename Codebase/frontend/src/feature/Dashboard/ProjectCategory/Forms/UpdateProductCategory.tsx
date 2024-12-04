import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateprojectCatagoryMutation } from "../../../../service/projectCategoryApi"; // Corrected service name
import { useForm, SubmitHandler } from "react-hook-form";

interface CategoryType {
    name: string;
    id: number;
}

interface UpdateProductCategoryProps {
    handleCloseDialog: () => void;
    selectedRowData: CategoryType | null;
}

interface UpdateProductCategoryFormType {
    name: string;
}

const UpdateProductCategory: React.FC<UpdateProductCategoryProps> = ({
    handleCloseDialog,
    selectedRowData,
}) => {
    const [updateProductCategory, { isLoading }] = useUpdateprojectCatagoryMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProductCategoryFormType>({
        defaultValues: {
            name: selectedRowData?.name || "",
        },
    });

    const onSubmit: SubmitHandler<UpdateProductCategoryFormType> = async (data) => {
        if (selectedRowData) {
            try {
                await updateProductCategory({
                    body: { name: data.name },
                    params: selectedRowData.id,
                }).unwrap();
                alert("update successfully")

                handleCloseDialog();
            } catch (error: any) {
                alert(error)
            }
        }
    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    return (
        <div className="mx-10 mb-10 w-[400px]">
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputLabel id="category-label">
                    <p className="mt-3 text-xl font-bold">Update Category</p>
                </InputLabel>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <TextField
                    label="New Category Name"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    {...register("name", { required: "Category name is required" })}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                    disabled={isLoading}
                />

                <div className="pt-10">
                    <div className="flex justify-between gap-5">
                        <Button variant="outlined" color="error" onClick={handleDiscard}>
                            Discard
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="contained"
                            color="primary"
                            className="mt-4"
                        >
                            {isLoading ? "Updating..." : "Update Category"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductCategory;
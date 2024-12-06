import { useUpdateProjectMutation } from "../../../../service/projectApi";
import { useForm, SubmitHandler } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";

interface ProjectType {
    name: string;
    description: string;
    demoLink: string;
    technology: string;
    projectCategoryId: number;
    projectImage: string[];
    id: number;
}

interface UpdateProductProps {
    handleCloseDialog: () => void;
    selectedRowData: ProjectType | null;
}

interface UpdateProductFormType {
    name: string;
    description: string;
    demoLink: string;
    technology: string;
    projectCategoryId: number;
    projectImage: string[];
}

const UpdateProject: React.FC<UpdateProductProps> = ({
    handleCloseDialog,
    selectedRowData,
}) => {
    const [updateProject, { isLoading }] = useUpdateProjectMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProductFormType>({
        defaultValues: {
            name: selectedRowData?.name || "",
            demoLink: selectedRowData?.demoLink || "",
            description: selectedRowData?.description || "",
            projectCategoryId: selectedRowData?.projectCategoryId || 0,
            projectImage: selectedRowData?.projectImage || [""],
            technology: selectedRowData?.technology || "",
        },
    });
    console.log(selectedRowData)
    const onSubmit: SubmitHandler<UpdateProductFormType> = async (data) => {
        if (selectedRowData) {
            try {
                await updateProject({
                    body: {
                        name: data.name,
                        demoLink: data.demoLink,
                        description: data.description,
                        projectCategoryId: data.projectCategoryId,
                        projectImage: data.projectImage,
                        technology: data.technology,
                    },
                    params: selectedRowData.id,
                }).unwrap();
                alert("Update successfully");
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
                <InputLabel id="project-label" className="mt-3 text-xl font-bold">
                    Update Project
                </InputLabel>

                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                {errors.demoLink && <p className="text-red-500">{errors.demoLink.message}</p>}
                {errors.technology && <p className="text-red-500">{errors.technology.message}</p>}
                {errors.projectImage && <p className="text-red-500">{errors.projectImage.message}</p>}

                <div className="mb-4 flex flex-col">
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-600">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        {...register("name", { required: "Project name is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter project name"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-600">
                        Project Description
                    </label>
                    <textarea
                        id="projectDescription"
                        {...register("description", { required: "Description is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.description ? 'border-red-500' : ''}`}
                        placeholder="Enter project description"
                        rows={4}
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="demoLink" className="block text-sm font-medium text-gray-600">
                        Demo Link
                    </label>
                    <input
                        type="text"
                        id="demoLink"
                        {...register("demoLink")}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white`}
                        placeholder="Enter demo link"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="technology" className="block text-sm font-medium text-gray-600">
                        technology
                    </label>
                    <input
                        type="text"
                        id="technology"
                        {...register("technology")}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white`}
                        placeholder="Enter technology"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label htmlFor="projectImage" className="block text-sm font-medium text-gray-600">
                        Project Images
                    </label>
                    {selectedRowData?.projectImage?.map((img, index) => (
                        <input
                            key={index}
                            type="text"
                            {...register(`projectImage.${index}`, { required: "Image URL is required" })}
                            className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.projectImage?.[index] ? 'border-red-500' : ''}`}
                            placeholder="Enter image URL"
                            disabled={isLoading}
                        />
                    )) || (
                            <p className="text-gray-500">No images available</p>
                        )}
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
                            {isLoading ? "Updating..." : "Update Project"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateProject;
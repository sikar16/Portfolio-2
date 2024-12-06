import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateserviceMutation } from "../../../../service/serviceApi"; // Adjusted service name
import { useForm, SubmitHandler } from "react-hook-form";

interface ServiceType {
    id: number;
    name: string;
    image: string;
    description: string;
}
/***
 * {
    "name": "UI/UXxxx",
    "image": "https://example.com/image.jpg",
    "description": "Providing professional ui/ux services."
    }
 */

interface UpdateServiceProps {
    handleCloseDialog: () => void;
    selectedRowData: ServiceType | null;
}

interface UpdateServiceFormType {
    name: string;
    image: string;
    description: string;
}

const UpdateService: React.FC<UpdateServiceProps> = ({
    handleCloseDialog,
    selectedRowData,
}) => {
    const [updateService, { isLoading }] = useUpdateserviceMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateServiceFormType>({
        defaultValues: {
            name: selectedRowData?.name || "",
            image: selectedRowData?.image || "",
            description: selectedRowData?.description || "",
        },
    });

    const onSubmit: SubmitHandler<UpdateServiceFormType> = async (data) => {
        if (selectedRowData) {
            try {
                await updateService({
                    body: {
                        name: data.name,
                        image: data.image,
                        description: data.description
                    },
                    params: selectedRowData.id,
                }).unwrap();
                alert("Update successful");
                handleCloseDialog();
            } catch (error: any) {
                console.log(error)
                alert(error?.data?.message || "Failed to update service");
            }
        }
    };

    return (
        <div className="mx-10 mb-10 w-[400px]">
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputLabel id="service-label" className="mt-3 text-xl font-bold">
                    Update Service
                </InputLabel>

                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="serviceName" className="block text-sm font-medium text-gray-600">
                        Service Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Service name is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter service name"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="serviceImage" className="block text-sm font-medium text-gray-600">
                        Service Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        {...register("image", { required: "Image URL is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.image ? 'border-red-500' : ''}`}
                        placeholder="Enter service image URL"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-600">
                        Service Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description", { required: "Description is required" })}
                        className={`mt-1 w-full text-sm border outline-none border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white ${errors.description ? 'border-red-500' : ''}`}
                        placeholder="Enter service description"
                        rows={4}
                        disabled={isLoading}
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <Button color="secondary" onClick={handleCloseDialog} disabled={isLoading}>
                        Discard
                    </Button>
                    <Button color="primary" type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Service"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateService;
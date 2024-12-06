import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { useAddServiceMutation } from "../../../../service/serviceApi"

function AddService({ onClose }) {


    const [name, setName] = useState("")
    const [image, setimage] = useState("")
    const [description, settDescribtion] = useState("")

    const [addService, { isError, isLoading, error }] = useAddServiceMutation()

    const handlsumbit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            image: image,
            description: description
        };

        try {
            await addService(formData).unwrap();
            alert("service added successfully");
            onClose();
        } catch (error) {
            alert(error || "Failed to add skill category");
        }
    }


    return (
        <>
            <form action="" className="p-4" onSubmit={handlsumbit}>
                <div className="p-4">
                    <div className="mb-4 flex justify-between gap-2 ">
                        <label htmlFor="serviceName" className="block text-sm font-medium w-full text-gray-600">Service Name</label>
                        <input
                            type="text"
                            id="serviceName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                            className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm  block px-3 py-2 bg-white"
                            placeholder="Enter service name"
                        />
                    </div>
                    <div className="mb-4 flex justify-around gap-2">
                        <label htmlFor="serviceImg" className="block text-sm font-medium w-full text-gray-600">Service Image</label>
                        <input
                            type="text"
                            id="serviceImg"
                            value={image}
                            onChange={(e) => setimage(e.target.value)}

                            className="mt-1 text-sm w-screen outline-none border border-gray-300 rounded-md shadow-sm  block px-3 py-2 bg-white"
                            placeholder="Enter service image"
                        />
                    </div>
                    <div className="mb-4  gap-1">
                        <label htmlFor="serviceDescribtion" className="block text-sm font-medium w-full text-gray-600">Service Describtion</label>
                        <TextField
                            id="serviceDescribtion"
                            multiline
                            rows={6}
                            value={description}
                            onChange={(e) => settDescribtion(e.target.value)}

                            className="mt-1 text-sm border-none text-slate-600 w-full rounded-md outline-none bg-white shadow-sm"
                            placeholder="Service Describtion"
                            fullWidth
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button color="secondary" >Cancel</Button>
                    <Button color="primary" type="submit" >
                        {isLoading ? "Adding" : " Add Category"}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AddService

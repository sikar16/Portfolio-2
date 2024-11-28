import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { ServiceTable } from "./ServiceTable";

function Service() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div>
                <div className="flex justify-between my-4 items-center text-center align-middle">
                    <div className="">
                        <p className=" ms-4 text-2xl font-medium">Services</p>
                    </div>
                    <div className="">
                        <button className="bg-[#F57920] text-white px-5 gap-1 py-2 rounded-lg flex items-center text-center align-middle" onClick={handleClickOpen}>
                            <span className="items-center"><svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" ><path fill="white" d="M12.75 7a.75.75 0 0 0-1.5 0v4.25H7a.75.75 0 0 0 0 1.5h4.25V17a.75.75 0 0 0 1.5 0v-4.25H17a.75.75 0 0 0 0-1.5h-4.25z"></path></svg></span>
                            <span>Add Service</span> </button>
                    </div>
                </div>
                <div className="">
                    <ServiceTable />
                </div>
            </div>



            <Dialog open={open} onClose={handleClickClose} className="">
                <DialogTitle className="text-lg font-semibold text-gray-700">Add Service</DialogTitle>
                <hr className='text-black shadow-lg my-[2px]' />

                <div className="p-4">
                    <div className="mb-4 flex justify-between gap-2 ">
                        <label htmlFor="serviceName" className="block text-sm font-medium w-full text-gray-600">Service Name</label>
                        <input
                            type="text"
                            id="serviceName"
                            className="mt-1 w-screen text-sm border outline-none border-gray-300 rounded-md shadow-sm  block px-3 py-2 bg-white"
                            placeholder="Enter service name"
                        />
                    </div>
                    <div className="mb-4 flex justify-around gap-2">
                        <label htmlFor="serviceImg" className="block text-sm font-medium w-full text-gray-600">Service Image</label>
                        <input
                            type="text"
                            id="serviceImg"
                            className="mt-1 text-sm w-screen outline-none border border-gray-300 rounded-md shadow-sm  block px-3 py-2 bg-white"
                            placeholder="Enter service image"
                        />
                    </div>
                    <div className="mb-4  gap-1">
                        <label htmlFor="serviceDescribtion" className="block text-sm w-full text-slate-600">Service Describtion</label>
                        <TextField
                            id="serviceDescribtion"
                            multiline
                            rows={6}
                            className="mt-1 text-sm border-none text-slate-600 w-full rounded-md outline-none bg-white shadow-sm"
                            placeholder="Service Describtion"
                            fullWidth
                        />
                    </div>
                </div>
                <DialogActions className="p-4">
                    <Button onClick={handleClickClose} color="secondary">Cancel</Button>
                    <Button onClick={handleClickClose} color="primary">Add Service</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Service
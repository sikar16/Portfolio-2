import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface FileInput {
    name: string;
    file: File | null;
}

function Profile() {
    const [fileInputs, setFileInputs] = useState<FileInput[]>([{ name: '', file: null }]);
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [aboutImage, setAboutImage] = useState<string | null>(null);

    const handleAddInput = () => {
        setFileInputs([...fileInputs, { name: '', file: null }]);
    };

    const handleFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newFileInputs = [...fileInputs];
        newFileInputs[index].file = event.target.files ? event.target.files[0] : null;
        setFileInputs(newFileInputs);
    };

    const handleNameChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newFileInputs = [...fileInputs];
        newFileInputs[index].name = event.target.value;
        setFileInputs(newFileInputs);
    };

    const handleHeroImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setHeroImage(imageUrl);
        }
    };

    const handleAboutImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAboutImage(imageUrl);
        }
    };

    return (
        <div className="h-fit ">
            <form>
                <p className=" ms-4 text-2xl font-medium">User info</p>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4 ">
                    <div className="w-[80%] md:w-[30%]">
                        <label htmlFor="firstName" className="block text-sm text-slate-600">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                    <div className="w-[80%] md:w-[30%]">
                        <label htmlFor="middleName" className="block text-sm text-slate-600">Middle Name</label>
                        <input
                            type="text"
                            id="middleName"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                    <div className="w-[80%] md:w-[30%]">
                        <label htmlFor="lastName" className="block text-sm text-slate-600">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="phoneNumber" className="block text-sm text-slate-600">Phone number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="email" className="block text-sm text-slate-600">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="country" className="block text-sm text-slate-600">Country</label>
                        <input
                            type="text"
                            id="country"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="city" className="block text-sm text-slate-600">City</label>
                        <input
                            type="text"
                            id="city"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                </div>

                <p className="mx-4 text-[16px]">User Details</p>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="title" className="block text-sm text-slate-600">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="yearExperience" className="block text-sm text-slate-600">Year of Experience</label>
                        <input
                            type="text"
                            id="yearExperience"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[95%]">
                        <label htmlFor="about" className="block text-sm text-slate-600">About me</label>
                        <TextField
                            id="about"
                            multiline
                            rows={6}
                            className="mt-1 text-sm border-none text-slate-600 w-full rounded-md outline-none bg-slate-100 shadow-sm"
                            placeholder="Tell us about yourself..."
                            fullWidth
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="quote" className="block text-sm text-slate-600">Quote</label>
                        <input
                            type="text"
                            id="quote"
                            className="mt-1 text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="cv" className="block text-slate-600">CV</label>
                        <input
                            type="file"
                            id="cv"
                            className="pt-1 block w-full text-sm text-slate-600 border border-gray-300 rounded-md shadow-sm bg-slate-100 py-[7px] px-2"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[80%] md:w-[46%]">
                        <label className="block text-slate-600">Links</label>
                        {fileInputs.map((input, index) => (
                            <div className="flex items-center mt-1" key={index}>
                                <input
                                    type="text"
                                    className="block outline-none w-[30%] text-sm text-slate-600 border border-gray-300 rounded-md shadow-sm bg-slate-100 py-[7px] px-2"
                                    onChange={(event) => handleNameChange(index, event)}
                                    placeholder='Link Name'
                                />
                                <div className="relative w-[38%] ml-2">

                                    <span className="absolute left-2 top-3 text-gray-500" onClick={handleAddInput}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="black" d="M15.729 3.884c1.434-1.44 3.532-1.47 4.693-.304c1.164 1.168 1.133 3.28-.303 4.72l-2.423 2.433a.75.75 0 0 0 1.062 1.059l2.424-2.433c1.911-1.919 2.151-4.982.303-6.838c-1.85-1.857-4.907-1.615-6.82.304L9.819 7.692c-1.911 1.919-2.151 4.982-.303 6.837a.75.75 0 1 0 1.063-1.058c-1.164-1.168-1.132-3.28.303-4.72z"></path><path fill="black" d="M14.485 9.47a.75.75 0 0 0-1.063 1.06c1.164 1.168 1.133 3.279-.303 4.72l-4.847 4.866c-1.435 1.44-3.533 1.47-4.694.304c-1.164-1.168-1.132-3.28.303-4.72l2.424-2.433a.75.75 0 0 0-1.063-1.059l-2.424 2.433c-1.911 1.92-2.151 4.982-.303 6.838c1.85 1.858 4.907 1.615 6.82-.304l4.847-4.867c1.911-1.918 2.151-4.982.303-6.837"></path></svg>
                                    </span>
                                    <input
                                        className="block outline-none w-full text-sm text-slate-600 border border-gray-300 rounded-md shadow-sm bg-slate-100 py-[7px] px-2"
                                        onChange={(event) => handleFileChange(index, event)}
                                    />
                                    <span className="absolute right-2 top-2 text-gray-500" onClick={handleAddInput}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" ><path fill="black" d="M12.75 7a.75.75 0 0 0-1.5 0v4.25H7a.75.75 0 0 0 0 1.5h4.25V17a.75.75 0 0 0 1.5 0v-4.25H17a.75.75 0 0 0 0-1.5h-4.25z"></path></svg>
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5 my-4">
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="hero-image" className="block text-sm text-slate-600">Hero Image</label>
                        <div className='flex items-center mt-1'>
                            <input
                                type="file"
                                id="hero-image"
                                accept="image/*"
                                onChange={handleHeroImageChange}
                                className="text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                            />
                            {heroImage && (
                                <img
                                    src={heroImage}
                                    alt="Hero"
                                    className="ml-3 w-16 h-16 rounded-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-[80%] md:w-[46%]">
                        <label htmlFor="about-image" className="block text-sm text-slate-600">About Image</label>
                        <div className='flex items-center mt-1'>
                            <input
                                type="file"
                                id="about-image"
                                accept="image/*"
                                onChange={handleAboutImageChange}
                                className="text-sm text-slate-600 ps-3 block w-full rounded-md outline-none border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                            />
                            {aboutImage && (
                                <img
                                    src={aboutImage}
                                    alt="About"
                                    className="ml-3 w-16 h-16 rounded-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="mx-10 mt-2 px-10 py-2 bg-gray-600 text-white rounded-md"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default Profile;
import { useState } from 'react';
import Portifolio from '../../feature/Dashboard/Portifolio';
import Profile from '../../feature/Dashboard/Profile';
import Service from '../../feature/Dashboard/Service/Service';
import SkillCategoryTable from '../../feature/Dashboard/SkillCategory/SkillCategoryTable';
import SkillTable from '../../feature/Dashboard/Skill/SkillTable';
import ProjectTable from '../../feature/Dashboard/Project/ProjectTable';
import ProjectCategoryTable from '../../feature/Dashboard/ProjectCategory/ProjectCategoryTable';
import Blog from '../../feature/Dashboard/Blog/Blog';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

// import Portifolio from './Portifolio';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('dashboard');
    const [dropDownPro, setdropDownPro] = useState(false)
    const [dropDownSkill, setdropDownSkill] = useState(false)
    const { isLoggedIn } = useAuth()

    const navigator = useNavigate();
    const { setUserData } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserData({ email: "", id: 0, role: "", token: null });
        navigator("/");
        //reload
        window.location.reload();
    };

    const skillDropDown = () => {
        setdropDownSkill(!dropDownSkill)
    }
    const projectDropDown = () => {
        setdropDownPro(!dropDownPro)
    }

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleContentChange = (content: any) => {
        setActiveContent(content);
    };
    if (isLoggedIn) {
        return (
            <div className="flex">
                <div
                    className={`fixed top-0 left-0 z-40 w-64 h-screen p-3 overflow-y-auto transition-transform border-r-2  ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white `}
                    aria-labelledby="drawer-navigation-label" >
                    <div id="drawer-navigation-label" className="text-base font-semibold flex align-middle items-center text-center gap-4 text-gray-500 ">
                        <div className="flex items-center justify-center bg-[#F57920] rounded-full w-12 h-12">
                            <div className="flex  items-center">
                                <span className="text-xl font-bold text-white">A</span>
                                <span className="text-xl font-bold text-white">K</span>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={toggleDrawer}
                        aria-controls="drawer-navigation"
                        className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center "
                    >
                        <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        {/* <span className="sr-only">Close menu</span> */}
                    </button>
                    <hr className='text-black shadow-lg my-1' />

                    <div className=" overflow-y-auto mt-7">
                        <ul className="space-y-2">
                            <li className='flex '>
                                <button
                                    onClick={() => handleContentChange('portifolio')}
                                    className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'portifolio' ? 'bg-[#F57920] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                                >
                                    <p className='flex items-center  '>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                            <path fill={`${activeContent === 'portifolio' ? "white" : "black"}`} d="M8 4.5A1.25 1.25 0 1 0 8 2a1.25 1.25 0 0 0 0 2.5"></path>
                                            <path fill={`${activeContent === 'portifolio' ? "white" : "black"}`} d="M8 4.5c.597 0 1.13.382 1.32.949l.087.26a.22.22 0 0 1-.21.291h-2.39a.222.222 0 0 1-.21-.291l.087-.26a1.39 1.39 0 0 1 1.32-.949zm-3 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z">
                                            </path><path fill={`${activeContent === 'portifolio' ? "white" : "black"}`} fillRule="evenodd" d="M2.33 1.64c-.327.642-.327 1.48-.327 3.16v6.4c0 1.68 0 2.52.327 3.16a3.02 3.02 0 0 0 1.31 1.31c.642.327 1.48.327 3.16.327h2.4c1.68 0 2.52 0 3.16-.327a3 3 0 0 0 1.31-1.31c.327-.642.327-1.48.327-3.16V4.8c0-1.68 0-2.52-.327-3.16A3 3 0 0 0 12.36.33C11.718.003 10.88.003 9.2.003H6.8c-1.68 0-2.52 0-3.16.327a3.02 3.02 0 0 0-1.31 1.31m6.87-.638H6.8c-.857 0-1.44 0-1.89.038c-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819c-.037.45-.038 1.03-.038 1.89v6.4c0 .857.001 1.44.038 1.89c.036.438.101.663.18.819c.192.376.498.682.874.874c.156.08.381.145.819.18c.45.036 1.03.037 1.89.037h2.4c.857 0 1.44 0 1.89-.037c.438-.036.663-.101.819-.18c.376-.192.682-.498.874-.874c.08-.156.145-.381.18-.82c.037-.45.038-1.03.038-1.89v-6.4c0-.856-.001-1.44-.038-1.89c-.036-.437-.101-.662-.18-.818a2 2 0 0 0-.874-.874c-.156-.08-.381-.145-.819-.18c-.45-.037-1.03-.038-1.89-.038" clipRule="evenodd">
                                            </path>
                                        </svg>
                                    </p>
                                    <span className="flex-1 ms-3 ">Portifolio</span>
                                </button>
                            </li>
                            <li className='flex '>
                                <button
                                    onClick={() => handleContentChange('profile')}
                                    className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'profile' ? 'bg-[#F57920] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                                >
                                    <p className='flex items-center  '>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 32 32">
                                            <path fill={`${activeContent === 'profile' ? "white" : "black"}`} d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z">
                                            </path></svg>
                                    </p>
                                    <span className="flex-1 ms-3 ">Profile</span>
                                </button>
                            </li>
                            <li className='flex'>
                                <button
                                    onClick={() => handleContentChange('service')}
                                    className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'service' ? 'bg-[#F57920] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                                >
                                    <p className='flex items-center  '>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                            <path fill={`${activeContent === 'service' ? "white" : "black"}`} d="M3 21h2.03v-6H3zm9.45 1l-2.93-.64l-2.93-.64A.76.76 0 0 1 6 20v-4a.7.7 0 0 1 .17-.47a.75.75 0 0 1 .43-.27l4.78-.59l4.79-.67l.15.55l.15.55a1 1 0 0 1-.56.9l-2 .5l-2 .5l1.62.65l1.62.65l2.28-.64l2.22-.66a.73.73 0 0 1 .58.07a.75.75 0 0 1 .36.47l.19.76l.2.77a.74.74 0 0 1-.54.9l-3.63 1l-3.63 1a1.5 1.5 0 0 1-.36.05a1.6 1.6 0 0 1-.37-.02m5.57-13.5l-3.5-2.25L11.02 4v9l3.5-2.25z"></path>
                                        </svg>
                                    </p>

                                    <span className="flex-1 ms-3 ">Service</span>
                                </button>
                            </li>
                            <li className='flex'>
                                <button
                                    onClick={() => handleContentChange('skills')}
                                    className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'skills' ? 'bg-[#F57920] text-white' : 'text-gray-900 hover:bg-gray-200 transition duration-200 ease-in-out'}`}
                                >
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512" >
                                            <path fill={`${activeContent === 'skills' ? "white" : "black"}`} d="M119.1 25v.1c-25 3.2-47.1 32-47.1 68.8c0 20.4 7.1 38.4 17.5 50.9L99.7 157L84 159.9c-13.7 2.6-23.8 9.9-32.2 21.5c-8.5 11.5-14.9 27.5-19.4 45.8c-8.2 33.6-9.9 74.7-10.1 110.5h44l11.9 158.4h96.3L185 337.7h41.9c0-36.2-.3-77.8-7.8-111.7c-4-18.5-10.2-34.4-18.7-45.9c-8.6-11.4-19.2-18.7-34.5-21l-16-2.5L160 144c10-12.5 16.7-30.2 16.7-50.1c0-39.2-24.8-68.8-52.4-68.8c-2.9 0-4.7-.1-5.2-.1M440 33c-17.2 0-31 13.77-31 31s13.8 31 31 31s31-13.77 31-31s-13.8-31-31-31M311 55v48H208v18h103v158h-55v18h55v110H208v18h103v32h80.8c-.5-2.9-.8-5.9-.8-9s.3-6.1.8-9H329V297h62.8c-.5-2.9-.8-5.9-.8-9s.3-6.1.8-9H329V73h62.8c-.5-2.92-.8-5.93-.8-9s.3-6.08.8-9zm129 202c-17.2 0-31 13.8-31 31s13.8 31 31 31s31-13.8 31-31s-13.8-31-31-31m0 160c-17.2 0-31 13.8-31 31s13.8 31 31 31s31-13.8 31-31s-13.8-31-31-31"></path>
                                        </svg>
                                    </p>

                                    <span className="flex-1 ms-3">Skill</span>
                                    <p onClick={skillDropDown}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                            <path fill={`${activeContent === 'skills' ? "white" : "black"}`} fillRule="evenodd" d="M16.53 8.97a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L12 12.44l3.47-3.47a.75.75 0 0 1 1.06 0" clipRule="evenodd"></path>
                                        </svg>

                                    </p>
                                </button>
                            </li>
                            {dropDownSkill && (
                                <ul className='block  bg-[#f5f5f5] py-3 font-normal rounded-lg  px-2 '>
                                    <li className=' p-2 hover:bg-gray-200 transition duration-200 ease-in-out rounded-md text-[15px]' onClick={() => handleContentChange('skills')}>Skills</li>
                                    <hr className='text-black shadow-lg ' />
                                    <li className='p-2 hover:bg-gray-200 transition duration-200 ease-in-out rounded-md text-[15px]' onClick={() => handleContentChange('skillCategory')}>Skill Category</li>
                                </ul>
                            )}
                            <li className='flex'>
                                <button
                                    onClick={() => handleContentChange('projects')}
                                    className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'projects' ? 'bg-[#F57920] text-white' : 'text-gray-900 hover:bg-gray-200 transition duration-200 ease-in-out'}`}
                                >
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                            <path fill={`${activeContent === 'projects' ? "white" : "black"}`} d="M8.75 7a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5zM7 11.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M9.75 15a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5z"></path>
                                            <path fill={`${activeContent === 'projects' ? "white" : "black"}`} d="M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H3.75A1.75 1.75 0 0 1 2 20.25Zm1.75-.25a.25.25 0 0 0-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25Z"></path>
                                        </svg>
                                    </p>

                                    <span className="flex-1 ms-3">Project</span>
                                    <p onClick={projectDropDown}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                            <path fill={`${activeContent === 'projects' ? "white" : "black"}`} fillRule="evenodd" d="M16.53 8.97a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L12 12.44l3.47-3.47a.75.75 0 0 1 1.06 0" clipRule="evenodd"></path>
                                        </svg>
                                    </p>
                                </button>
                            </li>
                            {dropDownPro && (
                                <ul className='block bg-[#f5f5f5] py-3 font-normal rounded-lg  px-2'>
                                    <li className=' p-2 hover:bg-gray-200 transition duration-200 ease-in-out rounded-md text-[15px]' onClick={() => handleContentChange('projects')}>Projects</li>
                                    <hr className='text-black shadow-lg s' />
                                    <li className='p-2 hover:bg-gray-200 transition duration-200 ease-in-out rounded-md text-[15px]' onClick={() => handleContentChange('projectCategory')}>Project Category</li>
                                </ul>
                            )}

                            <li className='flex'>
                                <button
                                    onClick={() => handleContentChange('blog')}
                                    className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'blog' ? 'bg-[#F57920] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                                >
                                    <p className='flex items-center  '>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 32 32" >
                                            <path fill={`${activeContent === 'blog' ? "white" : "black"}`} d="M4 24h10v2H4zm0-6h10v2H4zm22-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M6 6v6h20V6zm20 22h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2m-6-8v6h6v-6z"></path></svg>
                                    </p>

                                    <span className="flex-1 ms-3 ">Blog</span>
                                </button>
                            </li>

                            <li className='flex'>
                                <button
                                    onClick={() => handleContentChange('signout')}
                                    className={`flex items-center py-2 px-4 rounded-lg w-full text-left ${activeContent === 'signout' ? 'bg-[#F57920] text-white ' : 'text-gray-900  hover:bg-gray-100 '}`}
                                >
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><path fill={`${activeContent === 'signout' ? "white" : "black"}`} d="M17 2H7C5.3 2 4 3.3 4 5v6h8.6l-2.3-2.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4 4c.4.4.4 1 0 1.4l-4 4c-.4.4-1 .4-1.4 0s-.4-1 0-1.4l2.3-2.3H4v6c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3"></path></svg>
                                    </p>
                                    <span className="flex-1 ms-3 " onClick={handleLogout}>Sign out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className={`flex-1 p-4 transition-all duration-300 w-screen h-screen max-h-screen  ${isOpen ? 'ml-64 ' : 'ml-0'}`}>
                    {/*  w-screen h-screen max-h-screen */}
                    <div className="flex justify-between text-right mb-4">
                        <h1 className="text-xl font-semibold"></h1>
                        <button
                            className="text-white font-medium rounded-lg "
                            type="button"
                            onClick={toggleDrawer}
                            aria-controls="drawer-navigation"
                        >
                            {isOpen ? <><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="-5 -7 24 24"><path fill="gray" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"></path></svg></> : <><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="-5 -7 24 24"><path fill="black" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"></path></svg></>}
                        </button>
                    </div>

                    <hr className='text-black shadow-lg ' />

                    {activeContent === 'portifolio' && (
                        <div>
                            <Portifolio />
                        </div>
                    )}

                    {activeContent === 'profile' && (
                        <div>
                            <Profile />
                        </div>
                    )}

                    {activeContent === 'service' && (
                        <div>
                            <Service />
                        </div>
                    )}

                    {activeContent === 'skills' && (
                        <div>
                            <SkillTable />
                        </div>
                    )}
                    {activeContent === 'skillCategory' && (
                        <div>
                            <SkillCategoryTable />
                        </div>
                    )}
                    {activeContent === 'projects' && (
                        <div>
                            <ProjectTable />
                        </div>
                    )}
                    {activeContent === 'projectCategory' && (
                        <div>
                            <ProjectCategoryTable />
                        </div>
                    )}
                    {activeContent === 'blog' && (
                        <div>
                            <Blog />
                        </div>
                    )}
                    {activeContent === 'signout' && (
                        <div>
                            <p>Are you sure to signout</p>
                        </div>
                    )}

                </div>
            </div>
        );
    };
};

export default Dashboard;
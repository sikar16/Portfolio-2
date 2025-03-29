import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { MdNightlight, MdLightMode, MdBrightnessAuto } from 'react-icons/md';
import { useThemeData } from '../context/them_context';
import IconContainer from './icon/Icon_container';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { themeData, setThemeData } = useThemeData();

    const { isLoggedIn, isUser } = useAuth()

    if (isLoggedIn) {
        console.log(isUser)
    }
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.pageYOffset > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getThemeIcon = () => {
        if (themeData === "light") {
            return MdNightlight;
        } else if (themeData === "dark") {
            return MdLightMode;
        } else if (themeData === "system") {
            return MdBrightnessAuto;
        }
    };

    const toggleThemeData = () => {
        if (themeData === "light") {
            setThemeData("dark");
        } else if (themeData === "dark") {
            setThemeData("light");
        } else if (themeData === "system") {
            setThemeData("dark");
        }
    };

    return (
        <header
            className={`bg-gray-800 text-white py-4 px-6 sm:px-8 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 dark:text-red-900 ${isSticky
                ? 'lg:w-[96%] lg:mx-[2%] lg:rounded-[30px] py-3'
                : 'lg:w-full lg:mx-0 py-4'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="bg-[#FF7D00] w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                    SY
                </div>
                <span className="font-bold text-lg">Sikar Y.</span>
            </div>

            <nav className="hidden md:block">
                <ul className="flex gap-3">
                    <li className="relative group">
                        <a
                            href="#home"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            Home
                        </a>
                    </li>
                    <li className="relative group">
                        <a
                            href="#about"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            About
                        </a>
                    </li>
                    <li className="relative group">
                        <a
                            href="#service"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            Service
                        </a>
                        <ul className="absolute top-full left-0 bg-gray-800 py-2 px-4 rounded-lg shadow-lg mt-2 invisible group-hover:visible transition-opacity duration-300">
                        </ul>
                    </li>
                    <li className="relative group">
                        <a
                            href="#portfolio"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            Portfolio
                        </a>
                    </li>

                    <li className="relative group">
                        <a
                            href="#contact"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="flex items-center gap-4">
                <IconContainer
                    handler={toggleThemeData}
                    Icon={getThemeIcon()}
                    iconsClassName="my-custom-icon-class"
                    children={null}
                />
                {/* <div>
                    <Link to="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='hover:text-[#FF7D00] cursor-pointer'>
                            <path fill="currentColor" d="M9 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2m6 0h4c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2m6-13V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2" />
                        </svg>
                    </Link>
                </div> */}


                <button
                    onClick={toggleMobileMenu}
                    className="text-[20px] md:hidden focus:outline-none hover:text-[#FF7D00] transition-colors duration-300"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>



            {isMobileMenuOpen && (
                <div className="fixed top-16 left-0 right-0 bg-gray-800 p-4 rounded-lg shadow-lg md:hidden z-50">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <a
                                href="#home"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#service"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Service
                            </a>
                        </li>
                        <li>
                            <a
                                href="#portfolio"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Portfolio
                            </a>
                        </li>

                        <li>
                            <a
                                href="#contact"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;
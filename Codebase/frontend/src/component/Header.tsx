import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = ["Home", "About", "Service", "Portfolio", "Blog", "Contact"];

    return (
        <header
            className={`bg-gray-800 text-white py-4 px-6 sm:px-8 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky
                ? 'lg:w-[96%] lg:mx-[2%] lg:rounded-[30px] py-3'
                : 'lg:w-full lg:mx-0 py-4'
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="bg-[#FF7D00] w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                    MT
                </div>
                <span className="font-bold text-lg">Mihiretu T.</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
                <ul className="flex gap-3">
                    {navItems.map((item) => (
                        <li key={item} className="relative group">
                            <a
                                href="#"
                                className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                            >
                                {item}
                            </a>
                            {item === "Service" && (
                                <ul className="absolute top-full left-0 bg-gray-800 py-2 px-4 rounded-lg shadow-lg mt-2 invisible group-hover:visible transition-opacity duration-300">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 rounded-md hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                        >
                                            Web Development
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 rounded-md hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                        >
                                            Mobile App Development
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 rounded-md hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                        >
                                            UI/UX Design
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Dark/Light Mode Toggle and Mobile Menu Icon */}
            <div className="flex items-center gap-4">
                <button
                    aria-label="Toggle dark mode"
                    className="text-[20px] hover:text-[#FF7D00] transition-colors duration-300"
                >
                    <FaMoon />
                </button>
                <button
                    aria-label="Toggle light mode"
                    className="text-[20px] hover:text-[#FF7D00] transition-colors duration-300"
                >
                    <FaSun />
                </button>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="text-[20px] md:hidden focus:outline-none hover:text-[#FF7D00] transition-colors duration-300"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-16 left-0 right-0 bg-gray-800 p-4 rounded-lg shadow-lg md:hidden z-50">
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;
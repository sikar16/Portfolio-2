import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter, FaTelegram, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000); // Reset after 3 seconds
        }
    };

    return (
        <section className="bg-gray-900 text-white py-5 p-6 lg:ps-[6%]">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Let's Connect There</h1>
                <hr className="border-gray-700 my-3" />

                <div className="flex flex-col lg:flex-row justify-between items-start">
                    {/* Left Section - Logo and Social Media */}
                    <div className="mb-8 lg:mb-0 lg:w-1/3">
                        <div className="flex items-center mb-4">
                            <div className="bg-[#FF7D00] w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                                SY
                            </div>
                            <h2 className="text-2xl font-bold ml-4">Sikar Y</h2>
                        </div>
                        <p className="text-gray-400 mb-6 lg:w-full">
                            As a passionate designer and developer, I thrive on creating user-centric solutions that enhance the overall experience. My projects focus on blending functionality with aesthetics, ensuring that every interaction is seamless and enjoyable. I believe in the power of collaboration and continuously seek feedback to refine and elevate my work.
                        </p>
                        {/* <div className="flex space-x-6">
                            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition duration-300">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://github.com" className="text-gray-400 hover:text-white transition duration-300">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition duration-300">
                                <FaTwitter size={24} />
                            </a>
                        </div> */}
                        <div className="flex items-center gap-6 mt-6">
                            <a href="https://www.linkedin.com/in/sikaryosef-409821289" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-xl cursor-pointer hover:text-gray-400 transition" />
                            </a>
                            <a href="https://github.com/sikar16" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="text-xl cursor-pointer hover:text-gray-400 transition" />
                            </a>
                            <a href="https://t.me/Sikuta_16" target="_blank" rel="noopener noreferrer">
                                <FaTelegram className="text-xl cursor-pointer hover:text-gray-400 transition" />
                            </a>
                            <a href="https://www.instagram.com/siku_1.6" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-xl cursor-pointer hover:text-gray-400 transition" />
                            </a>
                        </div>
                    </div>

                    {/* Right Section - Contact, Navigation, and Hire Me */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:w-2/3">
                        {/* Contact Information */}
                        <div className="p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Contact</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <FaPhone className="text-blue-500" />
                                    <p className="text-gray-400">+251 963 79 70 62</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaEnvelope className="text-blue-500" />
                                    <p className="text-gray-400">sikarmahi6123@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Navigation</h2>
                            <ul className="space-y-4">
                                <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                                <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About </a></li>
                                <li><a href="#service" className="text-gray-400 hover:text-white transition duration-300">Service</a></li>
                                <li><a href="#portfolio" className="text-gray-400 hover:text-white transition duration-300">Portfolio</a></li>
                                <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
                            </ul>
                        </div>

                        {/* Hire Me Section */}
                        <div className="p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Hire Me</h2>
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7D00]"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#FF7D00] text-white py-2 px-4 rounded hover:bg-[#77491d] transition duration-300"
                                >
                                    {subscribed ? 'Subscribed!' : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
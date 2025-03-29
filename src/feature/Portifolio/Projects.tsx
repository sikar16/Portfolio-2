import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image3 from "../../assets/5.jpg";
import inventory1 from "../../assets/Inventory/Screenshot 2025-03-04 132756.png";
import inventory2 from "../../assets/Inventory/Screenshot 2025-03-04 132731.png";
import inventory3 from "../../assets/Inventory/Screenshot 2025-03-04 132827.png";
import inventory4 from "../../assets/Inventory/Screenshot 2025-03-04 142613.png";
import inventory5 from "../../assets/Inventory/Screenshot 2025-03-04 142629.png";
import explore2 from "../../assets/explore/Screenshot 2025-03-04 115057.png";
import explore3 from "../../assets/explore/Screenshot 2025-03-04 115134.png";
import explore4 from "../../assets/explore/Screenshot 2025-03-04 115152.png";
import bus1 from "../../assets/bus/Screenshot 2025-03-04 142955.png";
import bus2 from "../../assets/bus/Screenshot 2025-03-04 143013.png";
import bus3 from "../../assets/bus/Screenshot 2025-03-04 143137.png";
import bus4 from "../../assets/bus/Screenshot 2025-03-04 143147.png";
import bus5 from "../../assets/bus/Screenshot 2025-03-04 143208.png";
import bus6 from "../../assets/bus/Screenshot 2025-03-04 143217.png";
import bus7 from "../../assets/bus/Screenshot 2025-03-04 143232.png";
import song1 from "../../assets/song/Screenshot 2025-03-04 143731.png";
import song2 from "../../assets/song/Screenshot 2025-03-04 143737.png";
import song3 from "../../assets/song/Screenshot 2025-03-04 143757.png";
import song4 from "../../assets/song/Screenshot 2025-03-04 143806.png";
import song5 from "../../assets/song/Screenshot 2025-03-04 143818.png";
import song6 from "../../assets/song/Screenshot 2025-03-04 143825.png";
import song7 from "../../assets/song/Screenshot 2025-03-04 143841.png";


const projects = [
    {
        id: 1,
        title: "Infant Immunization Monitoring System",
        category: "Web Development",
        image: image3,
        tools: ["React", "Tailwind CSS", "Node.js", "Express", "MySQL"],
        liveDemo: "https://github.com/sikar16/CBTP_Infant_immunization_system",
        description:
            "Developed a comprehensive immunization monitoring system. Built a responsive web application using React and Tailwind CSS. Collected requirements, designed the UI, and implemented front-end components. Integrated front-end with back-end services using Express and MySQL. Ensured cross-browser compatibility and responsiveness. Created and maintained detailed project documentation.",
    },
    {
        id: 2,
        title: "Inventory Management System",
        category: "Web Development",
        image: inventory1,
        tools: ["React", "Tailwind CSS", "Node.js", "Express", "MySQL"],
        liveDemo: "https://github.com/sikar16/Inventory_managment_system",
        description:
            "Led the development and maintenance of a full-stack web application for inventory management and material requests, handling both front-end and back-end. Designed and implemented intuitive front-end UI components, ensuring a user-friendly experience. Integrated a MySQL database for tracking inventory and processing material requests. Managed the entire front-to-back integration, ensuring smooth interaction between the UI and server-side logic. Implemented authentication and role-based access control for secure user operations. Focused on system scalability, performance optimization, and cross-browser compatibility. Handled code reviews, debugging, and version control using Git throughout the project.",
    },
    {
        id: 3,
        title: "Inventory Management Design",
        category: "UI/UX Design",
        images: [inventory1, inventory2, inventory3, inventory4, inventory5], // Array of images
        tools: ["Figma"],
        liveDemo: "https://www.figma.com/proto/0HnDJsjoHPc0t5gkpajNWL/inventory-managment?node-id=121-852",
        description:
            "Designed the BlueSpark user interface using Figma, focusing on creating an intuitive and engaging user experience. This project involved collaboration with stakeholders to gather requirements and iteratively refine the design based on feedback.",
    },
    {
        id: 4,
        title: "Explore Ethiopia",
        category: "UI/UX Design",
        images: [explore2, explore3, explore4], // Array of images
        tools: ["Figma"],
        liveDemo: "https://www.figma.com/proto/sowSGxVWb20JfwS1xzIePf/Explore-Ethiopia-2?node-id=0-1",
        description:
            "Developed a design export for the Ethiopian project, ensuring brand consistency and usability across platforms.",
    },
    {
        id: 5,
        title: "Bus Ticketing System Design",
        category: "UI/UX Design",
        images: [bus1, bus2, bus3, bus4, bus5, bus6, bus7], // Array of images
        tools: ["Figma"],
        liveDemo: "https://www.figma.com/proto/NyuspgxnRz2TLecdu2A3Ic/Untitled?node-id=0-1",
        description:
            "Designed a comprehensive user interface for a bus ticketing system using Figma. The design focuses on user-friendly navigation, seamless ticket purchasing, and real-time updates on bus schedules. Collaborated with stakeholders to ensure the design meets user needs and enhances overall experience.",
    },
    {
        id: 6,
        title: "Song Application Design",
        category: "UI/UX Design",
        images: [song1, song2, song3, song4, song5, song6, song7], // Array of images
        tools: ["Figma"],
        liveDemo: "https://www.figma.com/proto/BUEHQLFpMxIzQXLSroMJsQ/Mezmur-app?node-id=0-1&fuid=1377968146075255870",
        description:
            "Created an intuitive user interface for a song application using Figma. The design emphasizes easy navigation, music discovery, and playlist management. Collaborated with users to gather feedback and iteratively improved the design for an optimal user experience.",
    },
];

const categories = ["All", "Web Development", "UI/UX Design"];

const PortfolioPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Auto-play state

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((project) => project.category === selectedCategory);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0); // Reset to the first image
    };

    const closeDetails = () => {
        setSelectedProject(null);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % (selectedProject.images?.length || 1)
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0
                ? (selectedProject.images?.length || 1) - 1
                : prevIndex - 1
        );
    };

    // Auto-play slideshow
    useEffect(() => {
        if (selectedProject && selectedProject.images && isAutoPlaying) {
            const interval = setInterval(() => {
                nextImage();
            }, 3000); // Change image every 3 seconds
            return () => clearInterval(interval);
        }
    }, [selectedProject, currentImageIndex, isAutoPlaying]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedProject) {
                if (e.key === "ArrowRight") {
                    nextImage();
                } else if (e.key === "ArrowLeft") {
                    prevImage();
                } else if (e.key === "Escape") {
                    closeDetails();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedProject, currentImageIndex]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" id="portfolio">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-black text-3xl md:text-4xl font-bold mb-8 text-center lg:text-left">
                    <span className="text-orange-500">My</span> Portfolio
                </h1>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${selectedCategory === category
                                ? "bg-[#FF7D00] text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleProjectClick(project)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={project.image || project.images?.[0]}
                                alt={project.title}
                                className="w-full h-48 object-scale-down rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
                            <p className="text-gray-600 text-sm mt-2">{project.category}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Project Details Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" // Add z-50 here
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDetails} // Close modal on outside click
                        >
                            <motion.div
                                className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            >
                                {/* Slideshow Container */}
                                <div className="relative">
                                    <img
                                        src={
                                            selectedProject.images
                                                ? selectedProject.images[currentImageIndex]
                                                : selectedProject.image
                                        }
                                        alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                                        className="w-full h-64 object-scale-down rounded-lg mb-4"
                                    />
                                    {/* Navigation Buttons */}
                                    {selectedProject.images && selectedProject.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity duration-300"
                                            >
                                                &lt;
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity duration-300"
                                            >
                                                &gt;
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Image Indicators (Dots) */}
                                {selectedProject.images && selectedProject.images.length > 1 && (
                                    <div className="flex justify-center gap-2 mt-4">
                                        {selectedProject.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentImageIndex === index
                                                    ? "bg-[#FF7D00]"
                                                    : "bg-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                <h2 className="text-2xl font-bold text-gray-800 mt-4">{selectedProject.title}</h2>
                                <p className="text-gray-600 text-sm mt-2">{selectedProject.category}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {selectedProject.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mt-4">{selectedProject.description}</p>
                                <div className="mt-6">
                                    <a
                                        href={selectedProject.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-[#FF7D00] text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
                                    >
                                        Live Demo
                                    </a>
                                    <button
                                        onClick={closeDetails}
                                        className="ml-4 inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PortfolioPage;
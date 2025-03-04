import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import hero from "../../assets/hero8.jpg"; // Adjust the path as necessary

function Hero() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Stagger animations for children
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 }, // Starting rotation
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, delay: 0.5 } },
    };

    return (
        <section className="relative bg-white text-gray-900">
            <div className="container mx-auto px-6 lg:px-20 py-20 flex flex-col lg:flex-row items-center">
                {/* Left Content */}
                <motion.div
                    className="text-center lg:text-left lg:w-1/2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold leading-tight"
                        variants={itemVariants}
                    >
                        Hi, I'm <span className="text-orange-500">Sikar Yosef</span>
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-lg text-gray-700"
                        variants={itemVariants}
                    >
                        Frontend Developer and Figma Designer
                    </motion.p>
                    <motion.div
                        className="mt-8 flex justify-center lg:justify-start space-x-4"
                        variants={itemVariants}
                    >
                        <motion.a
                            href="#portfolio"
                            className="px-6 py-3 bg-orange-500 text-white font-medium rounded-full transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View My Work
                        </motion.a>
                        <motion.a
                            href="#contact"
                            className="px-6 py-3 border border-orange-500 hover:bg-orange-600 text-orange-500 hover:text-white font-medium rounded-full transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right Content */}
                <motion.div
                    className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg">
                        <motion.img
                            src={hero}
                            alt="Sikar Yosef"
                            className="w-full h-full object-center"
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 opacity-20"></div>
        </section>
    );
}

export default Hero;
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPalette, faServer, faDatabase } from '@fortawesome/free-solid-svg-icons';

const ServicePage = () => {
    const services = [
        {
            icon: faCode, // Front-End Development
            title: 'Front-End Development',
            description: 'Creating responsive and user-friendly interfaces using HTML, CSS, JavaScript, React, and Tailwind CSS.',
        },
        {
            icon: faPalette, // UI/UX Design
            title: 'UI/UX Design',
            description: 'Designing intuitive and accessible interfaces with an emphasis on user experience using Figma.',
        },
        {
            icon: faServer, // Back-End Development
            title: 'Back-End Development',
            description: 'Building robust back-end systems using Node.js and MySQL for seamless data management and integration.',
        },
        {
            icon: faDatabase, // Full-Stack Development
            title: 'Full-Stack Development',
            description: 'Developing complete web solutions by integrating front-end and back-end technologies for optimal performance.',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            className="bg-gray-50 py-3 pt-8 pb-6"
            id='service'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto pb-10">
                <h2 className="text-black text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center lg:text-left">
                    My <span className="text-orange-500">Services</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FontAwesomeIcon
                                icon={service.icon}
                                className="text-4xl text-blue-500 mb-4"
                            />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {service.title}
                            </h2>
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ServicePage;
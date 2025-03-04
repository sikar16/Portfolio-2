import React from "react";
import image from "../../assets/hero2.png";

function AboutMe() {
    const handleDownload = () => {
        const cvUrl = "/Sikar Resume.pdf"; // File should be inside the public folder
        const link = document.createElement("a");
        link.href = cvUrl;
        link.setAttribute("download", "Sikar Resume.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <section className="relative mx-auto p-6 bg-[#efefef]" id="about">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start max-w-7xl mx-auto">

                {/* Profile Image */}
                <div className="lg:w-1/2 flex justify-center">
                    <div className="hidden md:block relative w-72 h-72 sm:w-96 sm:h-96 bg-[#ffd6b4] rounded-full md:flex items-center justify-center overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        {/* <img
                            src={image}
                            alt="Sikar Yosef"
                            className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                        /> */}
                        <img
                            src={image}
                            alt="Sikar Yosef"
                            className="w-full h-full object-center"
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 30 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                    </div>
                </div>

                {/* About Me Section */}
                <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        <span className="text-[#FEB273]">About</span> Me
                    </h2>
                    <hr className="w-16 h-1 bg-[#FEB273] mb-6" />
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        I am Sikar Yosef, a fourth-year Software Engineering student at Jimma University, Ethiopia, with a strong passion for front-end development. I am proficient in HTML, CSS, JavaScript, jQuery, React, Bootstrap, Tailwind CSS, C++, Java, and Figma for UI/UX design. I have practical experience in developing responsive web applications and have recently started learning Node.js for back-end development. My goal is to create user-friendly interfaces that emphasize performance and accessibility.
                    </p>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        className="bg-[#FEB273] hover:bg-[#d8945c] text-white font-bold py-2 px-6 rounded transition duration-300"
                    >
                        Download CV
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;

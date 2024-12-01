
function AboutMe() {
    return (
        <div className="absolute top-[110%] mx-auto p-4 bg-[#efefef]">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4 flex justify-center ">
                    <div className="relative w-[450px] h-[450px] bg-[#FEB273] rounded-full flex items-center justify-center overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        <img
                            src="image"
                            alt="Mihiretu Tigistu"
                            className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                        />
                    </div>
                </div>

                <div className="lg:w-[80%] h-fit bg-white p-6 rounded-lg shadow-lg me-[3%]">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        <span className="text-[#FEB273]">About</span> Me
                    </h2>
                    <hr className="w-16 h-1 bg-[#FEB273] mb-4" />
                    <p className="text-gray-600 mb-6 ">
                        I am Mihiretu Tigistu, a Full Stack Web Developer (MERN Stack) with a strong passion for coding. I am a self-learner,
                        motivated programmer, and team player who believes in the power of synergy. I possess expertise in the software development
                        lifecycle, utilizing technologies such as React, Node, Express, JavaScript, Bootstrap, jQuery, HTML5, CSS, MySQL, Visual Studio,
                        and Git. I have additional experience in Java, JavaFX, Flutter, Dart, C++, PHP, and Python. My goal is to develop customized applications
                        that add value and deliver exceptional results.lifecycle, utilizing technologies such as React, Node, Express, JavaScript, Bootstrap, jQuery, HTML5, CSS, MySQL, Visual Studio,
                        and Git. I have additional experience in Java, JavaFX, Flutter, Dart, C++, PHP, and Python. My goal is to develop customized applications
                        that add value and deliver exceptional results.
                    </p>
                    <button className="bg-[#FEB273] hover:bg-[#d8945c] text-white font-bold py-2 px-4 rounded mt-4 transition duration-300">
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
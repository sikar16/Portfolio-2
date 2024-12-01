function Hero() {
    return (
        <>
            <div className="mt-24 ">
                <div className="text-center ">
                    <div className="mt-3">
                        <button className="border border-black px-2 lg:px-4 py-[5px] rounded-3xl">Hello!</button>
                    </div>
                    <p className="text-[38px] font-semibold">I’m Abebe , <span className="block">Full stack and Mobile app developer </span></p>
                </div>
                <div className="relative  p-8 rounded-lg flex md:flex justify-around items-center  mt-1  xl:mx-[100px]">
                    <div className="lg:absolute  lg:top-52 left-0 transform ml-4 max-w-xs  hidden md:block ">
                        <blockquote className="text-gray-600 text-lg">
                            <p className=" text-gray-600 text-lg italic">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" ><path fill="black" fillRule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84z" clipRule="evenodd"></path></svg>
                                </span>
                                Great development is about crafting seamless experiences, whether through a website that balances.</p>
                        </blockquote>
                    </div>
                    <div className="relative z-10 flex flex-col items-center ">
                        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] sm:w-[400px] sm:h-[400px] xl:w-[500px] xl:h-[500px] bg-[#FEB273] rounded-full  flex items-center justify-center overflow-hidden">
                            <img src="image" alt="image" className="w-[115%] h-[115%] object-cover absolute bottom-10 rounded-l-lg left-1/2 transform -translate-x-1/2 " />
                        </div>
                        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex font-semibold text-center items-center">
                            <div className="p-2 border border-white bg-white bg-opacity-40 flex rounded-3xl text-center">
                                <button className="bg-[#FEB273] text-white px-6 rounded-s-full flex items-center space-x-2 shadow-lg">
                                    <span>Portfolio</span>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                                <button className="bg-transparent text-white px-6 py-2 rounded-e-full shadow-lg hover:bg-slate-200">Hire me</button>
                            </div>
                        </div>
                        <div className="absolute bottom-0 bg-[#ffffff]  hidden md:block w-full ">
                            <p></p>
                        </div>
                    </div>
                    <div className="absolute right-0 top-52  transform -translate-y-1/2 mr-4 text-center hidden md:block me-[10%] ">
                        <div className="text-gray-800 text-xl font-bold mt-2">
                            <span>
                                <div className="text-yellow-500 mr-1 text-sm">⭐⭐⭐⭐⭐</div>
                            </span>
                            2 Years
                        </div>
                        <div className="text-gray-500">Experience</div>
                    </div>
                    <div className="mt-8 md:hidden text-center">
                        <blockquote className="text-gray-600 text-lg">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" ><path fill="black" fillRule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84z" clipRule="evenodd"></path></svg>
                            </span>
                            <p className="ml-2 mt-2">Great development is about crafting seamless experiences, whether through a website that balances.</p>
                        </blockquote>
                        <div className="absolute right-0 top-52  transform -translate-y-1/2 mr-4 text-center hidden md:block me-[10%] ">
                            <div className="text-gray-800 text-xl font-bold mt-2">
                                <span>
                                    <div className="text-yellow-500 mr-1 text-sm">⭐⭐⭐⭐⭐</div>
                                </span>
                                2 Years
                            </div>
                            <div className="text-gray-500">Experience</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero

/**
 * // import hero from "../assets/hero.png"

// function Hero() {
//     return (
//         <>
//             <div className="mt-24 px-4 md:px-0">
//                 <div className="text-center">
//                     <div className="mt-3">
//                         <button className="border border-black px-4 py-2 rounded-full hover:bg-gray-200 transition">Hello!</button>
//                     </div>
//                     <p className="text-3xl md:text-4xl font-semibold">I’m Abebe , <span className="block">Full Stack and Mobile App Developer</span></p>
//                 </div>

//                 <div className="relative p-6 md:p-8 rounded-lg flex flex-col md:flex-row justify-around items-center mt-6">
//                     <div className="absolute top-24 left-0 transform ml-4 max-w-xs hidden md:block">
//                         <blockquote className="text-gray-600 text-lg">
//                             <i className="fas fa-quote-left text-2xl text-gray-400"></i>
//                             <p className="text-gray-600 text-lg italic">
//                                 Great development is about crafting seamless experiences, whether through a website that balances.
//                             </p>
//                         </blockquote>
//                     </div>

//                     <div className="relative z-10 flex flex-col items-center">
//                         <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-[500px] xl:h-[500px]  bg-[#FEB273] rounded-full flex items-center justify-center overflow-hidden">
//                             <img src={hero} alt="Portrait of a person in a shirt and tie" className="w-full h-full object-cover rounded-full" />
//                         </div>
//                         <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex font-semibold text-center items-center">
//                             <div className="p-2 border border-white bg-white bg-opacity-40 flex rounded-full text-center">
//                                 <button className="bg-[#FEB273] text-white px-4 py-2 rounded-l-full flex items-center space-x-2 shadow-lg hover:bg-[#FF9A00] transition">
//                                     <span>Portfolio</span>
//                                     <i className="fas fa-arrow-right"></i>
//                                 </button>
//                                 <button className="bg-transparent text-white px-4 py-2 rounded-r-full shadow-lg hover:bg-slate-200 transition">Hire me</button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="absolute right-0 top-24 transform -translate-y-1/2 mr-4 text-center hidden md:block">
//                         <div className="text-gray-800 text-xl font-bold mt-2">
//                             <div className="text-yellow-500 mr-1 text-sm">⭐⭐⭐⭐⭐</div>
//                             2 Years
//                         </div>
//                         <div className="text-gray-500">Experience</div>
//                     </div>

//                     <div className="mt-8 md:hidden text-center">
//                         <blockquote className="text-gray-600 text-lg">
//                             <span>
//                                 <i className="fas fa-quote-left text-2xl text-gray-400"></i>
//                             </span>
//                             <p className="ml-2 mt-2">Great development is about crafting seamless experiences, whether through a website that balances.</p>
//                         </blockquote>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Hero;
 */
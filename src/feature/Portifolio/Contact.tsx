import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";

const Contact = () => {
    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch("https://formspree.io/f/your-formspree-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                (e.target as HTMLFormElement).reset(); // Reset the form
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white py-5" id="contact">
            <h2 className="text-4xl font-bold text-gray-800 lg:ps-[6%]">
                <span className="">Contact</span>
            </h2>
            <section className="bg-gradient-to-b from-gray-100 to-white flex items-center justify-center px-6 py-12">
                <div className="w-[80%] bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
                    {/* Left Section - Contact Information */}
                    <div className="bg-gray-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <FaPhoneAlt className="text-xl" />
                                <span>+251 963 79 70 62</span>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FaEnvelope className="text-xl" />
                                <span>sikarmahi6123@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FaMapMarkerAlt className="text-xl" />
                                <span>Addis Ababa, Ethiopia</span>
                            </div>
                        </div>
                        {/* Social Icons */}
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

                    {/* Right Section - Contact Form */}
                    <div className="p-8 md:w-2/3 bg-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-600">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value="+251 965 19 96 82"
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Write your message..."
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none resize-none h-32"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
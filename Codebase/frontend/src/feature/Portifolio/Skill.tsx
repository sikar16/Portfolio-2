import React from "react";

const skillsData = [
    {
        category: "Programming Languages",
        skills: [
            { name: "JavaScript", level: 90 },
            { name: "Java", level: 50 },
            { name: "C++", level: 70 },
            { name: "SQL", level: 75 },
        ],
    },
    {
        category: "Web Development",
        skills: [
            { name: "React", level: 85 },
            { name: "HTML", level: 90 },
            { name: "CSS", level: 85 },
            { name: "Bootstrap", level: 75 },
            { name: "Tailwind CSS", level: 80 },
            { name: "Node", level: 60 },
        ],
    },
    {
        category: "Database Management",
        skills: [
            { name: "MySQL", level: 80 },
        ],
    },
];

const Skill = () => {
    return (
        <div className="bg-gray-100 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-black text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center">
                    My <span className="text-orange-500">Skills</span>
                </h2>
                <p className="text-gray-600 mb-8 md:mb-10 text-center">
                    I am a dedicated and versatile software engineer with a strong background in developing innovative and efficient software solutions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillsData.map((category) => (
                        <div key={category.category} className=" p-4 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{category.category}</h3>
                            <div className="flex flex-col space-y-4">
                                {category.skills.map((skill) => (
                                    <div key={skill.name} className="flex items-center">
                                        <span className="text-lg font-semibold text-gray-800 w-1/3">{skill.name}</span>
                                        <div className="w-2/3 bg-gray-300 rounded-full h-4">
                                            <div
                                                className="bg-orange-600 h-4 rounded-full transition-all duration-300"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                        <span className="text-gray-600 ml-4">{skill.level}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skill;
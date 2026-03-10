import React from "react";
import { Link } from 'react-router-dom';

// Mock data for student projects
const projects = [
  {
    id: 1,
    title: "AI-Powered Study Assistant",
    description:
      "An intelligent app that helps students organize study materials, create flashcards, and get personalized learning recommendations.",
    technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
    image:
      "/images/projects/ai.png",
    github: "https://github.com",
    demo: "https://demo.com",
    video: "https://youtube.com",
  },
  {
    id: 2,
    title: "Campus Connect",
    description:
      "A social platform for students to find study groups, share notes, and collaborate on projects across departments.",
    technologies: ["React Native", "Firebase", "Tailwind CSS", "Express"],
    image:
      "/images/projects/campus-connect.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    video: "https://youtube.com",
  },
  {
    id: 3,
    title: "Demo Project",
    description:
    "An intelligent app that helps students organize study materials, create flashcards, and get personalized learning recommendations.",
    technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],

    image:
      "/images/projects/campus-connect.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    video: "https://youtube.com",
  },
  {
    id: 4,
    title: "Demo Project",
    description:
    "An intelligent app that helps students organize study materials, create flashcards, and get personalized learning recommendations.",
    technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
    image:
      "/images/projects/campus-connect.jpg",
    github: "https://github.com/#",
    demo: "https://demo.com/#",
    video: "https://youtube.com/#",
  },
  {
    id: 5,
    title: "Course Scheduler Pro",
    description:
      "Intelligent course planning tool that helps students create optimal schedules based on requirements and preferences.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    image:
      "/images/projects/campus-connect.jpg",
    github: "https://github.com/#",
    demo: "https://demo.com/#",
    video: "https://youtube.com/#",
  },
];

const StudentProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Student Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover innovative projects built by students from the department of Computing and Data Analytics(ACSES).
              From AI applications to mobile apps, explore the future of tech.
            </p>
          </div>
          
          <Link 
           to="/submit-project"
           className="px-6 py-3 bg-acses-green-600 text-white font-medium rounded-lg shadow-md hover:bg-acses-green-700 hover:shadow-lg transform transition-all duration-200 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-acses-green-500 focus:ring-offset-2">
            Submit Your Project
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              
              {/* Project Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-acses-green-50 text-acses-green-700 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4 pt-4 border-t border-gray-100">

                  {/* GitHub */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-acses-green-600 transition-colors duration-200"
                  >
                    GitHub
                  </a>

                  {/* Demo */}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-acses-green-600 transition-colors duration-200"
                  >
                    Demo
                  </a>

                  {/* Video */}
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-acses-green-600 transition-colors duration-200"
                  >
                    Video
                  </a>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default StudentProjectsPage;
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, ExternalLink } from "lucide-react";

const lecturers = [
  {
    id: 59,
    name: "Engr Dr Albert Kofi Kwansah Ansah",
    role: "Head of Department",
    image: "https://www.umat.edu.gh/staffinfo/staffpix/afkansah211296852.jpg",
    field:
      "Blockchain Technology, Cyberspace Security, Cryptocurrencies, Mobile Computing and Communications",
    isHOD: true,
  },
  {
    id: 840,
    name: "Engr Dr Ezekiel Mensah Martey",
    role: "Patron",
    image: "/images/patrons/Dr_Martey.jpg",
    field:
      "Artificial Intelligence and Machine Learning, Software Engineering, Cloud Computing, Computer Programming",
    isPatron: true,
  },
  {
    id: 831,
    name: "Mr Evans Obu",
    role: "Lecturer",
    image: "/images/patrons/Mr_Obu.jpg",
    field:
      "Software Engineering, Cloud Computing, Educational Technology, Computer Networks and Security",
  },
  {
    id: 119,
    name: "Mr Thomas Kwantwi",
    role: "Lecturer",
    image: "/images/patrons/Mr_Kwantwi.jpg",
    field:
      "Computer Networks and Security, Computer Architecture, Embedded Systems Design, Database Systems",
  },
  {
    id: 0,
    name: "Dr Alfred Adutwum Amponsah",
    role: "Lecturer",
    image: "/images/lecturers/male-placeholder.png",
    field: "N/A",
  },
  {
    id: 59,
    name: "Mr Emmanuel Asante",
    role: "Lecturer",
    image: "/images/patrons/Asante.jpg",
    field:
      "Data Science and Analytics, Expert in Python || R || SQL || MATLAB || ML || AI",
  },
  {
    id: 0,
    name: "Dr Ernest Ampomah",
    role: "Lecturer",
    image: "/images/lecturers/male-placeholder.png",
    field: "N/A",
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Leadership = () => {
  const departmentalHeads = lecturers.filter((l) => l.isHOD || l.isPatron);
  const facultyMembers = lecturers.filter((l) => !l.isHOD && !l.isPatron);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#124824] pt-36 pb-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Leadership and Faculty
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
          Meet the dedicated leaders and faculty members driving excellence in
          Computer Science and Engineering education.
        </p>
      </section>

      {/* Departmental Heads */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Departmental Heads</h2>
            <div className="w-16 h-1 bg-[#124824] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto">
            {departmentalHeads.map((leader) => (
              <motion.div
                key={`${leader.id}-${leader.name}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
                    {leader.isHOD ? (
                      <GraduationCap className="w-5 h-5 text-[#124824]" />
                    ) : (
                      <Users className="w-5 h-5 text-[#124824]" />
                    )}
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                  <span className="inline-block px-4 py-1 rounded-full bg-[#124824] text-white text-sm font-medium mb-3">
                    {leader.role.toUpperCase()}
                  </span>
                  <p className="text-gray-600 text-sm mb-4">{leader.field}</p>
                  <a
                    href={`https://www.umat.edu.gh/staffinfo/staffDetailed.php?contactID=${leader.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#124824] text-sm flex items-center justify-center gap-1 hover:text-emerald-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Profile
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Members */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#124824] mb-2">
              Our Faculty Members
            </h2>
            <p className="text-gray-500 text-sm">
              Meet the experts shaping the future of technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {facultyMembers.map((lecturer, index) => (
              <motion.div
                key={`${lecturer.id}-${index}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={lecturer.image}
                    alt={lecturer.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-2 right-2 bg-[#124824] p-1.5 rounded-full shadow-md">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="p-4 text-center">
                  <h4 className="font-semibold text-base mb-1">
                    {lecturer.name}
                  </h4>
                  <div className="w-8 h-0.5 bg-[#124824] mx-auto mb-2 rounded-full" />
                  <p className="text-sm text-gray-500 mb-3">{lecturer.field}</p>
                  <a
                    href={`https://www.umat.edu.gh/staffinfo/staffDetailed.php?contactID=${lecturer.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#124824] text-sm flex items-center justify-center gap-1 hover:text-emerald-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Profile
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;

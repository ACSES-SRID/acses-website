import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Network, ExternalLink, GraduationCap } from "lucide-react";

const lecturers = [
  {
    id: 59,
    name: "Dr. Albert Kofi Kwansah Ansah",
    role: "Head of Department",
    image: "https://www.umat.edu.gh/staffinfo/staffpix/afkansah211296852.jpg",
    field:
      " Blockchain Technology",
    isHOD: true,
  },
  {
    id: 59,
    name: "Dr. Albert Kofi Kwansah Ansah",
    role: "Patron",
    image: "https://www.umat.edu.gh/staffinfo/staffpix/afkansah211296852.jpg",
    field:
      " Blockchain Technology ",
    isHOD: true,
  },

  {
    id: 59,
    name: "Prof. Yosh Ninja",
    role: "Lecturer",
    image: "https://www.umat.edu.gh/staffinfo/staffpix/afkansah211296852.jpg",
    field: "Ninja Moves, Silent Kills",
  },
  {
    id: 59,
    name: "Prof. Yosh Ninja",
    role: "Lecturer",
    image: "https://www.umat.edu.gh/staffinfo/staffpix/afkansah211296852.jpg",
    field: "Ninja Moves, Silent Kills",
  },
  {
    id: 59,
    name: "Prof. Yosh Ninja",
    role: "Lecturer",
    image: "https://www.umat.edu.gh/staffinfo/staffpix/afkansah211296852.jpg",
    field: "Ninja Moves, Silent Kills",
  },
  {
    id: 59,
    name: "Prof. Yosh Ninja",
    role: "Lecturer",
    image: "https://www.umat.edu.gh/staffinfo/staffpix/afkansah211296852.jpg",
    field: "Ninja Moves, Silent Kills",
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

const Patrons = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#124824]/10 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#124824] to-emerald-700"
        >
          Our Department Leadership
        </motion.h2>

        {/* Leadership Section */}
        <div className="grid md:grid-cols-2 gap-20 mb-20 max-w-6xl mx-auto">
          {lecturers
            .filter((lecturer) => lecturer.isHOD || lecturer.isPatron)
            .map((leader) => (
              <motion.div
                key={leader.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-[#124824] rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <a
                  href={`https://www.umat.edu.gh/staffinfo/staffDetailed.php?contactID=${leader.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative bg-white rounded-2xl p-4 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="relative w-full h-[17rem] lg:h-[18rem] mb-6" // Static dimensions
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
                        {leader.isHOD ? (
                          <Briefcase className="w-6 h-6 text-[#124824]" />
                        ) : (
                          <Network className="w-6 h-6 text-[#124824]" />
                        )}
                      </div>
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">{leader.name}</h3>
                      <span className="inline-block px-4 py-1 rounded-full bg-[#124824] text-white text-sm font-medium mb-3">
                        {leader.role}
                      </span>
                      <p className="text-gray-600 mb-4">{leader.field}</p>
                      <span className="text-[#124824] text-sm flex items-center justify-center gap-1 hover:text-emerald-700 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        View Profile
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
        </div>

        {/* Faculty Members Grid */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#124824] to-emerald-700"
        >
          Our Faculty Members
        </motion.h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {lecturers
            .filter((lecturer) => !lecturer.isHOD && !lecturer.isPatron)
            .map((lecturer) => (
              <motion.div
                key={lecturer.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute border inset-0 bg-[#124824]/5 rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <a
                  href={`https://www.umat.edu.gh/staffinfo/staffDetailed.php?contactID=${lecturer.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border relative bg-white rounded-xl p-3 hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    className="relative w-full h-[9.5rem] sm:h-[10.75rem] md:h-[13rem] mb-3 overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={lecturer.image}
                      alt={lecturer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md">
                      <GraduationCap className="w-4 h-4 text-[#124824]" />
                    </div>
                  </motion.div>
                  <div className="text-center">
                    <h4 className="text-base sm:text-lg font-semibold mb-1 group-hover:text-[#124824] transition-colors">
                      {lecturer.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      {lecturer.field}
                    </p>
                    <span className="text-[#124824] text-xs sm:text-sm flex items-center justify-center gap-1 hover:text-emerald-700">
                      <ExternalLink className="w-3 h-3" />
                      View Profile
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Patrons;

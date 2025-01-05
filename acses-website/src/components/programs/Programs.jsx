import { Code2, Database } from "lucide-react";

const Programs = () => {
  return (
    <section className="flex justify-center py-16 md:py-24 bg-gradient-to-br from-acses-green-800 via-acses-green-700 to-acses-green-900">
      <div className="container px-6 md:px-32">
        <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-center text-acses-yellow-50 sm:text-5xl md:text-6xl">
          Explore Our Programs
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Program Card: Computer Science & Engineering */}
          <div className="w-full transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Code2 className="w-10 h-10 text-acses-green-600" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Computer Science & Engineering
                </h3>
              </div>
              <p className="mb-4 text-gray-700">
                Our Computer Science & Engineering program offers a
                comprehensive curriculum that combines theoretical foundations
                with practical applications. Students learn software
                development, computer systems, algorithms, and more.
              </p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Software Engineering</li>
                <li>Computer Networks</li>
                <li>Artificial Intelligence</li>
                <li>Operating Systems</li>
                <li>Web Development</li>
              </ul>
            </div>
          </div>

          {/* Program Card: Data Science */}
          <div className="w-full transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Database className="w-10 h-10 text-acses-green-600" />
                <h3 className="text-2xl font-semibold text-gray-800">Data Science</h3>
              </div>
              <p className="mb-4 text-gray-700">
                The Data Science program equips students with the skills to
                analyze and interpret complex data. Students learn statistical
                methods, machine learning, and data visualization techniques.
              </p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Machine Learning</li>
                <li>Statistical Analysis</li>
                <li>Big Data Processing</li>
                <li>Data Visualization</li>
                <li>Predictive Modeling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;

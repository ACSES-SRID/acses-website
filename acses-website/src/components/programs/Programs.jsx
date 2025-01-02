import { Code2, Database } from "lucide-react"

const Programs = () => {
  return (
    <section className="py-16 flex justify-center md:py-24 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Our Programs
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Program Card: Computer Science & Engineering */}
          <div className="w-full border rounded-lg shadow-md p-6 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <Code2 className="w-8 h-8 text-gray-700" />
              <h3 className="text-xl font-semibold">
                Computer Science & Engineering
              </h3>
            </div>
            <div>
              <p className="text-gray-600 mb-4">
                Our Computer Science & Engineering program offers a
                comprehensive curriculum that combines theoretical foundations
                with practical applications. Students learn software
                development, computer systems, algorithms, and more.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Software Engineering</li>
                <li>Computer Networks</li>
                <li>Artificial Intelligence</li>
                <li>Operating Systems</li>
                <li>Web Development</li>
              </ul>
            </div>
          </div>

          {/* Program Card: Data Science */}
          <div className="w-full border rounded-lg shadow-md p-6 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-8 h-8 text-gray-700" />
              <h3 className="text-xl font-semibold">Data Science</h3>
            </div>
            <div>
              <p className="text-gray-600 mb-4">
                The Data Science program equips students with the skills to
                analyze and interpret complex data. Students learn statistical
                methods, machine learning, and data visualization techniques.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
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

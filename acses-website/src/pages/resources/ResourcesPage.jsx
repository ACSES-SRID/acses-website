import { useState } from "react";

const Github = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const W3Schools = () => (
  <svg viewBox="0 0 24 24" fill="#04AA6D" className="w-6 h-6">
    <path d="M3.428 0L0 24l12-3.755L24 24 20.572 0zm11.91 8.581l-.392 4.479-3.047.93 3.047.93-.443 5.069-3.5-1.29L8.5 19.989l-.443-5.069 3.047-.93-3.047-.93-.392-4.479 3.439 1.268L13.938 8.581z"/>
  </svg>
);

const VSCode = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="#007ACC"/>
  </svg>
);

const Swift = () => (
  <svg viewBox="0 0 24 24" fill="#FA7343" className="w-6 h-6">
    <path d="M21.985 16.785a9.662 9.662 0 0 1-.64 1.235c-.337.54-.614.914-.83 1.118-.332.305-.687.46-1.068.47-.273 0-.602-.078-.984-.237-.384-.158-.737-.236-1.062-.236-.34 0-.703.078-1.09.236-.387.16-.699.243-.94.251-.365.016-.727-.144-1.09-.48-.234-.217-.522-.602-.863-1.155-.37-.593-.675-1.28-.914-2.065-.256-.845-.384-1.664-.384-2.457 0-.907.196-1.689.588-2.34.308-.524.718-.937 1.23-1.24.511-.302 1.063-.457 1.658-.466.29 0 .67.09 1.144.266.472.176.776.265.909.265.099 0 .435-.104 1.003-.312.537-.193 1.01-.273 1.418-.241.99.08 1.736.47 2.234 1.175-.885.537-1.323 1.289-1.314 2.252.008.75.28 1.374.813 1.868.242.23.512.408.812.534-.065.189-.134.37-.208.544zM18.04.783c0 .588-.215 1.137-.64 1.645-.515.602-1.138.95-1.815.895a1.829 1.829 0 0 1-.014-.222c0-.564.246-1.168.683-1.662.218-.25.496-.459.833-.626.336-.164.655-.255.955-.27.009.08.013.16.013.24z"/>
  </svg>
);

const tags = {
  "Software Development": "bg-green-100 text-green-800",
  "Computer Networks": "bg-green-100 text-green-800",
  AI: "bg-green-100 text-green-800",
  "Machine Learning": "bg-green-100 text-green-800",
  "Data Visualization": "bg-green-100 text-green-800",
  "Artificial Intelligence": "bg-green-100 text-green-800",
};

const academicResources = [
  {
    title: "Computer Lab Work",
    description:
      "Structured practical exercises and lab guides designed to strengthen your hands-on skills. Improve problem-solving ability and reinforce classroom concepts through real-world applications.",
    tags: ["Software Development", "Computer Networks", "AI"],
  },
  {
    title: "Numerical Analysis",
    description:
      "Comprehensive study materials explaining computational methods, numerical techniques, and mathematical problem-solving approaches needed to excel in computer engineering coursework.",
    tags: ["Software Development", "Computer Networks", "AI"],
  },
  {
    title: "Intro. to Python Programming",
    description:
      "A beginner-friendly resource covering programming fundamentals, logic-building, algorithms and real-world examples to help students develop strong foundational coding skills.",
    tags: ["Machine Learning", "Data Visualization", "Artificial Intelligence"],
  },
  {
    title: "Java Programming",
    description:
      "Well-organized resources covering Java syntax, object-oriented principles, and application development, so that students confidently build and manage Java-based projects.",
    tags: ["Machine Learning", "Data Visualization", "Artificial Intelligence"],
  },
];

const tools = [
  { name: "GitHub", icon: <Github /> },
  { name: "w3Schools", icon: <W3Schools /> },
  { name: "VS Code", icon: <VSCode /> },
  { name: "Swift Code", icon: <Swift /> },
];

const careerResources = [
  {
    title: "CV Template",
    description:
      "A professionally structured CV template designed for computer science students.",
  },
  {
    title: "Interview Checklist",
    description:
      "A practical guide to help you prepare for interviews in the tech industry.",
  },
  {
    title: "LinkedIn Guide",
    description:
      "Practical tips to optimize your LinkedIn profile and build a strong professional network.",
  },
  {
    title: "Git Fundamentals",
    description:
      "Essential guides to version control collaboration and managing projects with Git and GitHub.",
  },
];

const FILTERS = ["All", "Academic Materials", "Tools & Platforms", "Career & Internships"];

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const showAcademic = activeFilter === "All" || activeFilter === "Academic Materials";
  const showTools = activeFilter === "All" || activeFilter === "Tools & Platforms";
  const showCareer = activeFilter === "All" || activeFilter === "Career & Internships";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Header */}
      <div className="text-center py-12 px-4 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Resources</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Explore our range of academic, professional and extracurricular initiatives
          designed to prepare you for the future of tech.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-green-700 text-white shadow"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-green-600 hover:text-green-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-10">

        {/* Data Science Banner */}
        {showAcademic && (
          <div className="rounded-2xl bg-green-800 text-white px-8 py-8">
            <h2 className="text-2xl font-bold mb-2">Data Science Resources</h2>
            <p className="text-green-200 text-sm max-w-sm">
              Level up with these essential tools and platforms that can enhance your data science skills.
            </p>
            <button className="mt-4 text-sm font-semibold text-white flex items-center gap-1 hover:underline">
              View Resources <span>›</span>
            </button>
          </div>
        )}

        {/* Academic Materials Grid */}
        {showAcademic && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {academicResources.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3"
                >
                  <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-xs font-semibold text-green-800 hover:underline text-left mt-1">
                    Learn More »
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools & Platforms */}
        {showTools && (
          <section>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Tools & Platforms</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                  >
                    {tool.icon}
                    <span className="text-xs font-medium text-gray-700">{tool.name}</span>
                  </div>
                ))}
              </div>
              <button className="text-xs font-semibold text-green-800 hover:underline mt-4 block">
                Learn More »
              </button>
            </div>
          </section>
        )}

        {/* Career & Internships */}
        {showCareer && (
          <section>
            <div className="rounded-2xl bg-green-800 text-white px-8 py-6 mb-5">
              <h2 className="text-xl font-bold">Career & Internships Corner</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {careerResources.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3"
                >
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{item.description}</p>
                  <button className="text-xs font-semibold text-green-800 hover:underline text-left mt-1">
                    Learn More »
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Have a resource to share */}
        <div className="text-center py-6 border-t border-gray-200">
          <span className="text-sm text-gray-600">Have a resource to share? </span>
          <button className="text-sm font-semibold text-green-800 hover:underline">
            Suggest a resource
          </button>
        </div>
      </div>
    </div>
  );
}
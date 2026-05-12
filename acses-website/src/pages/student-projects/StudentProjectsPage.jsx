import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApi, unwrapList } from "../../utils/api";

const normalizeProject = (project) => ({
  id: project._id || project.id,
  ...project,
  technologies: Array.isArray(project.technologies) ? project.technologies : [],
  github: project.github?.trim() || "",
  demo: project.demo?.trim() || "",
  video: project.video?.trim() || "",
  image: project.image || "https://via.placeholder.com/640x360.png?text=Project",
});

const StudentProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchApi("/api/student-projects?limit=100");
        const list = unwrapList(data);
        const normalized = list.map(normalizeProject);
        normalized.sort((a, b) => {
          const ta = new Date(a.createdAt || 0).getTime();
          const tb = new Date(b.createdAt || 0).getTime();
          return tb - ta;
        });
        setProjects(normalized);
      } catch (err) {
        console.error("Failed to load student projects from API:", err);
        setError("We could not load projects. Please try again later.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const linkOrNull = (href, label) => {
    if (!href || href === "#") return null;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-acses-green-600 transition-colors duration-200">
        {label}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Projects</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover innovative projects built by students from the department of Computing and Data Analytics (ACSES). Projects listed here are
              published on the site after admin review.
            </p>
          </div>

          <Link
            to="/submit-project"
            className="px-6 py-3 bg-acses-green-600 text-white font-medium rounded-lg shadow-md hover:bg-acses-green-700 hover:shadow-lg transform transition-all duration-200 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-acses-green-500 focus:ring-offset-2"
          >
            Submit Your Project
          </Link>
        </div>

        {loading && <p className="text-center text-gray-500 py-16">Loading projects…</p>}
        {!loading && error && <p className="text-center text-red-600 py-16">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-gray-500 py-16 max-w-lg mx-auto">
            No featured projects yet. Approved submissions from the department will appear here.
          </p>
        )}

        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const gh = linkOrNull(project.github, "GitHub");
              const dm = linkOrNull(project.demo, "Demo");
              const vid = linkOrNull(project.video, "Video");
              const links = [gh, dm, vid].filter(Boolean);
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    {project.submittedBy && <p className="text-sm text-gray-400 mb-2">By {project.submittedBy}</p>}
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-acses-green-50 text-acses-green-700 text-sm font-medium rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {links.length > 0 && (
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">{links}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProjectsPage;

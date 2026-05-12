import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "./AdminContext";
import { exportToCsv } from "./adminUtils";
import { fetchApi, unwrapList } from "../../utils/api";

/** Draft submissions (e.g. from the public form) are listed last, oldest → newest within each group. */
const sortProjectsForAdmin = (normalized) => {
  const drafts = normalized.filter((p) => p.status === "draft");
  const rest = normalized.filter((p) => p.status !== "draft");
  const byCreated = (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
  rest.sort(byCreated);
  drafts.sort(byCreated);
  return [...rest, ...drafts];
};

const normalizeProject = (item) => {
  const id = item._id || item.id;
  const technologies = Array.isArray(item.technologies) ? item.technologies : [];
  const status = item.status || "pending";
  const approved = status === "approved";
  const student = item.submittedBy || item.student || "";
  return {
    id,
    ...item,
    status,
    technologies,
    approved,
    student,
  };
};

const AdminStudentProjects = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    student: "",
    description: "",
    technologies: "",
    image: "",
    github: "",
    demo: "",
    video: "",
    approved: false,
  });

  const loadProjects = async () => {
    try {
      const data = await fetchApi("/api/student-projects/all?limit=100", { auth: true });
      const list = unwrapList(data);
      setProjects(sortProjectsForAdmin(list.map(normalizeProject)));
    } catch (error) {
      console.error("Failed to load projects from API:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const saveProjects = (items) => {
    setProjects(sortProjectsForAdmin(items.map(normalizeProject)));
  };

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          (project.student || "").toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.join(", ").toLowerCase().includes(query)
        );
      }),
    [projects, searchQuery]
  );

  if (!hasAccess("student-projects")) {
    return (
      <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
        <p className="text-lg font-semibold">Access denied</p>
        <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to manage student projects.</p>
      </div>
    );
  }

  const resolveStatusForSave = () => {
    if (form.approved) return "approved";
    if (editingId) {
      const prev = projects.find((p) => p.id === editingId);
      if (prev?.status === "draft") return "draft";
      return "pending";
    }
    return "pending";
  };

  const buildPayload = () => {
    const technologies = form.technologies.split(",").map((item) => item.trim()).filter(Boolean);
    return {
      title: form.title,
      description: form.description,
      technologies,
      image: form.image,
      github: form.github,
      demo: form.demo,
      video: form.video || undefined,
      submittedBy: form.student,
      status: resolveStatusForSave(),
    };
  };

  const handleSave = async () => {
    if (!form.title || !form.student || !form.description) {
      showToast("Title, submitter name and description are required.", "error");
      return;
    }

    const payload = buildPayload();

    try {
      if (editingId) {
        await fetchApi(`/api/student-projects/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          auth: true,
        });
        setProjects(
          sortProjectsForAdmin(
            projects.map((project) => (project.id === editingId ? normalizeProject({ ...project, ...payload, _id: editingId }) : project))
          )
        );
        showToast("Project updated successfully.");
      } else {
        await fetchApi("/api/student-projects", {
          method: "POST",
          body: JSON.stringify(payload),
          auth: true,
        });
        await loadProjects();
        showToast("Project added.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast(error instanceof Error ? error.message : "Failed to save project.", "error");
    }

    setEditingId(null);
    setForm({ title: "", student: "", description: "", technologies: "", image: "", github: "", demo: "", video: "", approved: false });
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      student: project.student || project.submittedBy || "",
      description: project.description,
      technologies: project.technologies.join(", "),
      image: project.image || "",
      github: project.github || "",
      demo: project.demo || "",
      video: project.video || "",
      approved: project.approved || project.status === "approved",
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Delete this student project permanently?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/student-projects/${id}`, { method: "DELETE", auth: true });
          saveProjects(projects.filter((project) => project.id !== id));
          showToast("Project deleted.");
        } catch (error) {
          console.error("API delete failed:", error);
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  const approvedCount = projects.filter((project) => project.approved || project.status === "approved").length;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
        <h1 className="text-2xl font-semibold text-white">Student Projects / Initiatives</h1>
        <p className="mt-2 text-sm text-acses-yellow-100">
          Student form submissions appear as <span className="font-semibold text-white">draft</span> at the bottom of the list until you approve them
          for the public page.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-white/70">
              Approved (live on site): <span className="font-semibold text-white">{approvedCount}</span>
            </p>
            <button
              onClick={() => exportToCsv("acses-student-projects.csv", projects)}
              className="rounded-2xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300"
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-acses-green-800 bg-acses-green-900">
            <table className="min-w-full border-collapse text-left text-sm text-white/70">
              <thead className="bg-acses-green-900 text-acses-yellow-100">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Submitter</th>
                  <th className="px-4 py-3">Technologies</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-t border-acses-green-800 last:border-b last:border-acses-green-800 hover:bg-acses-green-900/60">
                    <td className="px-4 py-3 text-white">{project.title}</td>
                    <td className="px-4 py-3">{project.student}</td>
                    <td className="px-4 py-3">{project.technologies.join(", ")}</td>
                    <td className="px-4 py-3 capitalize">{project.status}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="rounded-2xl bg-acses-green-800 px-3 py-2 text-xs text-acses-yellow-300 hover:bg-acses-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="rounded-2xl bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-acses-yellow-200">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <h2 className="text-lg font-semibold text-white">{editingId ? "Edit project" : "Add project (admin)"}</h2>
          <p className="mt-1 text-xs text-white/50">Check “Approved” to publish on the public student projects page.</p>
          <div className="mt-5 space-y-4">
            <Field label="Project title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
            <Field label="Submitted by" value={form.student} onChange={(value) => setForm({ ...form, student: value })} />
            <TextArea label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
            <Field label="Technologies (comma-separated)" value={form.technologies} onChange={(value) => setForm({ ...form, technologies: value })} />
            <Field label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
            <Field label="GitHub URL" value={form.github} onChange={(value) => setForm({ ...form, github: value })} />
            <Field label="Demo URL" value={form.demo} onChange={(value) => setForm({ ...form, demo: value })} />
            <Field label="Video URL" value={form.video} onChange={(value) => setForm({ ...form, video: value })} />
            <div className="flex items-center gap-3">
              <input
                id="approved"
                type="checkbox"
                checked={form.approved}
                onChange={(e) => setForm({ ...form, approved: e.target.checked })}
                className="h-4 w-4 rounded border-acses-green-800 bg-acses-green-900 text-amber-400 focus:ring-amber-400"
              />
              <label htmlFor="approved" className="text-sm text-white/70">
                Approved (visible on public projects page)
              </label>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm({ title: "", student: "", description: "", technologies: "", image: "", github: "", demo: "", video: "", approved: false });
                  }}
                  className="rounded-2xl border border-acses-green-800 px-4 py-3 text-sm text-white/80 hover:bg-acses-green-800"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSave}
                className="rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300"
              >
                {editingId ? "Save project" : "Add project"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <textarea rows="4" value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

export default AdminStudentProjects;

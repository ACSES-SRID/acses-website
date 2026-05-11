import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "./AdminContext";
import { exportToCsv } from "./adminUtils";
import { fetchApi } from "../../utils/api";

const AdminStudentProjects = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", student: "", description: "", technologies: "", image: "", github: "", demo: "", approved: false });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchApi("/api/student-projects");
        const normalized = data.map((item) => ({
          id: item._id || item.id,
          ...item,
          technologies: Array.isArray(item.technologies) ? item.technologies : [],
        }));
        setProjects(normalized);
      } catch (error) {
        console.error("Failed to load projects from API:", error);
        setProjects([]);
      }
    };
    loadProjects();
  }, []);

  const saveProjects = (items) => {
    setProjects(items);
  };

  const filteredProjects = useMemo(
    () => projects.filter((project) => {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.student.toLowerCase().includes(query) ||
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

  const handleSave = async () => {
    if (!form.title || !form.student || !form.description) {
      showToast("Title, student and description are required.", "error");
      return;
    }

    const technologies = form.technologies.split(",").map((item) => item.trim()).filter(Boolean);
    const payload = {
      title: form.title,
      description: form.description,
      technologies,
      image: form.image,
      github: form.github,
      demo: form.demo,
      video: form.demo,
    };

    try {
      if (editingId) {
        await fetchApi("/api/student-projects", {
          method: "PUT",
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        setProjects(projects.map((project) => (project.id === editingId ? { id: editingId, ...payload, technologies } : project)));
        showToast("Project updated successfully.");
      } else {
        const result = await fetchApi("/api/student-projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        const newId = result.id || `project-${Date.now()}`;
        setProjects([...projects, { id: newId, ...payload, technologies }]);
        showToast("Project added successfully.");
      }
    } catch (error) {
      console.error("API save failed:", error);
      showToast("Failed to save project.", "error");
    }

    setEditingId(null);
    setForm({ title: "", student: "", description: "", technologies: "", image: "", github: "", demo: "", approved: false });
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      student: project.student,
      description: project.description,
      technologies: project.technologies.join(", "),
      image: project.image,
      github: project.github,
      demo: project.demo,
      approved: project.approved,
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Delete this student project permanently?",
      onConfirm: async () => {
        try {
          await fetchApi("/api/student-projects", {
            method: "DELETE",
            body: JSON.stringify({ id }),
          });
        } catch (error) {
          console.error("API delete failed:", error);
        }
        saveProjects(projects.filter((project) => project.id !== id));
        showToast("Project deleted.");
      },
    });
  };

  const approvedCount = projects.filter((project) => project.approved).length;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
        <h1 className="text-2xl font-semibold text-white">Student Projects / Initiatives</h1>
        <p className="mt-2 text-sm text-acses-yellow-100">Approve student submissions and manage the details for public display.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-white/70">Approved projects: <span className="font-semibold text-white">{approvedCount}</span></p>
            <button onClick={() => exportToCsv("acses-student-projects.csv", projects)} className="rounded-2xl bg-acses-yellow-400 px-4 py-2 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-acses-green-800 bg-acses-green-900">
            <table className="min-w-full border-collapse text-left text-sm text-white/70">
              <thead className="bg-acses-green-900 text-acses-yellow-100">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Technologies</th>
                  <th className="px-4 py-3">Approved</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-t border-acses-green-800 last:border-b last:border-acses-green-800 hover:bg-acses-green-900/60">
                    <td className="px-4 py-3 text-white">{project.title}</td>
                    <td className="px-4 py-3">{project.student}</td>
                    <td className="px-4 py-3">{project.technologies.join(", ")}</td>
                    <td className="px-4 py-3">{project.approved ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleEdit(project)} className="rounded-2xl bg-acses-green-800 px-3 py-2 text-xs text-acses-yellow-300 hover:bg-acses-green-700">Edit</button>
                      <button onClick={() => handleDelete(project.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-acses-yellow-200">No projects found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
          <h2 className="text-lg font-semibold text-white">{editingId ? "Edit project" : "Add new project"}</h2>
          <div className="mt-5 space-y-4">
            <Field label="Project title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
            <Field label="Student name" value={form.student} onChange={(value) => setForm({ ...form, student: value })} />
            <TextArea label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
            <Field label="Technologies" value={form.technologies} onChange={(value) => setForm({ ...form, technologies: value })} />
            <Field label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
            <Field label="GitHub URL" value={form.github} onChange={(value) => setForm({ ...form, github: value })} />
            <Field label="Demo URL" value={form.demo} onChange={(value) => setForm({ ...form, demo: value })} />
            <div className="flex items-center gap-3">
              <input id="approved" type="checkbox" checked={form.approved} onChange={(e) => setForm({ ...form, approved: e.target.checked })} className="h-4 w-4 rounded border-acses-green-800 bg-acses-green-900 text-amber-400 focus:ring-amber-400" />
              <label htmlFor="approved" className="text-sm text-white/70">Approved for display</label>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {editingId && <button onClick={() => { setEditingId(null); setForm({ title: "", student: "", description: "", technologies: "", image: "", github: "", demo: "", approved: false }); }} className="rounded-2xl border border-acses-green-800 px-4 py-3 text-sm text-white/80 hover:bg-acses-green-800">Cancel</button>}
              <button onClick={handleSave} className="rounded-2xl bg-acses-yellow-400 px-4 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">{editingId ? "Save project" : "Add project"}</button>
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



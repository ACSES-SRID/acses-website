import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { exportToCsv } from "../lib/adminUtils";
import { fetchApi, unwrapList } from "../../../utils/api";
import {
  PageShell, PageHeader, TwoColLayout,
  Panel, PanelEmpty, FormPanel, FormActions,
  CardRow, RowActions, Pill,
  Field, TextArea, Select, ExportBtn, BlockedAccess,
} from "../layout/adminUI";

const PUBLICATION_STATUSES = [
  { value: "pending", label: "Pending (hidden from public page)" },
  { value: "approved", label: "Approved (published on public page)" },
];

const sortProjectsForAdmin = (normalized) => {
  const pending = normalized.filter((p) => p.status === "pending");
  const rest = normalized.filter((p) => p.status !== "pending");
  const byCreated = (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
  rest.sort(byCreated);
  pending.sort(byCreated);
  return [...rest, ...pending];
};

const normalizeProject = (item) => {
  const id = item._id || item.id;
  const technologies = Array.isArray(item.technologies) ? item.technologies : [];
  const status = (item.status || "pending") === "approved" ? "approved" : "pending";
  return { id, ...item, status, technologies, approved: status === "approved", student: item.submittedBy || item.student || "" };
};

const AdminStudentProjects = () => {
  const { searchQuery, showToast, openConfirm, hasAccess } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "", student: "", description: "", technologies: "",
    image: "", github: "", demo: "", video: "", status: "pending",
  });

  const loadProjects = async () => {
    try {
      const data = await fetchApi("/api/student-projects/all?limit=100", { auth: true });
      setProjects(sortProjectsForAdmin(unwrapList(data).map(normalizeProject)));
    } catch (error) {
      console.error("Failed to load projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => { loadProjects(); }, []);

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

  if (!hasAccess("student-projects")) return <BlockedAccess message="Your role does not have permission to manage student projects." />;

  const approvedCount = projects.filter((p) => p.approved || p.status === "approved").length;

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", student: "", description: "", technologies: "", image: "", github: "", demo: "", video: "", status: "pending" });
  };

  const buildPayload = () => ({
    title: form.title,
    description: form.description,
    technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    image: form.image,
    github: form.github,
    demo: form.demo,
    video: form.video || undefined,
    submittedBy: form.student,
    status: form.status === "approved" ? "approved" : "pending",
  });

  const handleSave = async () => {
    if (!form.title || !form.student || !form.description) {
      showToast("Title, submitter name and description are required.", "error");
      return;
    }
    const payload = buildPayload();
    try {
      if (editingId) {
        await fetchApi(`/api/student-projects/${editingId}`, { method: "PUT", body: JSON.stringify(payload), auth: true });
        setProjects(sortProjectsForAdmin(
          projects.map((p) => (p.id === editingId ? normalizeProject({ ...p, ...payload, _id: editingId }) : p))
        ));
        showToast("Project updated successfully.");
      } else {
        await fetchApi("/api/student-projects", { method: "POST", body: JSON.stringify(payload) });
        await loadProjects();
        showToast("Project added.");
      }
      resetForm();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to save project.", "error");
    }
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
      status: project.status === "approved" ? "approved" : "pending",
    });
  };

  const handleDelete = (id) => {
    openConfirm({
      message: "Delete this student project permanently?",
      onConfirm: async () => {
        try {
          await fetchApi(`/api/student-projects/${id}`, { method: "DELETE", auth: true });
          setProjects(sortProjectsForAdmin(projects.filter((p) => p.id !== id).map(normalizeProject)));
          showToast("Project deleted.");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Delete failed.", "error");
        }
      },
    });
  };

  return (
    <PageShell>
      <PageHeader
        title="Student Projects"
        subtitle={`Submissions are pending until approved for the public page. ${approvedCount} currently live.`}
        badge={projects.length}
      />

      <TwoColLayout>
        {/* ── List ── */}
        <Panel
          toolbar={
            <>
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-acses-yellow-100/60">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
                </p>
                <span className="rounded-full bg-acses-yellow-400/20 border border-acses-yellow-400/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-acses-yellow-300">
                  {approvedCount} live
                </span>
              </div>
              <ExportBtn onClick={() => exportToCsv("acses-student-projects.csv", projects)} />
            </>
          }
        >
          <div className="divide-y divide-acses-green-800">
            {filteredProjects.length === 0 ? (
              <PanelEmpty message="No projects found." hint="Add one using the form on the right." />
            ) : (
              filteredProjects.map((project) => (
                <CardRow key={project.id} isActive={editingId === project.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Pill
                          label={project.status}
                          variant={project.status === "approved" ? "active" : "muted"}
                        />
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{project.title}</p>
                      <p className="mt-0.5 text-xs text-white/40 truncate">{project.student}</p>

                      {/* Tech tags */}
                      {project.technologies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded-full bg-acses-green-800 border border-acses-green-700 text-[10px] text-white/50">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-0.5 rounded-full bg-acses-green-800 border border-acses-green-700 text-[10px] text-white/30">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <RowActions onEdit={() => handleEdit(project)} onDelete={() => handleDelete(project.id)} />
                  </div>
                </CardRow>
              ))
            )}
          </div>
        </Panel>

        {/* ── Form ── */}
        <FormPanel title={editingId ? "Edit Project" : "Add Project"}>
          <Field label="Project Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Campus Navigator App" />
          <Field label="Submitted By" value={form.student} onChange={(v) => setForm({ ...form, student: v })} placeholder="Student name" />
          <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Describe the project…" rows={3} />
          <Field label="Technologies (comma-separated)" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} placeholder="React, Node.js, MongoDB" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="GitHub URL" value={form.github} onChange={(v) => setForm({ ...form, github: v })} placeholder="https://github.com/…" />
            <Field label="Demo URL" value={form.demo} onChange={(v) => setForm({ ...form, demo: v })} placeholder="https://…" />
          </div>

          <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://…" />
          <Field label="Video URL" value={form.video} onChange={(v) => setForm({ ...form, video: v })} placeholder="https://youtube.com/…" />

          <Select
            label="Publication Status"
            value={form.status}
            options={PUBLICATION_STATUSES}
            onChange={(v) => setForm({ ...form, status: v })}
          />

          {/* Status hint */}
          <div className="rounded-2xl bg-acses-green-800/60 border border-acses-green-700 px-4 py-3 flex items-start gap-3">
            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${form.status === "approved" ? "bg-acses-yellow-400" : "bg-white/30"}`} />
            <p className="text-xs text-white/50 leading-relaxed">
              {form.status === "approved"
                ? "This project will appear on the public /student-projects page."
                : "This project is hidden from the public page until approved."}
            </p>
          </div>

          <FormActions
            editingId={editingId}
            onCancel={resetForm}
            onSubmit={handleSave}
            submitLabel={editingId ? "Save Project" : "Add Project"}
          />
        </FormPanel>
      </TwoColLayout>
    </PageShell>
  );
};

export default AdminStudentProjects;
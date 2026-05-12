import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../utils/api";

const SubmitProjectPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: false, error: "" });
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    github: "",
    demo: "",
    video: "",
    submittedBy: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });
    if (!form.title.trim() || !form.description.trim() || !form.submittedBy.trim()) {
      setStatus({ loading: false, error: "Title, description, and your name are required." });
      return;
    }
    const technologies = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    try {
      await fetchApi("/api/student-projects", {
        method: "POST",
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          technologies,
          image: form.image.trim() || undefined,
          github: form.github.trim() || undefined,
          demo: form.demo.trim() || undefined,
          video: form.video.trim() || undefined,
          submittedBy: form.submittedBy.trim(),
          status: "draft",
        }),
      });
      navigate("/student-projects", { replace: true });
    } catch (err) {
      setStatus({ loading: false, error: err instanceof Error ? err.message : "Submission failed." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Project</h1>

        <p className="text-gray-600 mb-6">
          Share your project with the ACSES community. Your submission is saved as a draft for the admin team to review; it will appear on this site
          only after it is approved and published.
        </p>

        {status.error && <p className="mb-4 text-sm text-red-600">{status.error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="submittedBy">
              Your name
            </label>
            <input
              id="submittedBy"
              type="text"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-acses-green-600"
              placeholder="Full name"
              value={form.submittedBy}
              onChange={(e) => handleChange("submittedBy", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Project Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-acses-green-600"
              placeholder="Enter project title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="description">
              Project Description
            </label>
            <textarea
              id="description"
              className="w-full border rounded-lg p-3"
              rows="4"
              placeholder="Describe your project"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="technologies">
              Technologies (comma-separated)
            </label>
            <input
              id="technologies"
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="React, Node.js, MongoDB"
              value={form.technologies}
              onChange={(e) => handleChange("technologies", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Screenshot / image URL
            </label>
            <input
              id="image"
              type="url"
              className="w-full border rounded-lg p-3"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="github">
              GitHub Repository
            </label>
            <input
              id="github"
              type="url"
              className="w-full border rounded-lg p-3"
              placeholder="https://github.com/..."
              value={form.github}
              onChange={(e) => handleChange("github", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="demo">
              Demo Link
            </label>
            <input
              id="demo"
              type="url"
              className="w-full border rounded-lg p-3"
              placeholder="https://yourdemo.com"
              value={form.demo}
              onChange={(e) => handleChange("demo", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="video">
              Video Link (Optional)
            </label>
            <input
              id="video"
              type="url"
              className="w-full border rounded-lg p-3"
              placeholder="https://youtube.com/..."
              value={form.video}
              onChange={(e) => handleChange("video", e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="bg-acses-green-600 text-white px-6 py-3 rounded-lg hover:bg-acses-green-700 transition disabled:opacity-60"
          >
            {status.loading ? "Submitting…" : "Submit Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProjectPage;

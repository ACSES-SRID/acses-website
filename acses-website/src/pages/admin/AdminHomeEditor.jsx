import React, { useEffect, useState } from "react";
import { useAdmin } from "./AdminContext";
import { fetchApi } from "../../utils/api";

const AdminHomeEditor = () => {
  const { showToast, hasAccess } = useAdmin();
  const [home, setHome] = useState({ presidentMessage: "", hodMessage: "", statistics: {} });

  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await fetchApi("/api/home");
        setHome(data);
      } catch (error) {
        console.error("Failed to load home data from API:", error);
        setHome({ presidentMessage: "", hodMessage: "", statistics: {} });
      }
    };
    loadHome();
  }, []);

  const handleChange = (field, value) => {
    setHome((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatistic = (key, value) => {
    setHome((prev) => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        [key]: Number(value),
      },
    }));
  };

  const saveHome = async () => {
    try {
      await fetchApi("/api/home", {
        method: "PUT",
        body: JSON.stringify(home),
      });
      showToast("Home page messages and statistics updated.");
    } catch (error) {
      console.error("API save failed:", error);
      showToast("Failed to save home page content.", "error");
    }
  };

  if (!hasAccess("home-editor")) {
    return (
      <div className="rounded-3xl border border-red-700 bg-acses-green-900 p-6 text-white/80">
        <p className="text-lg font-semibold">Access denied</p>
        <p className="mt-2 text-sm text-acses-yellow-100">Your role does not have permission to edit home page content.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 px-6 py-5 shadow-xl shadow-acses-green-900/20">
        <h1 className="text-2xl font-semibold text-white">Home Page Editor</h1>
        <p className="mt-2 text-sm text-acses-yellow-100">Update the president and HoD messages plus student statistics shown on the public homepage.</p>
      </div>

      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
        <h2 className="text-xl font-semibold text-white">Leadership messages</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <TextArea label="President message" value={home.presidentMessage} onChange={(value) => handleChange("presidentMessage", value)} />
          <TextArea label="HoD message" value={home.hodMessage} onChange={(value) => handleChange("hodMessage", value)} />
        </div>
      </div>

      <div className="rounded-3xl border border-acses-green-800 bg-acses-green-900 p-6 shadow-xl shadow-acses-green-900/20">
        <h2 className="text-xl font-semibold text-white">Student statistics</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <NumericField label="Total members" value={home.statistics.members || 0} onChange={(value) => handleStatistic("members", value)} />
          <NumericField label="Active projects" value={home.statistics.activeProjects || 0} onChange={(value) => handleStatistic("activeProjects", value)} />
          <NumericField label="Volunteer hours" value={home.statistics.volunteerHours || 0} onChange={(value) => handleStatistic("volunteerHours", value)} />
          <NumericField label="Partners" value={home.statistics.partners || 0} onChange={(value) => handleStatistic("partners", value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={saveHome} className="rounded-2xl bg-acses-yellow-400 px-6 py-3 text-sm font-semibold text-acses-green-900 hover:bg-acses-yellow-300">Save updates</button>
      </div>
    </div>
  );
};

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <textarea rows="5" value={value} onChange={(e) => onChange(e.target.value)} className="mt-3 w-full rounded-3xl border border-acses-green-800 bg-acses-green-900 px-4 py-4 text-white outline-none" />
  </div>
);

const NumericField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white/70">{label}</label>
    <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className="mt-3 w-full rounded-3xl border border-acses-green-800 bg-acses-green-900 px-4 py-3 text-white outline-none" />
  </div>
);

export default AdminHomeEditor;



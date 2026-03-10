import React from "react";

const SubmitProjectPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Submit Your Project
        </h1>

        <p className="text-gray-600 mb-6">
          Share your project with the ACSES community. Provide details and links
          to showcase your work.
        </p>

        <form className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Title
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-acses-green-600"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Description
            </label>
            <textarea
              className="w-full border rounded-lg p-3"
              rows="4"
              placeholder="Describe your project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              GitHub Repository
            </label>
            <input
              type="url"
              className="w-full border rounded-lg p-3"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Demo Link
            </label>
            <input
              type="url"
              className="w-full border rounded-lg p-3"
              placeholder="https://yourdemo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Video Link (Optional)
            </label>
            <input
              type="url"
              className="w-full border rounded-lg p-3"
              placeholder="https://youtube.com/..."
            />
          </div>

          <button
            type="submit"
            className="bg-acses-green-600 text-white px-6 py-3 rounded-lg hover:bg-acses-green-700 transition"
          >
            Submit Project
          </button>

        </form>
      </div>
    </div>
  );
};

export default SubmitProjectPage;
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';

// Pages
import Home from "./pages/home/Home";
import Error404 from "./pages/error/Error404";
import Gallery from "./pages/gallery/Gallery";
import Leadership from "./pages/leadership/Leadership";
import ProgramsPage from "./pages/programs/ProgramsPage";
import ResourcesPage from "./pages/resources/ResourcesPage";
import StorePage from "./pages/store/StorePage";
import StudentProjectsPage from "./pages/student-projects/StudentProjectsPage";
import SubmitProjectPage from "./pages/student-projects/SubmitProjectPage";
import Admin from "./pages/admin/Admin";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminLeadership from "./pages/admin/AdminLeadership";
import AdminResources from "./pages/admin/AdminResources";
import AdminStore from "./pages/admin/AdminStore";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminStudentProjects from "./pages/admin/AdminStudentProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminHomeEditor from "./pages/admin/AdminHomeEditor";

// Layout
import RouteLayout from "./layouts/RouteLayout.jsx";
import { API_BASE_URL } from "./utils/api";

// Public pages share RouteLayout, while admin pages use their own dashboard shell.
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RouteLayout />}>
        <Route index element={<Home />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="store" element={<StorePage />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="student-projects" element={<StudentProjectsPage />} />
        <Route path="submit-project" element={<SubmitProjectPage />} />
      </Route>

      <Route path="admin" element={<Admin />}>
        <Route index element={<AdminOverview />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="executives" element={<AdminLeadership />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="leadership" element={<AdminLeadership />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="store" element={<AdminStore />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="student-projects" element={<AdminStudentProjects />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="home-editor" element={<AdminHomeEditor />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </>
  )
);

function App() {
  return (
    <>
      <AppInitializer />
      <RouterProvider router={routes} />
      <Analytics />
    </>
  );
}

function AppInitializer() {

  useEffect(() => {
    // Wake the CDN/API server using an actual endpoint. This helps when the API
    // is hosted on a free/sleeping service that needs a first request.
    const timer = setTimeout(() => {
      fetch(`${API_BASE_URL}/health`)
        .then((res) => {
          if (!res.ok) throw new Error("API endpoint not reachable");
          return res.json();
        })
        .then(() => console.log("Server awake"))
        .catch((err) => console.error("Error waking up server:", err));
    });

    return () => clearTimeout(timer);
  });

  return null;
}

export default App;

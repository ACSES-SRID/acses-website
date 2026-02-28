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

// Layout
import RouteLayout from "./layouts/RouteLayout.jsx";

// Create routes
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="leadership" element={<Leadership />} />
      <Route path="programs" element={<ProgramsPage />} />
      <Route path="resources" element={<ResourcesPage />} />
      <Route path="store" element={<StorePage />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="student-projects" element={<StudentProjectsPage />} />
      <Route path="*" element={<Error404 />} />
    </Route>
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
    // Wake server
    const timer = setTimeout(() => {
      fetch("https://acses-cdn.onrender.com")
        .then((res) => res.json())
        .then((data) => console.log("Server awake"))
        .catch((err) => console.error("Error waking up server:", err));
    });

    return () => clearTimeout(timer);
  });

  return null;
}

export default App;

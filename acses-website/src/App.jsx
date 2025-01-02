import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import Home from "./pages/home/Home";
import Error404 from "./pages/error/Error404";
import Gallery from "./pages/gallery/Gallery";
import Executives from "./pages/executives/Executives";

// Layout
import RouteLayout from "./layouts/RouteLayout.jsx";

// Create routes
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="gallery/" element={<Gallery />} />
      <Route path="executives/" element={<Executives />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App

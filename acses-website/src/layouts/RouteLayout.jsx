import "./routeLayout.css";
import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/navbar/NavBar";
import Footer from "../components/shared/footer/Footer";

const RouteLayout = () => {
  return (
    <div className="route-layout main flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RouteLayout;

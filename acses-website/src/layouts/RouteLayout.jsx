import "./routeLayout.css";
import { Outlet } from "react-router-dom";

const RouteLayout = () => {
  return (
      <div className="route-layout main">
        <Outlet />
      </div>
  );
};

export default RouteLayout;

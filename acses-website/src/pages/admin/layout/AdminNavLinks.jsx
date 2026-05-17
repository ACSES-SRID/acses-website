import { NavLink } from "react-router-dom";
import { ADMIN_NAV_ITEMS } from "./adminNavConfig";

const desktopClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
    isActive 
      ? "bg-acses-green-800 text-acses-yellow-300 shadow-sm" 
      : "text-white/70 hover:bg-acses-green-800/50 hover:text-white"
  }`;

const mobileClass = ({ isActive }) =>
  `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
    isActive ? "bg-acses-green-800 text-acses-yellow-300" : "text-white/70 hover:bg-acses-green-800 hover:text-white"
  }`;

export default function AdminNavLinks({ hasAccess, variant = "desktop", onItemClick, isCollapsed }) {
  return (
    <>
      {ADMIN_NAV_ITEMS.map((item) => {
        if (["store", "users", "home-editor"].includes(item.key) && !hasAccess(item.key)) return null;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            onClick={onItemClick}
            title={isCollapsed ? item.label : ""}
            className={variant === "mobile" ? mobileClass : desktopClass}
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            {(!isCollapsed || variant === "mobile") && (
              <span className="truncate whitespace-nowrap overflow-hidden transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </NavLink>
        );
      })}
    </>
  );
}
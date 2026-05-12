import { NavLink } from "react-router-dom";
import { ADMIN_NAV_ITEMS } from "./adminNavConfig";

const desktopClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
    isActive ? "bg-acses-green-800 text-acses-yellow-300" : "text-white/70 hover:bg-acses-green-800 hover:text-white"
  }`;

const mobileClass = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-sm font-medium transition ${
    isActive ? "bg-acses-green-800 text-acses-yellow-300" : "text-white/70 hover:bg-acses-green-800 hover:text-white"
  }`;

/**
 * Shared nav links for every authenticated admin screen (lg sidebar + mobile sheet).
 */
export default function AdminNavLinks({ hasAccess, variant = "desktop", onItemClick }) {
  const classNameFn = variant === "mobile" ? mobileClass : desktopClass;

  return (
    <>
      {ADMIN_NAV_ITEMS.map((item) => {
        if (item.key === "store" && !hasAccess("store")) return null;
        if (item.key === "users" && !hasAccess("users")) return null;
        if (item.key === "home-editor" && !hasAccess("home-editor")) return null;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            onClick={onItemClick}
            className={classNameFn}
          >
            {variant === "mobile" ? (
              <>
                {item.icon} {item.label}
              </>
            ) : (
              <>
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </>
  );
}

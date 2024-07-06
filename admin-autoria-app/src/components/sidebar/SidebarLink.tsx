import { NavLink, useLocation } from "react-router-dom";

import React from "react";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  activeCondition?: (pathname: string) => boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, activeCondition }) => {
  const { pathname } = useLocation();
  const isActive = activeCondition ? activeCondition(pathname) : pathname.includes(to);

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${isActive && "bg-slate-900 rounded-xl"}`}>
      <NavLink
        end
        to={to}
        className={`block text-slate-200 truncate transition duration-150 ${isActive ? "hover:text-slate-200" : "hover:text-white"}`}
      >
        <div className="flex items-center">
          <div>
            <Icon className={`${isActive ? "text-indigo-500" : "text-slate-400"}`} />
          </div>
          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default SidebarLink;

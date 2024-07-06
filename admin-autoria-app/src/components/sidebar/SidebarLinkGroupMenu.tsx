import { NavLink } from "react-router-dom";

import React from "react";

interface SidebarLinkGroupMenuProps {
  open: boolean;
  links: { to: string; label: string }[];
}

const SidebarLinkGroupMenu: React.FC<SidebarLinkGroupMenuProps> = ({ open, links }) => {
  return (
    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
      <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
        {links.map((link, index) => (
          <li key={index} className="mb-1 last:mb-0">
            <NavLink
              end
              to={link.to}
              className={({ isActive }) =>
                "block transition duration-150 truncate " + (isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200")
              }
            >
              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                {link.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLinkGroupMenu;

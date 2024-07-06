import React from "react";

interface SidebarLinkGroupMenuItemProps {
  href: string;
  icon: React.ElementType;
  isActive: boolean;
  children: React.ReactNode;
  handleClick: (e: React.MouseEvent) => void;
}

const SidebarLinkGroupTitle: React.FC<SidebarLinkGroupMenuItemProps> = ({
  href,
  icon: Icon,
  isActive,
  children,
  handleClick,
}) => {
  return (
    <a
      href={href}
      className={`block text-slate-200 truncate transition duration-150 ${isActive ? "hover:text-slate-200" : "hover:text-white"}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex w-full">
          <div>
            <Icon className={`${isActive ? "text-indigo-500" : "text-slate-400"}`} />
          </div>
          <span className="flex justify-between text-sm w-full font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
            {children}
          </span>
        </div>
      </div>
    </a>
  );
};

export default SidebarLinkGroupTitle;

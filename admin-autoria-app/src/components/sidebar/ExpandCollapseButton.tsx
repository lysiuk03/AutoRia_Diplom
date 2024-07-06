import { IconArrowBarRight } from "@tabler/icons-react";

import React from "react";

interface IExpandCollapseButtonProps {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

const ExpandCollapseButton: React.FC<IExpandCollapseButtonProps> = (props) => {
  const { sidebarExpanded, setSidebarExpanded } = props;

  return (
    <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
      <div className="px-3 py-2">
        <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          <span className="sr-only">Expand / collapse sidebar</span>
          <IconArrowBarRight className="w-6 h-6 text-slate-400 sidebar-expanded:rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default ExpandCollapseButton;

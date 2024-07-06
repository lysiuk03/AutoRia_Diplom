import { IconChevronDown } from "@tabler/icons-react";

import React from "react";

interface ChevronDownProps {
    open: boolean;
}

const ChevronDown: React.FC<ChevronDownProps> = (props) => {
    const { open } = props;

    return (
        <div className="flex shrink-0 ml-2">
            <IconChevronDown
                className={`w-5 h-5 shrink-0 ml-1 fill-current text-slate-400 ${open ? "rotate-180" : ""}`}
            />
        </div>
    );
};

export default ChevronDown;

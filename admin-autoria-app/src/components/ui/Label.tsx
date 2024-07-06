import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const labelVariants = cva("block mb-2 text-gray-900 dark:text-white", {
  variants: {
    variant: {
      default: "font-medium font-main",
    },
    size: {
      default: "text-md",
      small: "text-md mb-0 flex items-center gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, size, ...props }, ref) => (
  <label ref={ref} className={classNames(labelVariants({ variant, size }), className)} {...props} />
));
export default Label;

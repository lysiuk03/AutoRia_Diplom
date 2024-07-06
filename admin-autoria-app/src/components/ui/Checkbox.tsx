import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const checkboxVariants = cva("rounded focus:ring-0 focus:ring-offset-0", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "w-4 h-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, size, variant, ...props }, ref) => {
  return <input type="checkbox" className={classNames(checkboxVariants({ variant, size }), className)} ref={ref} {...props} />;
});

export default Checkbox;

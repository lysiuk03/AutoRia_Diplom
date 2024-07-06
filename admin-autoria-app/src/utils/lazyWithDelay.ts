import { lazy } from "react";

export const lazyWithDelay = (importFunction: () => Promise<any>) =>
  lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(importFunction()), 600);
      }),
  );

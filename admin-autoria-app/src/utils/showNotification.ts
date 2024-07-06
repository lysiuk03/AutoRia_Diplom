import { Slide, ToastOptions, toast } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

export const showNotification = (message: string, type: ToastType = "info") => {
  const options: ToastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
    theme: "light",
    transition: Slide,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
  }
};

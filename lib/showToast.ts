import { Flip, Slide, toast, Zoom } from "react-toastify";

import type { ToastPosition } from "react-toastify";

type optionProps = {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: number | undefined;
  theme: string;
  transition: typeof Slide;
};

export const showToast = (type: string, message: string) => {
  let options: optionProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
  };

  switch (type) {
    case "info":
      toast.info(message, options);
    case "success":
      toast.success(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "dafault":
      toast(message, options);
      break;
  }
};

// <ToastContainer
//   position="top-right"
//   autoClose={5000}
//   hideProgressBar={false}
//   newestOnTop={false}
//   closeOnClick={false}
//   rtl={false}
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover
//   theme="dark"
//   transition={Slide}
// />;

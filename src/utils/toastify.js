import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const toastSuccess = (msg) =>
  toast.success(msg, defaultOptions);

export const toastError = (msg) =>
  toast.error(msg, defaultOptions);

export const toastInfo = (msg) =>
  toast.info(msg, defaultOptions);

export const toastWarning = (msg) =>
  toast.warning(msg, defaultOptions);
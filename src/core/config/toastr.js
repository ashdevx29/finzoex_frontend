import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function toastAlert(errorType, message, id) {
  if (errorType === 'error') {
    toast.error(message, {
      autoClose: 2000,
      toastId: id,
      position: "top-right",
    });
  } else if (errorType === 'success') {
    toast.success(message, {
      autoClose: 2000,
      toastId: id,
      position: "top-right",
    });
  } else if (errorType === 'info') {
    toast.info(message, {
      autoClose: 2000,
      toastId: id,
      position: "top-center",
    });
  } else if (errorType === 'warn') {
    toast.warn(message, {
      autoClose: 2000,
      toastId: id,
      position: "top-right",
    });
  }
}

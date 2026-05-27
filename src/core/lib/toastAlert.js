import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const POSITION_MAP = {
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_LEFT: "bottom-left",
};

export function toastAlert(
  errorType,
  message,
  id,
  position = 'TOP_RIGHT'
) {
  const pos = POSITION_MAP[position] || "top-right";

  if (errorType === 'error') {
    toast.error(message, { autoClose: 2000, toastId: id, position: pos });
  } else if (errorType === 'success') {
    toast.success(message, { autoClose: 2000, toastId: id, position: pos });
  } else if (errorType === 'warning') {
    toast.warning(message, { autoClose: 2000, toastId: id, position: pos });
  }
}

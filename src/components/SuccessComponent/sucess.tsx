import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

/**
 * Utility to show notifications
 * @param title - The notification title
 * @param message - The notification message
 * @param type - The notification type ("success" | "danger" | "info" | "default" | "warning")
 */
export const showNotification = (
  title: string,
  message: string,
  type: "success" | "danger" | "info" | "default" | "warning"
) => {
  Store.addNotification({
    title,
    message,
    type, // success, danger, info, default, or warning
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

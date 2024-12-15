import { showNotification } from "../components/SuccessComponent/sucess";

const updateUserStatus = async (id: number, status: string) => {
  const baseUrl = process.env.REACT_APP_URL;

  try {
    const response = await fetch(`${baseUrl}auth/update-admin-status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, id }),
    });

    if (!response.ok) {
      throw new Error("Failed to update report status");
    }

    const data = await response.json();
    showNotification(
      "Success!",
      "Report status updated successfully",
      "success"
    );
    return data;
  } catch (error: any) {
    showNotification(
      "Error!",
      `Error updating report status: ${error.message}`,
      "danger"
    );
    throw error;
  }
};

export default updateUserStatus;

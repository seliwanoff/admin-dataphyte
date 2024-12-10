import { showNotification } from "../components/SuccessComponent/sucess";

const updateReportStatus = async (id: number, status: string) => {
  const baseUrl = process.env.REACT_APP_URL;

  try {
    const response = await fetch(`${baseUrl}admin/reports?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
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

export default updateReportStatus;

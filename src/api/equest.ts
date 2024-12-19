export const getDashboardStat = async (
  dateRange:
    | "30 days"
    | "12 months"
    | "7 days"
    | "24 hours"
    | "1 day"
    | { from: Date; to: Date }
): Promise<any> => {
  const baseUrl = process.env.REACT_APP_URL; // Replace with your base URL
  const endpoint = `${baseUrl}admin/stats/dashbord`;

  // Helper to format date parts
  const formatDatePart = (date: Date) => ({
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"), // Month is 0-based
    day: date.getDate().toString().padStart(2, "0"),
  });

  const currentDate = new Date();
  let fromDate: Date | null = null;
  let toDate: Date = currentDate;

  // Calculate the date range
  if (typeof dateRange === "string") {
    switch (dateRange) {
      case "30 days":
        fromDate = new Date();
        fromDate.setDate(toDate.getDate() - 30);
        break;
      case "12 months":
        fromDate = new Date();
        fromDate.setFullYear(toDate.getFullYear() - 1);
        break;
      case "7 days":
        fromDate = new Date();
        fromDate.setDate(toDate.getDate() - 7);
        break;
      case "24 hours":
        fromDate = new Date();
        fromDate.setHours(toDate.getHours() - 24);
        break;
      case "1 day":
        // No parameters for "1 day"
        fromDate = null;
        break;
      default:
        throw new Error(`Invalid date range: ${dateRange}`);
    }
  } else {
    // Custom date range
    fromDate = dateRange.from;
    toDate = dateRange.to;
  }

  // Format query parameters if applicable
  let queryParams = "";
  if (fromDate) {
    const fromParts = formatDatePart(fromDate);
    const toParts = formatDatePart(toDate);

    queryParams = new URLSearchParams({
      yearfrom: fromParts.year,
      yearto: toParts.year,
      monthfrom: fromParts.month,
      monthto: toParts.month,
      dayfrom: fromParts.day,
      dayto: toParts.day,
    }).toString();
  }

  try {
    const url = fromDate ? `${endpoint}?${queryParams}` : endpoint; // Use query params only if applicable
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
};

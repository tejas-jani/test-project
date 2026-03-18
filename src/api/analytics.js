import axios from "axios";

const ANALYTICS_API_URL = "https://api.npoint.io/d28b624a497cfeda407c";

const fallbackData = {
  totalApplicants: 1250,
  verifiedApplicants: 890,
  rejectedApplicants: 120,
  applicationsByProgram: [
    { program: "Computer Science", count: 320 },
    { program: "Engineering", count: 280 },
    { program: "Business", count: 250 },
    { program: "Medicine", count: 180 },
    { program: "Arts", count: 120 },
  ],
  applicationTrends: [
    { date: "2025-03-01", count: 45 },
    { date: "2025-03-05", count: 62 },
    { date: "2025-03-08", count: 78 },
    { date: "2025-03-10", count: 95 },
    { date: "2025-03-12", count: 110 },
    { date: "2025-03-15", count: 130 },
    { date: "2025-03-18", count: 145 },
  ],
};

export async function fetchAdmissionsAnalytics() {
  try {
    const response = await axios.get(ANALYTICS_API_URL);
    return { data: response.data };
  } catch {
    return { data: fallbackData };
  }
}

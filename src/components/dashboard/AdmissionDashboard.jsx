import { useState, useEffect } from "react";
import { fetchAdmissionsAnalytics } from "../../api/analytics";
import StatCard from "../ui/StatCard";
import Button from "../ui/Button";
import ApplicationsPerProgram from "./ApplicationsPerProgram";
import ApplicationTrends from "./ApplicationTrends";

export default function AdmissionDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdmissionsAnalytics();
      setData(res.data);
    } catch (err) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="rounded border bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-sm rounded border border-red-200 bg-white p-6 text-center shadow-sm">
          <p className="text-red-600">{error}</p>
          <div className="mt-4">
            <Button onClick={loadData} className="w-full sm:w-auto">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-sm rounded border bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">No data available</p>
          <div className="mt-4">
            <Button onClick={loadData} className="w-full sm:w-auto">
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-slate-800">
            Admission Analytics
          </h1>
          <Button onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Applicants" value={data.totalApplicants} />
          <StatCard label="Verified Applicants" value={data.verifiedApplicants} />
          <StatCard label="Rejected Applicants" value={data.rejectedApplicants} />
        </div>

        <ApplicationsPerProgram data={data.applicationsByProgram} />
        <ApplicationTrends applicationTrends={data.applicationTrends} />
      </div>
    </div>
  );
}

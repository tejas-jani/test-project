import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ApplicationTrends({ applicationTrends = [] }) {
  const [dateFrom, setDateFrom] = useState("2025-03-01");
  const [dateTo, setDateTo] = useState("2025-03-18");

  const filteredTrends = useMemo(() => {
    if (!applicationTrends.length) return [];
    const from = new Date(dateFrom).getTime();
    const to = new Date(dateTo).getTime();
    return applicationTrends.filter((d) => {
      const t = new Date(d.date).getTime();
      return t >= from && t <= to;
    });
  }, [applicationTrends, dateFrom, dateTo]);

  return (
    <div className="rounded border bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-slate-700">
        Application Trends
      </h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="flex items-center gap-1 text-sm">
          From
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded border px-2 py-1 text-sm"
          />
        </label>
        <label className="flex items-center gap-1 text-sm">
          To
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded border px-2 py-1 text-sm"
          />
        </label>
      </div>
      {filteredTrends.length ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded border border-dashed border-slate-200 bg-slate-50 py-8">
          <p className="text-slate-500">
            No trends in selected date range
          </p>
        </div>
      )}
    </div>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ApplicationsPerProgram({ data }) {
  return (
    <div className="mb-6 rounded border bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-slate-700">
        Applications per Program
      </h2>
      {data?.length ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded border border-dashed border-slate-200 bg-slate-50 py-8">
          <p className="text-slate-500">No program data</p>
        </div>
      )}
    </div>
  );
}

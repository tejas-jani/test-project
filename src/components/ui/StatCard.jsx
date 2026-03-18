export default function StatCard({ label, value }) {
  let colorClass = "bg-slate-100 text-slate-800";
  if (value > 1000) colorClass = "bg-red-100 text-red-800";
  else if (value > 500) colorClass = "bg-orange-100 text-orange-800";

  return (
    <div className={`rounded border p-4 ${colorClass}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

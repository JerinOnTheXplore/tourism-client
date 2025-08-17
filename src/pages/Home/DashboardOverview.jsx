
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Loading from "../loading/Loading";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff"];

const fetchAdminStats = async () => {
  const res = await axios.get("https://tourism-server-delta.vercel.app/api/admin-stats");
  return res.data;
};

const DashboardOverview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: fetchAdminStats,
  });

  if (isLoading || !stats) return <div className="py-20 text-center"><Loading /></div>;

  const pieData = [
    { name: "Tour Guides", value: stats.totalTourGuides },
    { name: "Tourists", value: stats.totalTourists },
    { name: "Packages", value: stats.totalPackages },
    { name: "Stories", value: stats.totalStories },
  ];

  const barData = [
    { name: "Payments", amount: stats.totalPayments },
    { name: "Guides", amount: stats.totalTourGuides },
    { name: "Tourists", amount: stats.totalTourists },
    { name: "Packages", amount: stats.totalPackages },
    { name: "Stories", amount: stats.totalStories },
  ];

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#2a75b3] dark:text-[#60a5fa]">📊 Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        <StatCard label="Total Payments" value={`৳ ${stats.totalPayments}`} />
        <StatCard label="Total Tour Guides" value={stats.totalTourGuides} />
        <StatCard label="Total Tourists" value={stats.totalTourists} />
        <StatCard label="Total Packages" value={stats.totalPackages} />
        <StatCard label="Total Stories" value={stats.totalStories} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-100">Distribution Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-100">Payments & Counts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-6 text-center shadow">
    <p className="text-gray-600 dark:text-gray-300 font-semibold">{label}</p>
    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{value}</p>
  </div>
);

export default DashboardOverview;

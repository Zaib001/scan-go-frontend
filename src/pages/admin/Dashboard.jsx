import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../services/dashboardService';
import { motion } from 'framer-motion';
import {
  FaUserShield,
  FaChartBar,
  FaHeadphonesAlt,
  FaWaveSquare,
} from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getDashboardStats();
      console.log(data)
      setStats(data);
    })();
  }, []);

  if (!stats) {
    return <div className="p-6 text-gray-600">Loading dashboard...</div>;
  }

  const statCards = [
    {
      title: 'Total Demos',
      value: stats.demos,
      icon: <FaChartBar size={24} />,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Feedback Received',
      value: stats.feedbacks,
      icon: <FaHeadphonesAlt size={24} />,
      color: 'bg-green-100 text-green-700',
    },
    {
      title: 'Proposals Submitted',
      value: stats.proposals,
      icon: <FaWaveSquare size={24} />,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Admins',
      value: stats.admins,
      icon: <FaUserShield size={24} />,
      color: 'bg-yellow-100 text-yellow-700',
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // replace with real labels if available
    datasets: [
      {
        label: 'Demos Created',
        data: [5, 9, 6, 14, 8, 10], // this can be replaced with dynamic data later
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const barData = {
    labels: ['Demo', 'Proposal', 'Feedback'],
    datasets: [
      {
        label: 'Submissions',
        data: [stats.demos, stats.proposals, stats.feedbacks],
        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-xl shadow-md ${stat.color} flex items-center gap-4`}
            >
              <div className="p-3 rounded-full bg-white text-xl">{stat.icon}</div>
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Demos Over Time</h4>
            <Line data={chartData} />
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Submission Breakdown</h4>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

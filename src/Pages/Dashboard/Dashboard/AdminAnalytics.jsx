import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Loading from '../../../Components/ErrorPage/Loading';

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['admin-overview-mini'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/overview');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const {
    todayNewLessons = 0,
    mostActiveContributors = [],
    graphs = { lessonGrowth: [], userGrowth: [] },
  } = data;

  console.log(mostActiveContributors);
  return (
    <div className="space-y-6">
      {/* new Lessons */}
      <div className="bg-white rounded-xl shadow p-5">
        <p className="text-gray-500 text-sm">Today’s New Lessons</p>
        <h2 className="text-3xl font-bold text-green-600">{todayNewLessons}</h2>
      </div>

      {/* Active Cont. */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold mb-4">Most Active Contributors</h3>
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Email</th>
              <th>Lessons</th>
            </tr>
          </thead>
          <tbody>
            {mostActiveContributors.map((u, i) => (
              <tr key={u.email}>
                <td>{i + 1}</td>
                <td>{u.email}</td>
                <td className="font-semibold">{u.lessonCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-3">Lesson Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={graphs.lessonGrowth}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#4ade80"
                fill="#d1fae5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-3">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={graphs.userGrowth}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#60a5fa"
                fill="#bfdbfe"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

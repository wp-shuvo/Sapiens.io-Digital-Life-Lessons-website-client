import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Loading from '../../../Components/ErrorPage/Loading';

const WeeklyActivityChartUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: activity = [], isLoading } = useQuery({
    queryKey: ['weekly-activity', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/activity?email=${user.email}`
      );
      return res.data;
    },
  });

  console.log(activity);

  // Convert
  const chartData = activity.map(item => ({
    name: `W${item._id.week}`,
    total: item.total,
  }));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card bg-base-200 p-4">
      <h3 className="font-bold mb-2">Weekly Activity</h3>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Area
              type="natural"
              dataKey="total"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyActivityChartUser;

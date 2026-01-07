import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useIsPremium = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: isPremium = false } = useQuery({
    queryKey: ['isPremium', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/premium`);
      return res.data.isPremium;
    },
  });

  return { isPremium, roleLoading };
};

export default useIsPremium;

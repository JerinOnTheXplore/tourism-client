
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";


const useRole = () => {
  const { user, loading: authLoading } = useAuth();

  const { data: role, isLoading, isError, error } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axios.get(`https://tourism-server-delta.vercel.app/api/users/role/${user.email}`);
      return res.data?.role;
    },
    retry: 1,
  });

  return { role, loading: isLoading || authLoading, isError, error };
};

export default useRole;

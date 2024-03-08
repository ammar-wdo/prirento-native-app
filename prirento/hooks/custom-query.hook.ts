import { fetcher } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './auth.hook';


export function useCustomQuery<T>(key: string, url: string) {

    const {user} = useAuth()

  return useQuery<T>({
    queryKey: [key],
    queryFn: () => fetcher<T>(url,user?.token),
  })
}


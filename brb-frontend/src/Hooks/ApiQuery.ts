import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { ApiParams } from '../Api/api';

const useApiQuery = <T>(
  queryKey: QueryKey,
  params: ApiParams,
  fetchData: (params: ApiParams) => Promise<T> | T,
  options?: UseQueryOptions<T>,
) => useQuery<T>(queryKey, () => fetchData(params), options);

export default useApiQuery;

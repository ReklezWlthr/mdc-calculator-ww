import { useRouter } from 'next/router'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueries, useQuery, UseQueryOptions } from '@tanstack/react-query'
import _ from 'lodash'
import { appAxios } from './axios'

export type QueryKeyT = [string, object | undefined]

export const fetcher = async <T>({ queryKey, headers }): Promise<T> => {
  const [url, params] = queryKey
  return appAxios()
    .get(url, { params: { ...params }, headers: { ...headers } })
    .then((res) => res.data)
}

export const useGenericFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, AxiosError, T, QueryKeyT>
) => {
  return useQuery<T, AxiosError, T, QueryKeyT>(
    [url, params],
    ({ queryKey }) =>
      fetcher({
        queryKey,
        headers: config?.meta?.headers as any,
      }),
    config
  )
}

export const useFetch = <T>(url: string | null, params?: object, config?: UseQueryOptions<T, AxiosError, T, QueryKeyT>) => {
  return useGenericFetch(url, params, config)
}

export const useParallelFetch = <T>(
  url: string[],
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useQueries({
    queries: _.map(url, (item) => ({
      queryKey: [item, params],
      queryFn: ({ queryKey }) => fetcher({ queryKey, headers: config?.meta?.headers }),
      ...config,
    })),
  })
}

const useGenericMutation = <T, S>(func: (data?: T | S) => Promise<AxiosResponse<S>>, config?) => {
  return useMutation<AxiosResponse, AxiosError, T | S>(func, config)
}

export const usePost = <T, S>(url: string, config?: UseQueryOptions<T, Error, T, QueryKeyT>) => {
  return useGenericMutation<T, S>(
    (data) =>
      appAxios().post<S>(url, data, {
        headers: config?.meta?.headers as any,
      }),
    config
  )
}

export const usePut = <T, S>(url: string, config?: UseQueryOptions<T, Error, T, QueryKeyT>) => {
  return useGenericMutation<T, S>(
    (data: any) =>
      appAxios().put<S>(url, data, {
        headers: config?.meta?.headers as any,
      }),
    config
  )
}

export const useDelete = <T, S>(url: string, config?: UseQueryOptions<T, Error, T, QueryKeyT>) => {
  return useGenericMutation<T, S>(
    () =>
      appAxios().delete<S>(url, {
        headers: config?.meta?.headers as any,
      }),
    config
  )
}

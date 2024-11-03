import axios from 'axios'
import getConfig from 'next/config'

const timeout = 30000

export const defaultAppAxiosConfigs = {
  timeout: Number.parseInt(`${timeout}`),
}

export interface AppAxiosConfig {
  headers: any
}

/**
|--------------------------------------------------
| CUSTOM AXIOS
|--------------------------------------------------
*/
export const appAxios = (config?: AppAxiosConfig) => {
  const axiosInstance = config ? axios.create(config) : axios.create(defaultAppAxiosConfigs)

  axiosInstance.interceptors.request.use(
    (configParam) => {
      return configParam
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

/**
|--------------------------------------------------
| AXIOS with multipart/form-data
|--------------------------------------------------
*/
export const appAxiosMultipart = (config?: AppAxiosConfig | undefined) => {
  return appAxios({
    ...defaultAppAxiosConfigs,
    headers: {
      'content-type': 'multipart/form-data',
    },
    ...config,
  })
}

import { useState } from 'react'

export const useParams = <T extends Record<string, any>>(defaultParams: T) => {
  const [params, setValue] = useState(defaultParams)

  const setParams = (value: Partial<T>) => setValue((prev) => ({ ...prev, ...value }))
  const resetParams = () => setValue(defaultParams)

  return { params, setParams, resetParams }
}

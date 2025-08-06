import API from "./api"
import { useCallback, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

export const useQuotes = () => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { showBoundary } = useErrorBoundary()

  const fetchTrip = useCallback(() => {
    setIsLoading(true)
    API.getQuotes().then((response) => {
      setData(response)
    }).catch((error) => {
      showBoundary(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading, fetchTrip }
}

export const useTrip = (id?: string) => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { showBoundary } = useErrorBoundary()

  const fetchTrip = useCallback(() => {
    setIsLoading(true)
    API.getTrip(id ?? '').then((response) => {
      setData(response)
    }).catch((error) => {
      showBoundary(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [id])
  return { data, isLoading, fetchTrip }
}
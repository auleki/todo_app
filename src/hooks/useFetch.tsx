import { useState, useEffect, useCallback } from "react"


const useFetch = (url: string) => {
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await fetch(url)
            const result = await response.json()
            setData(result)
        } catch (error) {
            console.log({ error })
            setErrors(err => [...err, error])
        } finally {
            setIsLoading(false)
        }
    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return {
        data,
        errors,
        isLoading
    }
}

export default useFetch
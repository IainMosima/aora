import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { Models } from "react-native-appwrite"

const useAppwrite = (fn:  () => Promise<Models.Document[] | undefined>) => {
    const [data, setData] = useState<Models.Document[] | undefined>()
    const [isLoading, setIsLoading] = useState(true)
    
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn()
           
            setData(response)
        } catch (error) {
            Alert.alert('Error', error as string)
        } finally {
            setIsLoading(false)
            // router.push("/sign-in")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData()

    return { data, isLoading, refetch }
}

export default useAppwrite;
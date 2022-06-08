import {useState, useCallback} from "react"


export const useHttp = () => { // name our hook starting with use
    const [loading, setLoadin] = useState(false) // setting loading state
    const [error, setError] = useState(null) // setting error state

    // creating request to the server using useCallback() and save it in variable request
    const request = useCallback(async ( // using asynchron operation
                                        url, 
                                        method='GET', 
                                        body=null, 
                                        headers={'Content-Type':'aplication/json'}
    ) => {
        setLoadin(true) // set loading true for showing that we are getting some data

        // using try-catch blocks for operaite success and error while getting data
        try{
            // getting response from server
            const response = await fetch(url, {method, body, headers}) // In fetch() first argue is url and second is object that's gets in it (method, body, headers). Using AWAIT because waiting async!!! operation.

            if (!response.ok) { // проверяем успешен ли запрос
                throw new Error(`Could not fetch ${url}, status: ${response.status}`) // выкидываем ошибку если нет
            }

            const data = await response.json() // converting our response to the json data. AWAIT because it async!!! ))

            setLoadin(false)

            return data
        }catch(e){
            setLoadin(false)
            setError(e.message)
            throw e
        }
    }, [])

    // creating method for clearing our error because if not, it will stuck on error when we will catch it
    const clearError = useCallback(() => (setError(null)), [])

    return {loading, error, request, clearError}
}

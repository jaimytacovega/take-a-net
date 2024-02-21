import * as WorkerLib from '@scripts/lib/worker.lib'


const fetch = async ({ url, options }) => {
    try {
        const fetchResult = await WorkerLib.fetch({ url, options })
        if (fetchResult?.err) return fetchResult
    
        const response = fetchResult?.response
        if (!response.ok) throw response?.statusText

        const json = await response.json()
        if (json?.status !== 'success') throw json?.messages ?? json

        const data = json?.data
        return { data }
    } catch (err) {
        return { err }
    }
}

const BASE_API = 'https://apptan.sierpes48.es'

export {
    fetch,
    
    BASE_API,
}
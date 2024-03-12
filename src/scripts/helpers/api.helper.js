import * as WorkerLib from '@scripts/lib/worker.lib'


const fetch = async ({ url, ...options }) => {
    try {
        const fetchResult = await WorkerLib.fetch({ url, ...options })
        if (fetchResult?.err) return fetchResult
    
        const response = fetchResult?.response
        const responseStatus = response.ok ? [] : [response?.statusText || response?.status]
        if (!response.ok) throw responseStatus

        const json = await response.json()
        const messages = json?.messages

        if (json?.status !== 'success') throw [...responseStatus, ...messages]
        
        const data = json?.data
        if (!data && messages?.length) throw [...responseStatus, ...messages]

        return { data, messages }
    } catch (err) {
        return { err }
    }
}

const BASE_API = 'https://apptan.sierpes48.es'

export {
    fetch,
    
    BASE_API,
}
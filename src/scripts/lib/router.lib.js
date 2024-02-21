import * as WorkerLib from '@scripts/lib/worker.lib'
import * as URLPatternLib from '@scripts/lib/urlpattern.lib'


const findPatternFromUrl = ({ router, url }) => {
    const patternPathname = [...new Set(router?.keys())]
        .find((patternPathname) => {
            const pattern = URLPatternLib.getURLPatern({ pathname: patternPathname })
            return pattern.test(url.href)
        })

    return patternPathname ? URLPatternLib.getURLPatern({ pathname: patternPathname }) : null
}

const getRedirectResponse = ({ origin, pathname }) => {
    if (origin !== self?.origin) return
    const isRedirectable = pathname !== '/' && pathname.endsWith('/')
    const response = isRedirectable ? Response.redirect(pathname.slice(0, -1), 301) : null
    return { response }
}

const getNotFoundResponse = async ({ router, request }) => {
    const pageCallback = router?.get('/404')?.getRoute
    const response = pageCallback ? (await pageCallback({ request }))?.response : new Response('404', { status: 404 })
    return { response }
}

const getStaticResponse = async ({ request, waitUntil, env }) => {
    // if (request?.url?.includes('@scripts')){
    //     const newUrl = `${request?.url?.replace('@scripts', 'scripts')}.js`
    //     const newRequest = new Request(newUrl, request)

    //     return { response: await CloudflareLib.getStaticResponse({ request: newRequest, waitUntil, env }) }
    // }

    // return { response:  await CloudflareLib.getStaticResponse({ request, waitUntil, env }) }
}

const getForbiddenResponse = ({ origin, request, forbiddenURLs }) => {  
    if (origin !== self?.origin) return  
    const isForbidden = forbiddenURLs?.find((filename) => request?.url?.endsWith(filename))    
    if (!isForbidden) return
    return { response: new Response(`${request?.url} is forbidden`, { status: 503 }) }
}

const getServerOnlyResponse = ({ origin, request, serverOnlyURLs }) => {
    if (origin !== self?.origin) return
    const isServerOnly = serverOnlyURLs?.find((filename) => request?.url?.endsWith(filename))
    if (!isServerOnly) return
    return WorkerLib.fetch({ request })
}

export {
    findPatternFromUrl,
    getRedirectResponse,
    getNotFoundResponse,
    getStaticResponse,
    getForbiddenResponse,
    getServerOnlyResponse,
}
import * as WorkerLib from '@scripts/lib/worker.lib'


const getCachePrefix = () => `${self?.SW_APP_NAME}-static` 
const getCacheName = ({ version }) => `${getCachePrefix()}-${version}`

const cacheAssets = async ({ version }) => {
    try {
        const assetsResult = await WorkerLib.fetch({ url: '/dist.json' })
        const assetsJSON = assetsResult?.err ? {} : await assetsResult?.response?.json()

        const cacheName = getCacheName({ version })
        const cache = await caches.open(cacheName)

        return assetsJSON?.map(async (path) => {
            try {
                const url = path?.replace('dist/', '/')
                await cache.add(url)
            } catch (err) {
                console.log(`${err} - ${url}`)
            }
        })

    } catch (err) {
        console.error(err)
    }
}

const installStaticAssets = async ({ version }) => {
    cacheAssets({ version })
}

const removePreviousCaches = async ({ version }) => {
    const cacheNames = await caches.keys()
    return Promise.all(
        cacheNames?.filter((cacheName) => cacheName?.startsWith(getCachePrefix()) && !cacheName?.endsWith(version))?.map((cacheName) => caches?.delete(cacheName))
    )
}

const serveFromCache = async ({ request, version }) => {
    try {
        const cacheName = getCacheName({ version })
        const cache = await caches.open(cacheName)
        const response = await cache.match(request, { ignoreSearch: true })
        return { response }
    } catch (err) {
        console.error(err)
        return { err }
    }
}

const cacheFirstThenNetwork = async ({ request, version }) => {
    const cacheResult = await serveFromCache({ request, version })
    if (cacheResult?.response) return cacheResult

    try {
        const fetchResult = await WorkerLib.fetch({ request })
        return fetchResult
    } catch (err) {
        return { err }
    }
}

export {
    getCachePrefix,
    getCacheName,
    installStaticAssets,
    removePreviousCaches,
    cacheFirstThenNetwork,
}
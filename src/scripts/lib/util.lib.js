const Scope = {
    Cloudflare: 'cloudflare-worker',
    ServiceWorker: 'service-worker',
    Window: 'window',
}

const isWindow = () => typeof window === 'object'
const isServiceWorker = ({ env }) => !env && typeof ServiceWorkerGlobalScope !== 'undefined'
const isCloudflareWorker = ({ env }) => env?.IS_CLOUDFLARE_WORKER

const getScope = ({ env }) => {
    if (isCloudflareWorker({ env })) return Scope.Cloudflare
    if (isServiceWorker({ env })) return Scope.ServiceWorker
    if (isWindow()) return Scope.Window
}

const getEnv = ({ env }) => {
    if (isCloudflareWorker({ env })) return env.ENV
    if (isServiceWorker({ env })) return __ENV__
    if (isWindow()) return document?.body?.getAttribute('data-env')
} 

const isDevEnv = ({ env }) => {
    return getEnv({ env }) === 'dev'
}

export {
    getScope,
    getEnv,
    isDevEnv,
}
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'


const getStaticResponse = async ({ request, waitUntil, env }) => {
    try {
        const ASSET_MANIFEST = JSON.parse(manifestJSON)
        const response = await getAssetFromKV({
            request,
            waitUntil
        }, {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST,
        })

        return { response }
    } catch (err) {
        return { err }
    }
}

export {
    getStaticResponse,
}
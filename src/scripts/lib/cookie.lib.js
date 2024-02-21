// TODO: add polyfill for cookie-store
const isCookieStoreAvailable = () => typeof cookieStore !== 'undefined'
const addCookie = ({ key, value, config }) => isCookieStoreAvailable() ? cookieStore?.set(key, value, config) : null
const removeCookie = ({ key }) => isCookieStoreAvailable() ? cookieStore?.delete({ name: key }) : null
const getCookie = async ({ key }) => isCookieStoreAvailable() ? (await cookieStore?.get(key))?.value : null

const getAutorizationCookie = ({ request } = {}) => {
    if (isCookieStoreAvailable()) return getCookie({ key: 'Authorization' })
    
    const cookies = request?.headers?.get('Cookie')?.match(/Authorization=([^;]+)/)
    return cookies?.at(1)
}

const addAuthorizationCookie = ({ credential }) => {
    const { id, displayName, email, photoURL } = credential
    const userId = JSON.stringify({ id, displayName, email, photoURL })
    
    if (isCookieStoreAvailable()) return addCookie({ key: 'Authorization', value: userId, config: { sameSite: 'strict', secure: true } })

    document.cookie = `Authorization=${userId}; SameSite=Strict; Secure`
}

const removeAuthorizationCookie = () => {
    if (isCookieStoreAvailable()) return removeCookie({ key: 'Authorization' })
    
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() - 1)
    document.cookie = `Authorization=; expires=${expirationDate.toUTCString()}; SameSite=Strict; Secure`
}

export {
    getAutorizationCookie,
    addAuthorizationCookie,
    removeAuthorizationCookie,
}
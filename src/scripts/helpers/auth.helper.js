import * as ApiHelper from '@scripts/helpers/api.helper'


const LOGIN_API = `${ApiHelper.BASE_API}/login`
const VERIFY_API = `${ApiHelper.BASE_API}/usuarios/verify_token`

const login = async ({ username, password }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    const body = JSON.stringify({
        username,
        password,
    })

    const options = {
        method: 'POST',
        headers,
        body,
    }

    const result = await ApiHelper.fetch({ url: LOGIN_API, ...options })
    if (result?.err) return result

    const token = result?.data?.token
    if (!token) return { err: ['INVALID USER'] }
    return { data: { token } }
}

const verify = async ({ token }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Cache-Control', 'no-cache')

    const body = JSON.stringify({
        token,
    })

    const options = {
        method: 'POST',
        headers: headers,
        body,
    }

    const result = await ApiHelper.fetch({ url: VERIFY_API, ...options })
    if (result?.err) return result

    return { 
        data: { 
            token: result?.data?.token
        } 
    }
}


export{
    login,
    verify,
}
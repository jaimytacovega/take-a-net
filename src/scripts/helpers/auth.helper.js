import * as ApiHelper from '@scripts/helpers/api.helper'


const LOGIN_API = `${ApiHelper.BASE_API}/login`

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

    const result = await ApiHelper.fetch({ url: LOGIN_API, options })
    if (result?.err) return result

    return result?.data?.token
}


export{
    login,
}
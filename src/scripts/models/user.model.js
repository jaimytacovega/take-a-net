import * as ApiHelper from '@scripts/helpers/api.helper'


const GET_ALL_API = `${ApiHelper.BASE_API}/usuarios`
const GET_API = `${ApiHelper.BASE_API}/usuario`
const CREATE_API = `${ApiHelper.BASE_API}/usuarios/crear`

const getAll = async ({ token }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const options = {
        method: 'GET',
        headers,
    }

    const result = await ApiHelper.fetch({ url: GET_ALL_API, options })
    if (result?.err) return result

    return result?.data?.usuarios
}

const get = async ({ token, username }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const options = {
        method: 'GET',
        headers,
    }

    const result = await ApiHelper.fetch({ url: `${GET_API}/${username}`, options })
    if (result?.err) return result

    return result?.data?.usuario
}

const add = async ({ token, user }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const body = JSON.stringify(user)

    const options = {
        method: 'POST',
        headers,
        body,
    }

    const result = await ApiHelper.fetch({ url: CREATE_API, options })
    if (result?.err) return result

    return result?.data?.usuario
}


export {
    get,
    getAll,
    add,
}
import * as ApiHelper from '@scripts/helpers/api.helper'


const GET_ALL_API = `${ApiHelper.BASE_API}/usuarios`
const GET_API = `${ApiHelper.BASE_API}/usuario`
const CREATE_API = `${ApiHelper.BASE_API}/usuarios/crear`
const UPDATE_API = `${ApiHelper.BASE_API}/usuarios/editar`
const DELETE_API = `${ApiHelper.BASE_API}/usuarios/eliminar`

const getAll = async ({ token }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const options = {
        method: 'GET',
        headers,
    }

    const result = await ApiHelper.fetch({ url: GET_ALL_API, ...options })
    if (result?.err) return result

    const data = result?.data?.usuarios
    return { data }
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

    const result = await ApiHelper.fetch({ url: `${GET_API}/${username}`, ...options })
    if (result?.err) return result

    const data = result?.data?.usuario
    return { data }
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

    const result = await ApiHelper.fetch({ url: CREATE_API, ...options })
    if (result?.err) return result

    const data = result?.data?.usuario
    const messages = result?.messages

    return { data, messages }
}

const update = async ({ token, user }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const body = JSON.stringify(user)

    const options = {
        method: 'PATCH',
        headers,
        body,
    }

    const result = await ApiHelper.fetch({ url: `${UPDATE_API}/${user?.username}`, ...options })
    if (result?.err) return result

    const data = result?.data?.usuario
    const messages = result?.messages

    return { data, messages }
}

const remove = async ({ token, id }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const options = {
        method: 'DELETE',
        headers: headers,
    }

    const result = await ApiHelper.fetch({ url: `${DELETE_API}/${id}`, ...options })
    if (result?.err) return result

    const data = result?.data
    const messages = result?.messages

    return { data, messages }
}


export {
    get,
    getAll,
    add,
    update,
    remove,
}
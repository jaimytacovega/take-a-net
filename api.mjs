const customFetch = async ({ url, options }) => {
    try {
        const response = await fetch(url, options)

        console.log('--- response.status =', response.status)
        console.log('--- response.statusText =', response.statusText)
        console.log('--- response.ok =', response.ok)
        // console.log('--- response =', response)

        if (!response.ok) throw response.statusText

        const json = await response.json()
        console.log('--- json =', json)

        if (json?.status !== 'success') throw json?.messages ?? json

        const data = json?.data

        return { data }
    } catch (err) {
        return { err }
    }
}

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
        redirect: 'follow'
    }

    const result = await customFetch({ url: 'https://apptan.sierpes48.es/login', options })
    if (result?.err) return result

    return result?.data?.token
}

const getAll = async ({ token }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const options = {
        method: 'GET',
        headers,
        redirect: 'follow'
    }

    const result = await customFetch({ url: 'https://apptan.sierpes48.es/usuarios', options })
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
        redirect: 'follow'
    }

    const result = await customFetch({ url: `https://apptan.sierpes48.es/usuario/${username}`, options })
    if (result?.err) return result

    return result?.data?.usuario
}

const create = async ({ token, user }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)

    const body = JSON.stringify(user)

    const options = {
        method: 'POST',
        headers,
        body,
        redirect: 'follow'
    }

    const result = await customFetch({ url: 'https://apptan.sierpes48.es/usuarios/crear', options })
    if (result?.err) return result

    // console.log('--- result?.data =', result?.data)
    return result?.data?.usuario
}

const changePassword = async ({ password, password_confirm }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    const body = JSON.stringify({
        password,
        password_confirm,
    })

    const options = {
        method: 'POST',
        headers,
        body,
        redirect: 'follow'
    }

    const result = await customFetch({ url: 'https://apptan.sierpes48.es/usuarios/change_password', options })
    if (result?.err) return result

    return result?.data
}

const update = async ({ token, user }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)


    const body = JSON.stringify({
        id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        activation_date: user?.activation_date,
        tos_date: user?.tos_date,
        active: user?.active,
    })

    const options = {
        method: 'PATCH',
        headers,
        body,
        redirect: 'follow'
    }
    
    const result = await customFetch({ url: `https://apptan.sierpes48.es/usuarios/editar/username_test`, options })
    if (result?.err) return result

    return result?.data
}

const logout = async () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Cache-Control', 'no-cache')

    const urlencoded = new URLSearchParams()

    const options = {
        method: 'POST',
        headers,
        body: urlencoded,
        redirect: 'follow'
    }

    const result = await customFetch({ url: 'https://apptan.sierpes48.es/logout', options })
    if (result?.err) return result

    return result?.data
}

export {
    login,
    logout,

    getAll,
    get,

    create,
    update,

    changePassword,
}
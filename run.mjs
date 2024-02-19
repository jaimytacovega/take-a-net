import { login, getAll, get, create, update } from './api.mjs'


let username = 'admin'
let password = '1234abc'

// runs properly
let token = await login({ username, password })
console.log({ username, token })

// // runs properly
// let users = await getAll({ token })
// console.log({ users: users?.map((user) => user?.username) })

// // runs properly
// let id = '9'
// let createdUser = await create({ token, user: {
//     username: `jaimy_test_${id}`,
//     password: `jaimy_test_${id}_1234`,
//     email: `jaimy_test_${id}@dssnetwork.es`,
//     first_name: `jaimy_test_${id}`,
//     last_name: 'DSS Network',
// } })
// console.log({ createdUser })

// // runs properly
// const user = await get({ token, username: 'admin' })
// console.log({ user })

// throws status 500
const updatedUser = await update({
    token,
    user: {
        username: 'jaimy_test_1',
        first_name: 'jaimy_test_1',
        last_name: 'taco_test_1',
        activation_date: '2024-02-01 00:00:00',
        tos_date: '2024-02-01 00:00:00',
        active: true
    }
})
console.log({ updatedUser })




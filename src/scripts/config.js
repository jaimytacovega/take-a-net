import * as LoginRoute from '@scripts/routes/login.route'
import * as RecoverPasswordRoute from '@scripts/routes/recover-password.route'
import * as RecoverPasswordSentRoute from '@scripts/routes/recover-password-sent.route'


const urlPatterns = {
    Login: '/login',
    RecoverPassword: '/recuperar-contrasena',
    RecoverPasswordSent: '/recuperar-contrasena-enviado',
}

const router = new Map()
router.set(urlPatterns.Login, LoginRoute)
router.set(urlPatterns.RecoverPassword, RecoverPasswordRoute)
router.set(urlPatterns.RecoverPasswordSent, RecoverPasswordSentRoute)

const forbiddenURLs = [
    'cloudflare.worker.js',
    '_actions_autogenerated.js',
]

const serverOnlyURLs = []


export {
    router,
    forbiddenURLs,
    serverOnlyURLs,
    urlPatterns,
}
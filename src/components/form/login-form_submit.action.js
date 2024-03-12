import * as AuthHelper from '@scripts/helpers/auth.helper'
import * as CookieLib from '@scripts/lib/cookie.lib'

import * as FormHelper from '@scripts/helpers/form.helper'


const submit = async ({ e, srcElement }) => {
    e.preventDefault()
    
    const usernameInput = srcElement?.querySelector('#username')
    const passwordInput = srcElement?.querySelector('#password')

    const username = usernameInput?.value
    const password = passwordInput?.value

    FormHelper.freeze({ form: srcElement })
    FormHelper.resetInvalid({ form: srcElement })

    const loginResult = await AuthHelper.login({ username, password })
    console.log('--- loginResult =', loginResult)

    if (loginResult?.err){
        FormHelper.showInvalid({
            form: srcElement,
            data: { 
                inForm: true, 
                desc: loginResult?.err?.join('-')
            }
        })

        FormHelper.unfreeze({ form: srcElement })
        return
    }

    const token = loginResult?.data?.token
    CookieLib.addAuthorizationCookie({ credential: { token }})

    FormHelper.resetInvalid({ form: srcElement })
    FormHelper.unfreeze({ form: srcElement })
    srcElement?.reset()
    location.href = '/admin/usuarios'
}

export {
    submit,
}
import * as UserModel from '@scripts/models/user.model'
import * as CookieLib from '@scripts/lib/cookie.lib'

import * as FormHelper from '@scripts/helpers/form.helper'
import * as AuthHelper from '@scripts/helpers/auth.helper'


const submit = async ({ e, srcElement }) => {
    e.preventDefault()

    const usernameInput = srcElement?.querySelector('#username')
    const lastnameInput = srcElement?.querySelector('#last_name')
    const emailInput = srcElement?.querySelector('#email')
    const passwordInput = srcElement?.querySelector('#password')
    const confirmPasswordInput = srcElement?.querySelector('#confirm-password')
    const phoneInput = srcElement?.querySelector('#phone')
    const activeInput = srcElement?.querySelector('[name="active"]:checked')

    const username = usernameInput?.value
    const last_name = lastnameInput?.value
    const email = emailInput?.value
    const password = passwordInput?.value
    const confirmPassword = confirmPasswordInput?.value
    const phone = phoneInput?.value
    const active = activeInput?.value === 'yes'

    FormHelper.freeze({ form: srcElement })
    FormHelper.resetInvalid({ form: srcElement })
    
    const credential = await CookieLib.getAutorizationCookie()
    const token = JSON.parse(credential || '{}')?.token

    const verifyTokenResult = await AuthHelper.verify({ token })
    console.log('--- verifyTokenResult =', verifyTokenResult)
    if (verifyTokenResult?.err){
        location.href = '/login'
        return
    }

    if (password !== confirmPassword) {
        FormHelper.showInvalid({
            form: srcElement,
            data: {
                inForm: true,
                desc: 'DIFFERENT PASSWORD'
            }
        })
        
        FormHelper.unfreeze({ form: srcElement })
        return
    }

    const user = {
        username,
        password,
        email,
        first_name: `${username} nombre`,
        last_name,
        phone,
        active,
    }

    console.log('--- user to add =', user)

    const addUserResult = await UserModel.add({ token, user })
    if (addUserResult?.err){
        FormHelper.showInvalid({
            form: srcElement,
            data: {
                inForm: true,
                desc: addUserResult.err?.join('-'),
            }
        })

        FormHelper.unfreeze({ form: srcElement })
        return
    }
    console.log('--- addUserResult =', addUserResult)

    location?.reload()
}

export {
    submit,
}
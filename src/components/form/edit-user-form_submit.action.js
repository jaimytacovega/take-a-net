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

    const id = srcElement?.getAttribute('data-user-id')
    const username = usernameInput?.value
    const last_name = lastnameInput?.value
    const email = emailInput?.value
    const password = passwordInput?.value
    const confirmPassword = confirmPasswordInput?.value
    const phone = phoneInput?.value

    FormHelper.freeze({ form: srcElement })
    FormHelper.resetInvalid({ form: srcElement })

    if (password !== confirmPassword){
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

    const credential = await CookieLib.getAutorizationCookie()
    const token = JSON.parse(credential || '{}')?.token
    console.log('--- token =', token)

    const verifyTokenResult = await AuthHelper.verify({ token })
    console.log('--- verifyTokenResult =', verifyTokenResult)
    if (verifyTokenResult?.err){
        location.href = '/login'
        return
    }

    const user = {
        id,
        username,
        first_name: username,
        last_name,
        phone,
    }
    console.log('--- user to edit =', user)

    const editUserResult = await UserModel.update({ token, user })
    console.log('--- editUserResult =', editUserResult)

    if (editUserResult?.err){
        FormHelper.showInvalid({
            form: srcElement,
            data: {
                inForm: true,
                desc: editUserResult.err?.join('-')
            },
        })

        FormHelper.unfreeze({ form: srcElement })
        return
    }

    location?.reload()
}

export {
    submit,
}
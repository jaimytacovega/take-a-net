import * as UserModel from '@scripts/models/user.model'
import * as CookieLib from '@scripts/lib/cookie.lib'

import * as FormHelper from '@scripts/helpers/form.helper'
import * as AuthHelper from '@scripts/helpers/auth.helper'


const submit = async ({ e, srcElement }) => {
    e.preventDefault()

    const id = srcElement?.getAttribute('data-user-id')

    const credential = await CookieLib.getAutorizationCookie()
    const token = JSON.parse(credential || '{}')?.token

    FormHelper.freeze({ form: srcElement })
    FormHelper.resetInvalid({ form: srcElement })

    const verifyTokenResult = await AuthHelper.verify({ token })
    console.log('--- verifyTokenResult =', verifyTokenResult)
    if (verifyTokenResult?.err){
        location.href = '/login'
        return
    }

    const removeUserResult = await UserModel.remove({ token, id })
    console.log('--- removeUserResult =', removeUserResult)

    if (removeUserResult?.err){
        FormHelper.showInvalid({
            form: srcElement,
            data: {
                inForm: true,
                desc: removeUserResult?.err?.join('-'),
            }
        })

        FormHelper.unfreeze({ form: srcElement })
        return
    }

    location?.reload()
}

export {
    submit,
}
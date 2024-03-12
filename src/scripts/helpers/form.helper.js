const handleFreeze = ({ form, mode = 'unfreeze' }) => {
    const btnSubmit = form?.querySelector('[type="submit"]')
    const inputs = form?.querySelectorAll('input, textarea')

    for (const input of inputs) input.disabled = mode === 'freeze'
    btnSubmit.classList[mode === 'freeze' ? 'add' : 'remove']('form-loading')
}

const freeze = ({ form }) => handleFreeze({ form, mode: 'freeze' })
const unfreeze = ({ form }) => handleFreeze({ form })

const addInvalid = ({ invalid, msg }) => {
    invalid?.classList?.add('is-invalid')
    invalid?.setAttribute('data-invalid', msg)
}

const removeInvalid = ({ invalid }) => {
    invalid?.classList?.remove('is-invalid')
    invalid?.removeAttribute('data-invalid')
}

const resetInvalid = ({ form }) => {
    const invalids = form?.querySelectorAll('.is-invalid')
    invalids?.forEach((invalid) => removeInvalid({ invalid }))
    removeInvalid({ invalid: form })
}

const showInvalid = ({ form, data }) => {
    if (!data?.field && !data?.inForm) return

    const invalid = data?.inForm ? form : form.querySelector(`#${data?.field}, [name="${data?.field}"]`)?.parentNode
    addInvalid({ invalid, msg: data?.desc })
    invalid?.scrollIntoView({ behavior: 'smooth', block: 'end' })

    const msg = `Sanitize error: ${data?.desc}${data?.field ? ` in field ${data?.field} ` : ' '}for `
    console.info(msg, data?.doc)
}


export {
    freeze,
    unfreeze,

    resetInvalid,
    showInvalid,    
}

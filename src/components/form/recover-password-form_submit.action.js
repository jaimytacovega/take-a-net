const submit = ({ e, srcElement }) => {
    e.preventDefault()

    const emailInput = srcElement?.querySelector('#email')
    const email = emailInput?.value

    if (email){
        // TODO: should contact server
        location.href = `/recuperar-contrasena-enviado?email=${email}`
    }
}

export {
    submit,
}
const click = ({ e, srcElement }) => {
    e.preventDefault()

    const id = srcElement?.getAttribute('data-dialog-id')
    const dialog = document?.querySelector(`#${id}`)
    dialog?.showModal()
}

export {
    click,
}
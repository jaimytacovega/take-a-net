const dialogModesToRemove = ['edit', 'remove']

const click = ({ e, srcElement }) => {
    const dialog = srcElement?.closest('dialog')
    const form = dialog?.querySelector('form')

    dialog?.close()
    form?.reset()

    const mode = dialog?.getAttribute('data-mode')
    if (!dialogModesToRemove?.includes(mode)) return
    dialog?.remove()
}

export {
    click,
}
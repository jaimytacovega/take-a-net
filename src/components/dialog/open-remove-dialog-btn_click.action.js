import * as CrudUserDialog from '@components/dialog/crud-user-dialog.component'


const click = ({ e, srcElement }) => {
    const script = srcElement?.parentNode?.querySelector('script[data-user]')
    const user = JSON.parse(script?.textContent || '{}')
    const dialogId = `remove-user-${user?.username}`?.replaceAll(' ', '-')

    const dialogHTML = CrudUserDialog.getHTML({
        dialogId,
        description: 'Estas apunto de eliminar a un usuario',
        mode: 'remove',
        user,
    })

    document?.body?.insertAdjacentHTML('beforeend', dialogHTML)

    const dialog = document?.querySelector(`#${dialogId}`)
    console.log('--- dialog =', dialog)
    dialog?.showModal()
}

export {
    click,
}
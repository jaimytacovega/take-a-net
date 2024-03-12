import * as CrudUserDialog from '@components/dialog/crud-user-dialog.component'


const click = ({ e, srcElement }) => {
    const script = srcElement?.parentNode?.querySelector('script[data-user]')
    const user = JSON.parse(script?.textContent || '{}')
    const dialogId = `edit-user-${user?.username}`?.replaceAll(' ', '-')

    const oldDialog = document?.querySelector(`#${dialogId}`)
    if (oldDialog) oldDialog?.remove()

    const dialogHTML = CrudUserDialog.getHTML({
        dialogId,
        title: 'Editar usuario',
        description: 'Edita los siguientes datos del usuario',
        mode: 'edit',
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
import { html } from '@scripts/lib/html.lib'


const confirmButton = {
    'add': 'Crear',
    'edit': 'Guardar',
    'remove': 'Confirmar',
}

const getHTML = ({ dialogId, title, description, mode, user }) => {
    console.log('--- user =', user)
    return html`
        <dialog id="${dialogId}" class="crud-dialog card-white" data-mode="${mode}">
            <header>
                ${
                    mode === 'remove' ? html`
                        <h2>Estás seguro de esto?</h2>
                        <img src="/img/icon/bell-gray-3.svg" width="20" height="20" alt="estas seguro de esto?">
                    ` : html`
                        <button 
                            class="btn btn-primary" 

                            on-click="close-crud-dialog-btn_click.action"
                        >
                            <span>Atrás</span>
                        </button>
                    `
                }
                
            </header>
            <div class="content">
                <header>
                    <h3>${title}</h3>
                    <p>${description}</p>
                </header>
                <form 
                    class="col-2" 

                    data-user-id="${user?.id || ''}"
                    data-username="${user?.username || ''}"
                    on-submit="${mode}-user-form_submit.action"
                >
                    ${
                        mode === 'remove' ? '' : html`
                            <fieldset>
                                <input type="text" id="username" placeholder="Nombre de usuario" value="${user?.username || ''}" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="last_name" placeholder="Apellidos" value="${user?.last_name || ''}" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="password" placeholder="Contraseña" value="" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="email" placeholder="E-mail" value="${user?.email || ''}" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="confirm-password" placeholder="Confirmar contraseña" value="" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="phone" placeholder="Teléfono" value="${user?.phone || ''}" required>
                            </fieldset>
                            <fieldset>
                                <input type="file" id="photo">
                                <label for="photo"></label>
                            </fieldset>
                            <fieldset>
                                <label>
                                    <strong>Está activo?</strong>
                                </label>
                                <input type="radio" name="active" id="active-yes"${user?.active ? ' checked' : ''} value="yes">
                                <label for="active-yes">Sí</label>
                                <input type="radio" name="active" id="active-no"${!user?.active ? ' checked' : ''} value="no">
                                <label for="active-no">No</label>
                            </fieldset>
                        `
                    }
                    <fieldset>
                        <button 
                            class="btn btn-bordered btn-bordered-blue-1" 
                            type="button" 

                            on-click="close-crud-dialog-btn_click.action"
                        >Cancelar</button>
                        <button class="btn btn-primary btn-primary-blue-1" type="submit">${confirmButton[mode]}</button>
                    </fieldset>
                </form>
            </div>
        </dialog> 
    `
}

export {
    getHTML,
}
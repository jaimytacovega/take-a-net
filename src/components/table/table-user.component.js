import { html, stream } from '@scripts/lib/html.lib'


const getHTML = ({ users }) => {
    return html`
        <table>
            <thead>
                <tr>
                    <th class="col-actions">
                        <button class="btn btn-primary">
                            <span>Usuario</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Usuario">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Nombre</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Nombre">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Apellidos</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Apellidos">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>E-mail</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por E-mail">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Teléfono</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Teléfono">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Estado</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Estado">
                        </button> 
                    </th>                                        
                </tr>
            </thead>
            <tbody>
                ${
                    users?.map((user) => {
                        return html`
                            <tr>
                                <td class="col-actions">
                                    <div class="card-cell"> 
                                    <p>${user?.username}</p>
                                    <div class="btn-popup">
                                        <span class="btn btn-primary btn-primary-blue-1 popup-trigger" tabindex="-1">
                                            <span>Acciones</span>
                                            <img src="/img/icon/chevron-down-white.svg" width="16" height="16" alt="agregar usuario">
                                            <menu class="popup">
                                                <button 
                                                    class="btn btn-primary" 

                                                    on-click="open-edit-dialog-btn_click.action"
                                                >
                                                    <img src="/img/icon/edit-gray-3.svg" width="16" height="16" alt="editar usuario">
                                                    <span>Editar</span>
                                                </button>
                                                <button 
                                                    class="btn btn-primary" 

                                                    on-click="open-remove-dialog-btn_click.action"
                                                >
                                                    <img src="/img/icon/trash-gray-3.svg" width="16" height="16" alt="eliminar usuario">
                                                    <span>Eliminar</span>
                                                </button>
                                                <script data-user type="application/json">${JSON.stringify(user)}</script> 
                                            </menu>
                                        </span>
                                    </div>
                                    </div>
                                    
                                </td>
                                <td>
                                    <p>${user?.first_name || '-'}</p>
                                </td>
                                <td>
                                    <p>${user?.last_name  || '-'}</p>
                                </td>
                                <td>
                                    <p>${user?.email  || '-'}</p>
                                </td>
                                <td>
                                    <p>${user?.phone || '-'}</p>
                                </td>
                                <td>
                                    <p class="btn btn-status" data-${user?.active ? 'ac' : 'inac'}tive>
                                        <span>${user?.active ? 'Ac' : 'Inac'}tivo</span>
                                    </p>
                                </td>
                            </tr>
                        `
                    })?.join('')
                }
            </tbody>
        </table>
    `
}

export {
    getHTML,
}
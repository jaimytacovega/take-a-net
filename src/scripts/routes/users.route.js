import * as TableUserRowComponent from '@components/table/table-user.component'
import * as CrudUserDialog from '@components/dialog/crud-user-dialog.component'


import { html, stream } from '@scripts/lib/html.lib'

import * as CookieLib from '@scripts/lib/cookie.lib'
import * as UserModel from '@scripts/models/user.model'
import * as AuthHelper from '@scripts/helpers/auth.helper'


const getRoute = async ({ request, url, env }) => {
    const credential = await CookieLib.getAutorizationCookie({ request })
    const token = JSON.parse(credential || '{}')?.token

    const verifyTokenResult = await AuthHelper.verify({ token })
    if (verifyTokenResult?.err) return { response: Response.redirect(`${url?.origin}/login`) }

    const usersResult = await UserModel.getAll({ token })
    const users = usersResult?.data || []    

    const streamResult = stream({
        head: () => html`
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuarios | Take A Net</title>

            <link rel="stylesheet" href="/global.component.css">
            <link rel="stylesheet" href="/main.component.css">
            <link rel="stylesheet" href="/button.component.css">
            <link rel="stylesheet" href="/dialog.component.css">
            <link rel="stylesheet" href="/form.component.css">
            <link rel="stylesheet" href="/table.component.css">
            <link rel="stylesheet" href="/card.component.css">
            <link rel="stylesheet" href="/card-user.component.css">
            <link rel="stylesheet" href="/card-table.component.css">
            <link rel="stylesheet" href="/breadcrumb.component.css">
        `,
        body: () => html`
            <main class="admin-main">
                <header>
                    <select class="btn btn-shadow-white" name="" id="">
                        <option value="" disabled="" selected="">Filtros</option>
                        <option value="">Filtro #1</option>
                        <option value="">Filtro #2</option>
                    </select>
                    <menu class="admin-actions">
                        <button class="btn">
                            <img src="/img/icon/search-gray-3.svg" width="20" height="20" alt="buscar">
                        </button>
                        <button class="btn btn-notification" data-active>
                            <img src="/img/icon/bell-gray-3.svg" width="20" height="20" alt="notificaciones">
                        </button>
                        <button class="btn btn-notification" data-active>
                            <img src="/img/icon/mail-gray-3.svg" width="20" height="20" alt="mensajes">
                        </button>
                        <button class="btn">
                            <img src="/img/icon/power-gray-3.svg" width="20" height="20" alt="cuenta">
                        </button>
                    </menu>
                </header>
                <aside>
                    <menu class="admin-home">
                        <a href="/admin/usuarios" class="btn">
                            <img src="/img/logo/take-a-net-logo.svg" width="156" height="24" alt="take a net">
                        </a>
                    </menu>
                    <div class="card-user">
                        <img src="/img/user/user.webp" width="64" height="64" alt="Nombre Apellidos">
                        <div class="content">
                            <h4>Nombre Apellidos</h4>
                            <p>Cargo</p>
                        </div>
                        <button class="btn btn-bordered btn-bordered-blue-1">Editar perfil</button>
                    </div>
                    <menu class="admin-nav">
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar clientes">
                                    <span>Clientes</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo cliente">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar proyectos">
                                    <span>Proyectos</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo proyecto">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar rutas">
                                    <span>Rutas</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nueva ruta">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar colaboradores">
                                    <span>Colaboradores</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo colaborador">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar permisos">
                                    <span>Permisos</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo permiso">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar usuarios">
                                    <span>Usuarios</span>
                                </button>
                            </summary>
                            <nav>
                                    <button 
                                        class="btn btn-primary btn-primary-gray-4"
                                        
                                        data-dialog-id="add-user"
                                        on-click="open-dialog-btn_click.action"
                                    >
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo usuario">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                    </menu>
                </aside>
                <div class="content">
                    <header>
                        <menu class="breadcrumb">
                            <a>Inicio</a>
                            <p>/</p>
                            <a>Usuarios</a>
                            <p>/</p>
                            <p><strong>Listado</strong></p>
                        </menu>
                        <menu>
                            <button 
                                class="btn btn-primary btn-primary-blue-1" 

                                data-dialog-id="add-user"
                                on-click="open-dialog-btn_click.action"
                            >
                                <img src="/img/icon/plus-white.svg" width="20" height="20" alt="agregar usuario">
                            </button>
                        </menu>
                    </header>
                    <div class="card-table card-white">
                        <header>
                            <menu>
                            </menu>
                            <menu>
                                <select class="btn btn-bordered btn-bordered-blue-1" name="" id="">
                                    <option value="" disabled selected>Filtros</option>
                                    <option value="">Filtro #1</option>
                                    <option value="">Filtro #2</option>
                                </select>
                            </menu>
                        </header>
                        <div class="content">
                            ${TableUserRowComponent.getHTML({ users })}
                        </div>
                    </div>
                </div>
            </main> 
            ${CrudUserDialog.getHTML({
                dialogId: 'add-user',
                title: 'Nuevo usuario',
                description: 'Añade los siguientes datos al nuevo usuario.',
                mode: 'add',
            })}
        `,
        env,
    })

    const response = streamResult?.response
    const authCookie = response?.headers?.getAll('Set-Cookie')?.filter(cookie => !cookie.startsWith('Authorization'))
    console.log('--- authCookie =', authCookie)

    return streamResult
}


export {
    getRoute,
}
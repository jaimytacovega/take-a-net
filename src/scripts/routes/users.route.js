import { html, stream } from '@scripts/lib/html.lib'


const getRoute = async ({ request, env }) => {
    return stream({
        head: () => html`
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuarios | Take A Net</title>

            <link rel="stylesheet" href="/global.component.css">
            <link rel="stylesheet" href="/main.component.css">
            <link rel="stylesheet" href="/button.component.css">
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
                            <img src="/img/icon/search-gray-3.svg" alt="buscar">
                        </button>
                        <button class="btn btn-notification" data-active>
                            <img src="/img/icon/bell-gray-3.svg" alt="notificaciones">
                        </button>
                        <button class="btn btn-notification" data-active>
                            <img src="/img/icon/mail-gray-3.svg" alt="mensajes">
                        </button>
                        <button class="btn">
                            <img src="/img/icon/power-gray-3.svg" alt="cuenta">
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
                        <details open>
                            <summary>
                                <button class="btn btn-primary btn-primary-transp-gray-3">
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar clientes">
                                    <span>Clientes</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="mostrar clientes">
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
                            <button class="btn btn-primary btn-primary-blue-1">
                                <img src="/img/icon/plus-white.svg" width="24" height="24" alt="agregar usuario">
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
                            <table>
                                <thead>
                                    <tr>
                                        <th>
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
                                    <tr>
                                        <td>
                                            <div class="card-cell"> 
                                            <p>Nombre de usuario</p>
                                            <div class="btn-popup">
                                                <span class="btn btn-primary btn-primary-blue-1 popup-trigger" tabindex="-1">
                                                    <span>Acciones</span>
                                                    <img src="/img/icon/chevron-down-white.svg" width="16" height="16" alt="agregar usuario">
                                                    <menu class="popup">
                                                        <button class="btn btn-primary">
                                                            <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="mostrar clientes">
                                                            <span>Editar</span>
                                                        </button>
                                                        <button class="btn btn-primary">
                                                            <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="mostrar clientes">
                                                            <span>Eliminar</span>
                                                        </button>
                                                    </menu>
                                                </span>
                                            </div>
                                            </div>
                                           
                                        </td>
                                        <td>
                                            <p>Nombre de usuario</p>
                                        </td>
                                        <td>
                                            <p>Apellidos</p>
                                        </td>
                                        <td>
                                            <p>email@email.com</p>
                                        </td>
                                        <td>
                                            <p>000 000 000</p>
                                        </td>
                                        <td>
                                            <p class="btn btn-status">
                                                <span>Activo</span>
                                            </p>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main> 
        `,
        env,
    })
}


export {
    getRoute,
}
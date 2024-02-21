import { html, stream } from '@scripts/lib/html.lib'


const getRoute = async ({ request, env }) => {
    return stream({
        head: () => html`
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login | Take A Net</title>

            <link rel="stylesheet" href="/global.component.css">
            <link rel="stylesheet" href="/main.component.css">
            <link rel="stylesheet" href="/button.component.css">
            <link rel="stylesheet" href="/form.component.css">
            <link rel="stylesheet" href="/card.component.css">
        `,
        body: () => html`
            <main class="auth-main">
                <div class="content">
                    <div class="card-auth card-white">
                        <img src="/img/logo/take-a-net-logo.svg" width="200" height="30" alt="take a note">
                        <form>
                            <fieldset>
                                <input type="text" placeholder="Nombre de usuario">
                            </fieldset>
                            <fieldset>
                                <input type="password" placeholder="Contraseña">
                                <button 
                                    class="btn" 
                                    type="button"
                                >
                                    <img src="/img/icon/eye-blue-1.svg" width="20" height="20" alt="mostrar contraseña">
                                </button>
                            </fieldset>
                            <fieldset>
                                <button 
                                    class="btn btn-primary btn-primary-blue-1" 
                                    type="submit">Acceder a mi cuenta</button>
                            </fieldset>
                            <fieldset>
                                <fieldset>
                                    <input type="checkbox" id="remember-me">
                                    <label for="remember-me">Recordarme</label>
                                </fieldset>
                                <a class="btn-blue-1" href="/recuperar-contraseña">Has olvidado tu contraseña?</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="thumbnail">
                    <img src="/img/thumbnail/auth-thumbnail.webp"> 
                    <h1>Bienvenido a Take A Net 2</h1>
                    <p>
                        Mediante nuestra <strong>Plataforma online</strong> podrá obtener informes de evaluación de 
                        la auditoría de su empresa de forma online con una interfaz intuitiva y de facil manejo.
                    </p>
                </div>
            </main>
        `,
        env,
    })
}


export {
    getRoute,
}
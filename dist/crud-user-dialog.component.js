var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
import { s as stream$1 } from "./worker.lib.js";
const Scope = {
  Cloudflare: "cloudflare-worker",
  ServiceWorker: "service-worker",
  Window: "window"
};
const isWindow = () => typeof window === "object";
const isServiceWorker = ({ env }) => !env && typeof ServiceWorkerGlobalScope !== "undefined";
const isCloudflareWorker = ({ env }) => env == null ? void 0 : env.IS_CLOUDFLARE_WORKER;
const getScope = ({ env }) => {
  if (isCloudflareWorker({ env }))
    return Scope.Cloudflare;
  if (isServiceWorker({ env }))
    return Scope.ServiceWorker;
  if (isWindow())
    return Scope.Window;
};
const getEnv = ({ env }) => {
  var _a2;
  if (isCloudflareWorker({ env }))
    return env.ENV;
  if (isServiceWorker({ env }))
    return "dev";
  if (isWindow())
    return (_a2 = document == null ? void 0 : document.body) == null ? void 0 : _a2.getAttribute("data-env");
};
const isDevEnv = ({ env }) => {
  return getEnv({ env }) === "dev";
};
const X5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getEnv,
  getScope,
  isDevEnv
}, Symbol.toStringTag, { value: "Module" }));
const html = (s, ...args) => s == null ? void 0 : s.map((ss, i) => `${ss}${args[i] !== void 0 ? args[i] : ""}`).join("");
const LISTENER_SCRIPT = html(_a || (_a = __template([`
    <script defer>
        (() => {
            const addListener = ({ srcElement, event, callbacks }) => {
                srcElement?.addEventListener(event, (e) => {
                    executeCallbacks({ e, srcElement, callbacks })
                })
            }

            const executeCallbacks = ({ e, srcElement, callbacks }) => {
                callbacks?.forEach((callback) => {
                    if (callback) callback({ e, srcElement })
                })
            }

            const getCallbackInModule = ({ customModule, event }) => {
                if (!customModule) return null
                if (customModule[event]) return customModule[event]
                const prev = Object.keys(customModule)?.find((key) => customModule[key][event])
                if (!prev) return null
                return customModule[prev][event]
            }

            const getSrcElement = ({ srcElement, event }) => {
                const attribute = 'on-' + event
                const hasActionStarter = srcElement?.hasAttribute(attribute)
                if (hasActionStarter) return srcElement

                const query = ':is(a, button, li)[' + attribute + ']'
                const closestButton = srcElement?.closest(query)
                if (closestButton) return closestButton

                return srcElement
            }

            const fetchListener = async ({ srcElement, event, e }) => {
                const starter = srcElement?.getAttribute('on-' + event)
                if (!starter) return

                if (starter && ['submit'].includes(event)) e.preventDefault()

                const helpers = await Promise.all(
                    starter?.split(',')?.map((helperName) => {
                        const toImport = '/' + helperName?.trim() + '.js'
                        return import(toImport)?.catch((err) => { })
                    })
                )

                const callbacks = helpers?.map((helper) => getCallbackInModule({ customModule: helper, event }))

                if (['load', 'click', 'submit'].includes(event)) executeCallbacks({ e, srcElement, callbacks })
                if (['invalid', 'click', 'submit'].includes(event)) addListener({ srcElement, event, callbacks })
                srcElement?.removeAttribute('on-' + event)
            }

            // load
            const configLoad = () => {
                const event = 'load'
                const srcElements = document?.querySelectorAll('[on-' + event + ']')
                //console.log('--- srcElements load =', srcElements)

                srcElements?.forEach(async (srcElement) => {
                    fetchListener({ srcElement, event, e: null })
                })
            }

            // invalid
            const configInvalid = () => {
                const event = 'invalid'
                const srcElements = document?.querySelectorAll('[on-' + event + ']')
                //console.log('--- srcElements invalid =', srcElements)

                srcElements?.forEach(async (srcElement) => {
                    fetchListener({ srcElement, event, e: null })
                })
            }

            // event-listeners
            const configEventListeners = () => {
                ['mouseover', 'click', 'submit']?.forEach((event) => document.body['on' + event] = async (e) => {
                    /*
                    if (['mouseover', 'click'].includes(event)){
                        await addScripts()     
                
                        configLoad()
                        configInvalid()
                        configObservers()
                    }
                    */

                    const srcElement = getSrcElement({ srcElement: e.srcElement, event })
                    fetchListener({ srcElement, event, e })
                })
            }

            // observers
            const configObservers = () => {
                const srcElements = [...document.querySelectorAll('[on-observe]')]
                //console.log('--- srcElements observer =', srcElements)
                
                const uniqueStarters = [...srcElements?.reduce((acc, srcElement) => {
                    const starters = srcElement?.getAttribute('on-observe')?.split(',')
                    starters?.forEach((starter) => acc?.set(starter, 1))
                    return acc
                }, new Map())?.keys()]

                uniqueStarters?.forEach(async (starter) => {
                    const starterElements = document.querySelectorAll('[on-observe*="' + starter + '"]')

                    const helper = await import('/' + starter?.trim() + '.js')?.catch((err) => { })
                    const callback = getCallbackInModule({ customModule: helper, event: 'observe' })
                    if (!callback) return

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => callback({ entry, observer }))
                    })

                    starterElements?.forEach((starterElement) => {
                        observer.observe(starterElement)

                        const observerAttr = starterElement?.getAttribute('on-observe') ?? ''
                        const updatedObserverAttr = observerAttr?.replaceAll(starter + ', ', '')?.replaceAll(', ' + starter, '')?.replaceAll(starter, '') ?? ''

                        if (updatedObserverAttr === '') starterElement.removeAttribute('on-observe')
                        else starterElement.setAttribute('on-observe', updatedObserverAttr)
                    })
                })
            }

            const loadScript = ({ id, attrs, content }) => {
                const script = document?.createElement('script')

                Object.keys(attrs)?.forEach((attrKey) => script?.setAttribute(attrKey, attrs[attrKey]))
                script.id = id

                if (content) script?.insertAdjacentHTML('beforeend', content)

                return new Promise((resolve, reject) => {
                    if (!attrs.src) {
                        resolve()
                        document?.body?.insertAdjacentElement('beforeend', script)
                        return
                    }

                    script.onload = script.onreadystatechange = function () {
                        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                            resolve()
                            script.onload = script.onreadystatechange = null
                        }
                    }

                    script.onerror = () => {
                        console.log('--- script failed to load')
                        reject(new Error('Failed to load script with src ' + script.src))
                    }

                    document?.body?.insertAdjacentElement('beforeend', script)
                })
            }

            const addScripts = () => {
                const scriptsToLoad = [...document.querySelectorAll('script[data-script-to-load]')]
                return Promise.all(
                    scriptsToLoad?.map((scriptToLoad) => {
                        const id = scriptToLoad?.getAttribute('data-script-to-load')
                        scriptToLoad.removeAttribute('data-script-to-load')

                        const attrs = scriptToLoad?.getAttributeNames()?.reduce((acc, attrName) => {
                            const attrValue = scriptToLoad.getAttribute(attrName)
                            if (attrValue !== 'text/script-to-load') acc[attrName] = attrValue
                            return acc
                        }, {})

                        const content = scriptToLoad?.textContent

                        return loadScript({ id, attrs, content }).catch((err) => {
                            console.error(err)
                        })
                    })
                )
            }

            configEventListeners()

            /*
            window.onload = async () => {
                await addScripts()     
                
                configLoad()
                configInvalid()
                configObservers()
            }
            */

            
            window.onload = async () => {
                const customLoadEventName = 'my-custom-load'
                const customLoadEvent = new Event(customLoadEventName)

                document?.body?.addEventListener(customLoadEventName, async () => {

                    await addScripts()     
                
                    configLoad()
                    configInvalid()
                    configObservers()
                })

                document.body.dispatchEvent(customLoadEvent)
            }
            
        })()
    <\/script>
`])));
const stream = ({ head, body, scripts, env }) => {
  const headers = new Headers();
  headers.append("Content-Type", "text/html;charset=UTF-8");
  const callbacks = [
    () => html`
            <!DOCTYPE html>
            <html lang="es">
            <head>
        `,
    head,
    () => html`
            </head>
            <body 
                data-scope=${getScope({ env })}" 
                data-env=${getEnv({ env })}"
            >
        `,
    body,
    () => html`
            ${LISTENER_SCRIPT}
            ${isDevEnv({ env }) ? "" : SW_REGISTER_SCRIPT}
        `,
    scripts ?? (() => ""),
    () => html`
            </body>
            </html>
        `
  ];
  return stream$1({ callbacks, headers });
};
const X2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  html,
  stream
}, Symbol.toStringTag, { value: "Module" }));
const confirmButton = {
  "add": "Crear",
  "edit": "Guardar",
  "remove": "Confirmar"
};
const getHTML = ({ dialogId, title, description, mode, user }) => {
  console.log("--- user =", user);
  return html`
        <dialog id="${dialogId}" class="crud-dialog card-white" data-mode="${mode}">
            <header>
                ${mode === "remove" ? html`
                        <h2>Estás seguro de esto?</h2>
                        <img src="/img/icon/bell-gray-3.svg" width="20" height="20" alt="estas seguro de esto?">
                    ` : html`
                        <button 
                            class="btn btn-primary" 

                            on-click="close-crud-dialog-btn_click.action"
                        >
                            <span>Atrás</span>
                        </button>
                    `}
                
            </header>
            <div class="content">
                <header>
                    <h3>${title}</h3>
                    <p>${description}</p>
                </header>
                <form 
                    class="col-2" 

                    data-user-id="${(user == null ? void 0 : user.id) || ""}"
                    data-username="${(user == null ? void 0 : user.username) || ""}"
                    on-submit="${mode}-user-form_submit.action"
                >
                    ${mode === "remove" ? "" : html`
                            <fieldset>
                                <input type="text" id="username" placeholder="Nombre de usuario" value="${(user == null ? void 0 : user.username) || ""}" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="last_name" placeholder="Apellidos" value="${(user == null ? void 0 : user.last_name) || ""}" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="password" placeholder="Contraseña" value="" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="email" placeholder="E-mail" value="${(user == null ? void 0 : user.email) || ""}" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="confirm-password" placeholder="Confirmar contraseña" value="" required>
                            </fieldset>
                            <fieldset>
                                <input type="text" id="phone" placeholder="Teléfono" value="${(user == null ? void 0 : user.phone) || ""}" required>
                            </fieldset>
                            <fieldset>
                                <input type="file" id="photo">
                                <label for="photo"></label>
                            </fieldset>
                            <fieldset>
                                <label>
                                    <strong>Está activo?</strong>
                                </label>
                                <input type="radio" name="active" id="active-yes"${(user == null ? void 0 : user.active) ? " checked" : ""} value="yes">
                                <label for="active-yes">Sí</label>
                                <input type="radio" name="active" id="active-no"${!(user == null ? void 0 : user.active) ? " checked" : ""} value="no">
                                <label for="active-no">No</label>
                            </fieldset>
                        `}
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
    `;
};
export {
  X2 as X,
  X5 as a,
  getHTML as g
};

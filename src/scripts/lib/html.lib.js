import * as WorkerLib from '@scripts/lib/worker.lib'
import * as UtilLib from '@scripts/lib/util.lib'

const html = (s, ...args) => s?.map((ss, i) => `${ss}${args[i] !== undefined ? args[i] : ''}`).join('')

const LISTENER_SCRIPT = html`
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
    </script>
`

const stream = ({ head, body, scripts, env }) => {
    const headers = new Headers()
    headers.append('Content-Type', 'text/html;charset=UTF-8')

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
                data-scope=${UtilLib.getScope({ env })}" 
                data-env=${UtilLib.getEnv({ env })}"
            >
        `,
        body,
        () => html`
            ${LISTENER_SCRIPT}
            ${UtilLib.isDevEnv({ env }) ? '' : SW_REGISTER_SCRIPT}
        `,
        scripts ?? (() => ''),
        () => html`
            </body>
            </html>
        `
    ]

    return WorkerLib.stream({ callbacks, headers })
}

export {
    html,
    stream,
}
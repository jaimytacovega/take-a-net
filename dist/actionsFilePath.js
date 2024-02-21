var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _i, _n, _t, _e, _s, _l, _o, _d, _p, _g, _r, r_fn, _R, R_fn, _b, b_fn, _u, u_fn, _m, m_fn, _a, a_fn, _P, P_fn, _E, E_fn, _S, S_fn, _O, O_fn, _k, k_fn, _x, x_fn, _h, h_fn, _f, f_fn, _T, T_fn, _A, A_fn, _y, y_fn, _w, w_fn, _c, c_fn, _C, C_fn, _a2, _i2, _n2, _t2, _e2, _s2, _l2, _b2, _a3;
const executeOnScheduler = async ({ callback, signal, priority }) => {
  var _a4;
  try {
    if (!((_a4 = self == null ? void 0 : self.scheduler) == null ? void 0 : _a4.postTask))
      return { data: await callback() };
    const data = await scheduler.postTask(callback, { priority, signal });
    return { data };
  } catch (err) {
    return { err };
  }
};
const stream$1 = ({ callbacks, headers }) => {
  const { readable, writable } = new TransformStream();
  const done = (async () => {
    var _a4;
    for (const callback of callbacks) {
      const abortController = new AbortController();
      const executeOnSchedulerResult = await executeOnScheduler({ callback, signal: abortController.signal, priority: "background" });
      const html2 = (executeOnSchedulerResult == null ? void 0 : executeOnSchedulerResult.err) ?? (executeOnSchedulerResult == null ? void 0 : executeOnSchedulerResult.data);
      const response = new Response(html2, { headers, status: 200 });
      await ((_a4 = response.body) == null ? void 0 : _a4.pipeTo(writable, { preventClose: true }));
      abortController.abort();
    }
    writable.getWriter().close();
  })();
  return {
    done,
    response: new Response(readable, { headers })
  };
};
const fetch = async ({ url, request, ...config }) => {
  var _a4;
  try {
    const response = await ((_a4 = self == null ? void 0 : self.fetch(url || request, config)) == null ? void 0 : _a4.catch((err) => ({ err })));
    if (response == null ? void 0 : response.err)
      return response;
    return { response };
  } catch (err) {
    return { err };
  }
};
const X6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetch,
  stream: stream$1
}, Symbol.toStringTag, { value: "Module" }));
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
  var _a4;
  if (isCloudflareWorker({ env }))
    return env.ENV;
  if (isServiceWorker({ env }))
    return "dev";
  if (isWindow())
    return (_a4 = document == null ? void 0 : document.body) == null ? void 0 : _a4.getAttribute("data-env");
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
const LISTENER_SCRIPT = html(_a3 || (_a3 = __template([`
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
var R = class {
  constructor(t, r, n, o, c, l) {
    __publicField(this, "type", 3);
    __publicField(this, "name", "");
    __publicField(this, "prefix", "");
    __publicField(this, "value", "");
    __publicField(this, "suffix", "");
    __publicField(this, "modifier", 3);
    this.type = t, this.name = r, this.prefix = n, this.value = o, this.suffix = c, this.modifier = l;
  }
  hasCustomName() {
    return this.name !== "" && typeof this.name != "number";
  }
}, be = /[$_\p{ID_Start}]/u, Pe = /[$_\u200C\u200D\p{ID_Continue}]/u, M = ".*";
function Re(e, t) {
  return (t ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(e);
}
function v(e, t = false) {
  let r = [], n = 0;
  for (; n < e.length; ) {
    let o = e[n], c = function(l) {
      if (!t)
        throw new TypeError(l);
      r.push({ type: "INVALID_CHAR", index: n, value: e[n++] });
    };
    if (o === "*") {
      r.push({ type: "ASTERISK", index: n, value: e[n++] });
      continue;
    }
    if (o === "+" || o === "?") {
      r.push({ type: "OTHER_MODIFIER", index: n, value: e[n++] });
      continue;
    }
    if (o === "\\") {
      r.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] });
      continue;
    }
    if (o === "{") {
      r.push({ type: "OPEN", index: n, value: e[n++] });
      continue;
    }
    if (o === "}") {
      r.push({ type: "CLOSE", index: n, value: e[n++] });
      continue;
    }
    if (o === ":") {
      let l = "", s = n + 1;
      for (; s < e.length; ) {
        let i = e.substr(s, 1);
        if (s === n + 1 && be.test(i) || s !== n + 1 && Pe.test(i)) {
          l += e[s++];
          continue;
        }
        break;
      }
      if (!l) {
        c(`Missing parameter name at ${n}`);
        continue;
      }
      r.push({ type: "NAME", index: n, value: l }), n = s;
      continue;
    }
    if (o === "(") {
      let l = 1, s = "", i = n + 1, a = false;
      if (e[i] === "?") {
        c(`Pattern cannot start with "?" at ${i}`);
        continue;
      }
      for (; i < e.length; ) {
        if (!Re(e[i], false)) {
          c(`Invalid character '${e[i]}' at ${i}.`), a = true;
          break;
        }
        if (e[i] === "\\") {
          s += e[i++] + e[i++];
          continue;
        }
        if (e[i] === ")") {
          if (l--, l === 0) {
            i++;
            break;
          }
        } else if (e[i] === "(" && (l++, e[i + 1] !== "?")) {
          c(`Capturing groups are not allowed at ${i}`), a = true;
          break;
        }
        s += e[i++];
      }
      if (a)
        continue;
      if (l) {
        c(`Unbalanced pattern at ${n}`);
        continue;
      }
      if (!s) {
        c(`Missing pattern at ${n}`);
        continue;
      }
      r.push({ type: "REGEX", index: n, value: s }), n = i;
      continue;
    }
    r.push({ type: "CHAR", index: n, value: e[n++] });
  }
  return r.push({ type: "END", index: n, value: "" }), r;
}
function D(e, t = {}) {
  let r = v(e);
  t.delimiter ?? (t.delimiter = "/#?"), t.prefixes ?? (t.prefixes = "./");
  let n = `[^${S(t.delimiter)}]+?`, o = [], c = 0, l = 0, i = /* @__PURE__ */ new Set(), a = (h) => {
    if (l < r.length && r[l].type === h)
      return r[l++].value;
  }, f = () => a("OTHER_MODIFIER") ?? a("ASTERISK"), d = (h) => {
    let u = a(h);
    if (u !== void 0)
      return u;
    let { type: p, index: A } = r[l];
    throw new TypeError(`Unexpected ${p} at ${A}, expected ${h}`);
  }, T = () => {
    let h = "", u;
    for (; u = a("CHAR") ?? a("ESCAPED_CHAR"); )
      h += u;
    return h;
  }, Se = (h) => h, L = t.encodePart || Se, I = "", U = (h) => {
    I += h;
  }, $ = () => {
    I.length && (o.push(new R(3, "", "", L(I), "", 3)), I = "");
  }, V = (h, u, p, A, Y) => {
    let g = 3;
    switch (Y) {
      case "?":
        g = 1;
        break;
      case "*":
        g = 0;
        break;
      case "+":
        g = 2;
        break;
    }
    if (!u && !p && g === 3) {
      U(h);
      return;
    }
    if ($(), !u && !p) {
      if (!h)
        return;
      o.push(new R(3, "", "", L(h), "", g));
      return;
    }
    let m;
    p ? p === "*" ? m = M : m = p : m = n;
    let O = 2;
    m === n ? (O = 1, m = "") : m === M && (O = 0, m = "");
    let P;
    if (u ? P = u : p && (P = c++), i.has(P))
      throw new TypeError(`Duplicate name '${P}'.`);
    i.add(P), o.push(new R(O, P, L(h), m, L(A), g));
  };
  for (; l < r.length; ) {
    let h = a("CHAR"), u = a("NAME"), p = a("REGEX");
    if (!u && !p && (p = a("ASTERISK")), u || p) {
      let g = h ?? "";
      t.prefixes.indexOf(g) === -1 && (U(g), g = ""), $();
      let m = f();
      V(g, u, p, "", m);
      continue;
    }
    let A = h ?? a("ESCAPED_CHAR");
    if (A) {
      U(A);
      continue;
    }
    if (a("OPEN")) {
      let g = T(), m = a("NAME"), O = a("REGEX");
      !m && !O && (O = a("ASTERISK"));
      let P = T();
      d("CLOSE");
      let xe = f();
      V(g, m, O, P, xe);
      continue;
    }
    $(), d("END");
  }
  return o;
}
function S(e) {
  return e.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
function X(e) {
  return e && e.ignoreCase ? "ui" : "u";
}
function Z(e, t, r) {
  return F(D(e, r), t, r);
}
function k(e) {
  switch (e) {
    case 0:
      return "*";
    case 1:
      return "?";
    case 2:
      return "+";
    case 3:
      return "";
  }
}
function F(e, t, r = {}) {
  r.delimiter ?? (r.delimiter = "/#?"), r.prefixes ?? (r.prefixes = "./"), r.sensitive ?? (r.sensitive = false), r.strict ?? (r.strict = false), r.end ?? (r.end = true), r.start ?? (r.start = true), r.endsWith = "";
  let n = r.start ? "^" : "";
  for (let s of e) {
    if (s.type === 3) {
      s.modifier === 3 ? n += S(s.value) : n += `(?:${S(s.value)})${k(s.modifier)}`;
      continue;
    }
    t && t.push(s.name);
    let i = `[^${S(r.delimiter)}]+?`, a = s.value;
    if (s.type === 1 ? a = i : s.type === 0 && (a = M), !s.prefix.length && !s.suffix.length) {
      s.modifier === 3 || s.modifier === 1 ? n += `(${a})${k(s.modifier)}` : n += `((?:${a})${k(s.modifier)})`;
      continue;
    }
    if (s.modifier === 3 || s.modifier === 1) {
      n += `(?:${S(s.prefix)}(${a})${S(s.suffix)})`, n += k(s.modifier);
      continue;
    }
    n += `(?:${S(s.prefix)}`, n += `((?:${a})(?:`, n += S(s.suffix), n += S(s.prefix), n += `(?:${a}))*)${S(s.suffix)})`, s.modifier === 0 && (n += "?");
  }
  let o = `[${S(r.endsWith)}]|$`, c = `[${S(r.delimiter)}]`;
  if (r.end)
    return r.strict || (n += `${c}?`), r.endsWith.length ? n += `(?=${o})` : n += "$", new RegExp(n, X(r));
  r.strict || (n += `(?:${c}(?=${o}))?`);
  let l = false;
  if (e.length) {
    let s = e[e.length - 1];
    s.type === 3 && s.modifier === 3 && (l = r.delimiter.indexOf(s) > -1);
  }
  return l || (n += `(?=${c}|${o})`), new RegExp(n, X(r));
}
var x = { delimiter: "", prefixes: "", sensitive: true, strict: true }, B = { delimiter: ".", prefixes: "", sensitive: true, strict: true }, q = { delimiter: "/", prefixes: "/", sensitive: true, strict: true };
function J(e, t) {
  return e.length ? e[0] === "/" ? true : !t || e.length < 2 ? false : (e[0] == "\\" || e[0] == "{") && e[1] == "/" : false;
}
function Q(e, t) {
  return e.startsWith(t) ? e.substring(t.length, e.length) : e;
}
function Ee(e, t) {
  return e.endsWith(t) ? e.substr(0, e.length - t.length) : e;
}
function W(e) {
  return !e || e.length < 2 ? false : e[0] === "[" || (e[0] === "\\" || e[0] === "{") && e[1] === "[";
}
var ee = ["ftp", "file", "http", "https", "ws", "wss"];
function N(e) {
  if (!e)
    return true;
  for (let t of ee)
    if (e.test(t))
      return true;
  return false;
}
function te(e, t) {
  if (e = Q(e, "#"), t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.hash = e, r.hash ? r.hash.substring(1, r.hash.length) : "";
}
function re(e, t) {
  if (e = Q(e, "?"), t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.search = e, r.search ? r.search.substring(1, r.search.length) : "";
}
function ne(e, t) {
  return t || e === "" ? e : W(e) ? j(e) : z(e);
}
function se(e, t) {
  if (t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.password = e, r.password;
}
function ie(e, t) {
  if (t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.username = e, r.username;
}
function ae(e, t, r) {
  if (r || e === "")
    return e;
  if (t && !ee.includes(t))
    return new URL(`${t}:${e}`).pathname;
  let n = e[0] == "/";
  return e = new URL(n ? e : "/-" + e, "https://example.com").pathname, n || (e = e.substring(2, e.length)), e;
}
function oe(e, t, r) {
  return _(t) === e && (e = ""), r || e === "" ? e : K(e);
}
function ce(e, t) {
  return e = Ee(e, ":"), t || e === "" ? e : y(e);
}
function _(e) {
  switch (e) {
    case "ws":
    case "http":
      return "80";
    case "wws":
    case "https":
      return "443";
    case "ftp":
      return "21";
    default:
      return "";
  }
}
function y(e) {
  if (e === "")
    return e;
  if (/^[-+.A-Za-z0-9]*$/.test(e))
    return e.toLowerCase();
  throw new TypeError(`Invalid protocol '${e}'.`);
}
function le(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.username = e, t.username;
}
function fe(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.password = e, t.password;
}
function z(e) {
  if (e === "")
    return e;
  if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(e))
    throw new TypeError(`Invalid hostname '${e}'`);
  let t = new URL("https://example.com");
  return t.hostname = e, t.hostname;
}
function j(e) {
  if (e === "")
    return e;
  if (/[^0-9a-fA-F[\]:]/g.test(e))
    throw new TypeError(`Invalid IPv6 hostname '${e}'`);
  return e.toLowerCase();
}
function K(e) {
  if (e === "" || /^[0-9]*$/.test(e) && parseInt(e) <= 65535)
    return e;
  throw new TypeError(`Invalid port '${e}'.`);
}
function he(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.pathname = e[0] !== "/" ? "/-" + e : e, e[0] !== "/" ? t.pathname.substring(2, t.pathname.length) : t.pathname;
}
function ue(e) {
  return e === "" ? e : new URL(`data:${e}`).pathname;
}
function de(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.search = e, t.search.substring(1, t.search.length);
}
function pe(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.hash = e, t.hash.substring(1, t.hash.length);
}
var H = (_a2 = class {
  constructor(t) {
    __privateAdd(this, _r);
    __privateAdd(this, _R);
    __privateAdd(this, _b);
    __privateAdd(this, _u);
    __privateAdd(this, _m);
    __privateAdd(this, _a);
    __privateAdd(this, _P);
    __privateAdd(this, _E);
    __privateAdd(this, _S);
    __privateAdd(this, _O);
    __privateAdd(this, _k);
    __privateAdd(this, _x);
    __privateAdd(this, _h);
    __privateAdd(this, _f);
    __privateAdd(this, _T);
    __privateAdd(this, _A);
    __privateAdd(this, _y);
    __privateAdd(this, _w);
    __privateAdd(this, _c);
    __privateAdd(this, _C);
    __privateAdd(this, _i, void 0);
    __privateAdd(this, _n, []);
    __privateAdd(this, _t, {});
    __privateAdd(this, _e, 0);
    __privateAdd(this, _s, 1);
    __privateAdd(this, _l, 0);
    __privateAdd(this, _o, 0);
    __privateAdd(this, _d, 0);
    __privateAdd(this, _p, 0);
    __privateAdd(this, _g, false);
    __privateSet(this, _i, t);
  }
  get result() {
    return __privateGet(this, _t);
  }
  parse() {
    for (__privateSet(this, _n, v(__privateGet(this, _i), true)); __privateGet(this, _e) < __privateGet(this, _n).length; __privateSet(this, _e, __privateGet(this, _e) + __privateGet(this, _s))) {
      if (__privateSet(this, _s, 1), __privateGet(this, _n)[__privateGet(this, _e)].type === "END") {
        if (__privateGet(this, _o) === 0) {
          __privateMethod(this, _b, b_fn).call(this), __privateMethod(this, _f, f_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 9, 1) : __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _r, r_fn).call(this, 7, 0);
          continue;
        } else if (__privateGet(this, _o) === 2) {
          __privateMethod(this, _u, u_fn).call(this, 5);
          continue;
        }
        __privateMethod(this, _r, r_fn).call(this, 10, 0);
        break;
      }
      if (__privateGet(this, _d) > 0)
        if (__privateMethod(this, _A, A_fn).call(this))
          __privateSet(this, _d, __privateGet(this, _d) - 1);
        else
          continue;
      if (__privateMethod(this, _T, T_fn).call(this)) {
        __privateSet(this, _d, __privateGet(this, _d) + 1);
        continue;
      }
      switch (__privateGet(this, _o)) {
        case 0:
          __privateMethod(this, _P, P_fn).call(this) && __privateMethod(this, _u, u_fn).call(this, 1);
          break;
        case 1:
          if (__privateMethod(this, _P, P_fn).call(this)) {
            __privateMethod(this, _C, C_fn).call(this);
            let t = 7, r = 1;
            __privateMethod(this, _E, E_fn).call(this) ? (t = 2, r = 3) : __privateGet(this, _g) && (t = 2), __privateMethod(this, _r, r_fn).call(this, t, r);
          }
          break;
        case 2:
          __privateMethod(this, _S, S_fn).call(this) ? __privateMethod(this, _u, u_fn).call(this, 3) : (__privateMethod(this, _x, x_fn).call(this) || __privateMethod(this, _h, h_fn).call(this) || __privateMethod(this, _f, f_fn).call(this)) && __privateMethod(this, _u, u_fn).call(this, 5);
          break;
        case 3:
          __privateMethod(this, _O, O_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 4, 1) : __privateMethod(this, _S, S_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 5, 1);
          break;
        case 4:
          __privateMethod(this, _S, S_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 5, 1);
          break;
        case 5:
          __privateMethod(this, _y, y_fn).call(this) ? __privateSet(this, _p, __privateGet(this, _p) + 1) : __privateMethod(this, _w, w_fn).call(this) && __privateSet(this, _p, __privateGet(this, _p) - 1), __privateMethod(this, _k, k_fn).call(this) && !__privateGet(this, _p) ? __privateMethod(this, _r, r_fn).call(this, 6, 1) : __privateMethod(this, _x, x_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 7, 0) : __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
        case 6:
          __privateMethod(this, _x, x_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 7, 0) : __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
        case 7:
          __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
        case 8:
          __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
      }
    }
    __privateGet(this, _t).hostname !== void 0 && __privateGet(this, _t).port === void 0 && (__privateGet(this, _t).port = "");
  }
}, _i = new WeakMap(), _n = new WeakMap(), _t = new WeakMap(), _e = new WeakMap(), _s = new WeakMap(), _l = new WeakMap(), _o = new WeakMap(), _d = new WeakMap(), _p = new WeakMap(), _g = new WeakMap(), _r = new WeakSet(), r_fn = function(t, r) {
  var _a4, _b3, _c2;
  switch (__privateGet(this, _o)) {
    case 0:
      break;
    case 1:
      __privateGet(this, _t).protocol = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 2:
      break;
    case 3:
      __privateGet(this, _t).username = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 4:
      __privateGet(this, _t).password = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 5:
      __privateGet(this, _t).hostname = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 6:
      __privateGet(this, _t).port = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 7:
      __privateGet(this, _t).pathname = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 8:
      __privateGet(this, _t).search = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 9:
      __privateGet(this, _t).hash = __privateMethod(this, _c, c_fn).call(this);
      break;
  }
  __privateGet(this, _o) !== 0 && t !== 10 && ([1, 2, 3, 4].includes(__privateGet(this, _o)) && [6, 7, 8, 9].includes(t) && ((_a4 = __privateGet(this, _t)).hostname ?? (_a4.hostname = "")), [1, 2, 3, 4, 5, 6].includes(__privateGet(this, _o)) && [8, 9].includes(t) && ((_b3 = __privateGet(this, _t)).pathname ?? (_b3.pathname = __privateGet(this, _g) ? "/" : "")), [1, 2, 3, 4, 5, 6, 7].includes(__privateGet(this, _o)) && t === 9 && ((_c2 = __privateGet(this, _t)).search ?? (_c2.search = ""))), __privateMethod(this, _R, R_fn).call(this, t, r);
}, _R = new WeakSet(), R_fn = function(t, r) {
  __privateSet(this, _o, t), __privateSet(this, _l, __privateGet(this, _e) + r), __privateSet(this, _e, __privateGet(this, _e) + r), __privateSet(this, _s, 0);
}, _b = new WeakSet(), b_fn = function() {
  __privateSet(this, _e, __privateGet(this, _l)), __privateSet(this, _s, 0);
}, _u = new WeakSet(), u_fn = function(t) {
  __privateMethod(this, _b, b_fn).call(this), __privateSet(this, _o, t);
}, _m = new WeakSet(), m_fn = function(t) {
  return t < 0 && (t = __privateGet(this, _n).length - t), t < __privateGet(this, _n).length ? __privateGet(this, _n)[t] : __privateGet(this, _n)[__privateGet(this, _n).length - 1];
}, _a = new WeakSet(), a_fn = function(t, r) {
  let n = __privateMethod(this, _m, m_fn).call(this, t);
  return n.value === r && (n.type === "CHAR" || n.type === "ESCAPED_CHAR" || n.type === "INVALID_CHAR");
}, _P = new WeakSet(), P_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), ":");
}, _E = new WeakSet(), E_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e) + 1, "/") && __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e) + 2, "/");
}, _S = new WeakSet(), S_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), "@");
}, _O = new WeakSet(), O_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), ":");
}, _k = new WeakSet(), k_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), ":");
}, _x = new WeakSet(), x_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), "/");
}, _h = new WeakSet(), h_fn = function() {
  if (__privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), "?"))
    return true;
  if (__privateGet(this, _n)[__privateGet(this, _e)].value !== "?")
    return false;
  let t = __privateMethod(this, _m, m_fn).call(this, __privateGet(this, _e) - 1);
  return t.type !== "NAME" && t.type !== "REGEX" && t.type !== "CLOSE" && t.type !== "ASTERISK";
}, _f = new WeakSet(), f_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), "#");
}, _T = new WeakSet(), T_fn = function() {
  return __privateGet(this, _n)[__privateGet(this, _e)].type == "OPEN";
}, _A = new WeakSet(), A_fn = function() {
  return __privateGet(this, _n)[__privateGet(this, _e)].type == "CLOSE";
}, _y = new WeakSet(), y_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), "[");
}, _w = new WeakSet(), w_fn = function() {
  return __privateMethod(this, _a, a_fn).call(this, __privateGet(this, _e), "]");
}, _c = new WeakSet(), c_fn = function() {
  let t = __privateGet(this, _n)[__privateGet(this, _e)], r = __privateMethod(this, _m, m_fn).call(this, __privateGet(this, _l)).index;
  return __privateGet(this, _i).substring(r, t.index);
}, _C = new WeakSet(), C_fn = function() {
  let t = {};
  Object.assign(t, x), t.encodePart = y;
  let r = Z(__privateMethod(this, _c, c_fn).call(this), void 0, t);
  __privateSet(this, _g, N(r));
}, _a2);
var G = ["protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"], E = "*";
function ge(e, t) {
  if (typeof e != "string")
    throw new TypeError("parameter 1 is not of type 'string'.");
  let r = new URL(e, t);
  return { protocol: r.protocol.substring(0, r.protocol.length - 1), username: r.username, password: r.password, hostname: r.hostname, port: r.port, pathname: r.pathname, search: r.search !== "" ? r.search.substring(1, r.search.length) : void 0, hash: r.hash !== "" ? r.hash.substring(1, r.hash.length) : void 0 };
}
function b(e, t) {
  return t ? C(e) : e;
}
function w(e, t, r) {
  let n;
  if (typeof t.baseURL == "string")
    try {
      n = new URL(t.baseURL), t.protocol === void 0 && (e.protocol = b(n.protocol.substring(0, n.protocol.length - 1), r)), !r && t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.username === void 0 && (e.username = b(n.username, r)), !r && t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.username === void 0 && t.password === void 0 && (e.password = b(n.password, r)), t.protocol === void 0 && t.hostname === void 0 && (e.hostname = b(n.hostname, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && (e.port = b(n.port, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && (e.pathname = b(n.pathname, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && t.search === void 0 && (e.search = b(n.search.substring(1, n.search.length), r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && t.search === void 0 && t.hash === void 0 && (e.hash = b(n.hash.substring(1, n.hash.length), r));
    } catch {
      throw new TypeError(`invalid baseURL '${t.baseURL}'.`);
    }
  if (typeof t.protocol == "string" && (e.protocol = ce(t.protocol, r)), typeof t.username == "string" && (e.username = ie(t.username, r)), typeof t.password == "string" && (e.password = se(t.password, r)), typeof t.hostname == "string" && (e.hostname = ne(t.hostname, r)), typeof t.port == "string" && (e.port = oe(t.port, e.protocol, r)), typeof t.pathname == "string") {
    if (e.pathname = t.pathname, n && !J(e.pathname, r)) {
      let o = n.pathname.lastIndexOf("/");
      o >= 0 && (e.pathname = b(n.pathname.substring(0, o + 1), r) + e.pathname);
    }
    e.pathname = ae(e.pathname, e.protocol, r);
  }
  return typeof t.search == "string" && (e.search = re(t.search, r)), typeof t.hash == "string" && (e.hash = te(t.hash, r)), e;
}
function C(e) {
  return e.replace(/([+*?:{}()\\])/g, "\\$1");
}
function Oe(e) {
  return e.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
function ke(e, t) {
  t.delimiter ?? (t.delimiter = "/#?"), t.prefixes ?? (t.prefixes = "./"), t.sensitive ?? (t.sensitive = false), t.strict ?? (t.strict = false), t.end ?? (t.end = true), t.start ?? (t.start = true), t.endsWith = "";
  let r = ".*", n = `[^${Oe(t.delimiter)}]+?`, o = /[$_\u200C\u200D\p{ID_Continue}]/u, c = "";
  for (let l = 0; l < e.length; ++l) {
    let s = e[l];
    if (s.type === 3) {
      if (s.modifier === 3) {
        c += C(s.value);
        continue;
      }
      c += `{${C(s.value)}}${k(s.modifier)}`;
      continue;
    }
    let i = s.hasCustomName(), a = !!s.suffix.length || !!s.prefix.length && (s.prefix.length !== 1 || !t.prefixes.includes(s.prefix)), f = l > 0 ? e[l - 1] : null, d = l < e.length - 1 ? e[l + 1] : null;
    if (!a && i && s.type === 1 && s.modifier === 3 && d && !d.prefix.length && !d.suffix.length)
      if (d.type === 3) {
        let T = d.value.length > 0 ? d.value[0] : "";
        a = o.test(T);
      } else
        a = !d.hasCustomName();
    if (!a && !s.prefix.length && f && f.type === 3) {
      let T = f.value[f.value.length - 1];
      a = t.prefixes.includes(T);
    }
    a && (c += "{"), c += C(s.prefix), i && (c += `:${s.name}`), s.type === 2 ? c += `(${s.value})` : s.type === 1 ? i || (c += `(${n})`) : s.type === 0 && (!i && (!f || f.type === 3 || f.modifier !== 3 || a || s.prefix !== "") ? c += "*" : c += `(${r})`), s.type === 1 && i && s.suffix.length && o.test(s.suffix[0]) && (c += "\\"), c += C(s.suffix), a && (c += "}"), s.modifier !== 3 && (c += k(s.modifier));
  }
  return c;
}
var me = (_b2 = class {
  constructor(t = {}, r, n) {
    __privateAdd(this, _i2, void 0);
    __privateAdd(this, _n2, {});
    __privateAdd(this, _t2, {});
    __privateAdd(this, _e2, {});
    __privateAdd(this, _s2, {});
    __privateAdd(this, _l2, false);
    try {
      let o;
      if (typeof r == "string" ? o = r : n = r, typeof t == "string") {
        let i = new H(t);
        if (i.parse(), t = i.result, o === void 0 && typeof t.protocol != "string")
          throw new TypeError("A base URL must be provided for a relative constructor string.");
        t.baseURL = o;
      } else {
        if (!t || typeof t != "object")
          throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");
        if (o)
          throw new TypeError("parameter 1 is not of type 'string'.");
      }
      typeof n > "u" && (n = { ignoreCase: false });
      let c = { ignoreCase: n.ignoreCase === true }, l = { pathname: E, protocol: E, username: E, password: E, hostname: E, port: E, search: E, hash: E };
      __privateSet(this, _i2, w(l, t, true)), _(__privateGet(this, _i2).protocol) === __privateGet(this, _i2).port && (__privateGet(this, _i2).port = "");
      let s;
      for (s of G) {
        if (!(s in __privateGet(this, _i2)))
          continue;
        let i = {}, a = __privateGet(this, _i2)[s];
        switch (__privateGet(this, _t2)[s] = [], s) {
          case "protocol":
            Object.assign(i, x), i.encodePart = y;
            break;
          case "username":
            Object.assign(i, x), i.encodePart = le;
            break;
          case "password":
            Object.assign(i, x), i.encodePart = fe;
            break;
          case "hostname":
            Object.assign(i, B), W(a) ? i.encodePart = j : i.encodePart = z;
            break;
          case "port":
            Object.assign(i, x), i.encodePart = K;
            break;
          case "pathname":
            N(__privateGet(this, _n2).protocol) ? (Object.assign(i, q, c), i.encodePart = he) : (Object.assign(i, x, c), i.encodePart = ue);
            break;
          case "search":
            Object.assign(i, x, c), i.encodePart = de;
            break;
          case "hash":
            Object.assign(i, x, c), i.encodePart = pe;
            break;
        }
        try {
          __privateGet(this, _s2)[s] = D(a, i), __privateGet(this, _n2)[s] = F(__privateGet(this, _s2)[s], __privateGet(this, _t2)[s], i), __privateGet(this, _e2)[s] = ke(__privateGet(this, _s2)[s], i), __privateSet(this, _l2, __privateGet(this, _l2) || __privateGet(this, _s2)[s].some((f) => f.type === 2));
        } catch {
          throw new TypeError(`invalid ${s} pattern '${__privateGet(this, _i2)[s]}'.`);
        }
      }
    } catch (o) {
      throw new TypeError(`Failed to construct 'URLPattern': ${o.message}`);
    }
  }
  test(t = {}, r) {
    let n = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof t != "string" && r)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof t > "u")
      return false;
    try {
      typeof t == "object" ? n = w(n, t, false) : n = w(n, ge(t, r), false);
    } catch {
      return false;
    }
    let o;
    for (o of G)
      if (!__privateGet(this, _n2)[o].exec(n[o]))
        return false;
    return true;
  }
  exec(t = {}, r) {
    let n = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof t != "string" && r)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof t > "u")
      return;
    try {
      typeof t == "object" ? n = w(n, t, false) : n = w(n, ge(t, r), false);
    } catch {
      return null;
    }
    let o = {};
    r ? o.inputs = [t, r] : o.inputs = [t];
    let c;
    for (c of G) {
      let l = __privateGet(this, _n2)[c].exec(n[c]);
      if (!l)
        return null;
      let s = {};
      for (let [i, a] of __privateGet(this, _t2)[c].entries())
        if (typeof a == "string" || typeof a == "number") {
          let f = l[i + 1];
          s[a] = f;
        }
      o[c] = { input: n[c] ?? "", groups: s };
    }
    return o;
  }
  static compareComponent(t, r, n) {
    let o = (i, a) => {
      for (let f of ["type", "modifier", "prefix", "value", "suffix"]) {
        if (i[f] < a[f])
          return -1;
        if (i[f] === a[f])
          continue;
        return 1;
      }
      return 0;
    }, c = new R(3, "", "", "", "", 3), l = new R(0, "", "", "", "", 3), s = (i, a) => {
      let f = 0;
      for (; f < Math.min(i.length, a.length); ++f) {
        let d = o(i[f], a[f]);
        if (d)
          return d;
      }
      return i.length === a.length ? 0 : o(i[f] ?? c, a[f] ?? c);
    };
    return !__privateGet(r, _e2)[t] && !__privateGet(n, _e2)[t] ? 0 : __privateGet(r, _e2)[t] && !__privateGet(n, _e2)[t] ? s(__privateGet(r, _s2)[t], [l]) : !__privateGet(r, _e2)[t] && __privateGet(n, _e2)[t] ? s([l], __privateGet(n, _s2)[t]) : s(__privateGet(r, _s2)[t], __privateGet(n, _s2)[t]);
  }
  get protocol() {
    return __privateGet(this, _e2).protocol;
  }
  get username() {
    return __privateGet(this, _e2).username;
  }
  get password() {
    return __privateGet(this, _e2).password;
  }
  get hostname() {
    return __privateGet(this, _e2).hostname;
  }
  get port() {
    return __privateGet(this, _e2).port;
  }
  get pathname() {
    return __privateGet(this, _e2).pathname;
  }
  get search() {
    return __privateGet(this, _e2).search;
  }
  get hash() {
    return __privateGet(this, _e2).hash;
  }
  get hasRegExpGroups() {
    return __privateGet(this, _l2);
  }
}, _i2 = new WeakMap(), _n2 = new WeakMap(), _t2 = new WeakMap(), _e2 = new WeakMap(), _s2 = new WeakMap(), _l2 = new WeakMap(), _b2);
if (!globalThis.URLPattern) {
  globalThis.URLPattern = me;
}
if (self == null ? void 0 : self.URLPattern)
  self.URLPattern = me;
const getURLPatern = ({ pathname }) => new self.URLPattern({ pathname });
const findPatternFromUrl = ({ router, url }) => {
  const patternPathname = [...new Set(router == null ? void 0 : router.keys())].find((patternPathname2) => {
    const pattern = getURLPatern({ pathname: patternPathname2 });
    return pattern.test(url.href);
  });
  return patternPathname ? getURLPatern({ pathname: patternPathname }) : null;
};
const getRedirectResponse = ({ origin, pathname }) => {
  if (origin !== (self == null ? void 0 : self.origin))
    return;
  const isRedirectable = pathname !== "/" && pathname.endsWith("/");
  const response = isRedirectable ? Response.redirect(pathname.slice(0, -1), 301) : null;
  return { response };
};
const getNotFoundResponse = async ({ router, request }) => {
  var _a4, _b3;
  const pageCallback = (_a4 = router == null ? void 0 : router.get("/404")) == null ? void 0 : _a4.getRoute;
  const response = pageCallback ? (_b3 = await pageCallback({ request })) == null ? void 0 : _b3.response : new Response("404", { status: 404 });
  return { response };
};
const getStaticResponse = async ({ request, waitUntil, env }) => {
};
const getForbiddenResponse = ({ origin, request, forbiddenURLs }) => {
  if (origin !== (self == null ? void 0 : self.origin))
    return;
  const isForbidden = forbiddenURLs == null ? void 0 : forbiddenURLs.find((filename) => {
    var _a4;
    return (_a4 = request == null ? void 0 : request.url) == null ? void 0 : _a4.endsWith(filename);
  });
  if (!isForbidden)
    return;
  return { response: new Response(`${request == null ? void 0 : request.url} is forbidden`, { status: 503 }) };
};
const getServerOnlyResponse = ({ origin, request, serverOnlyURLs }) => {
  if (origin !== (self == null ? void 0 : self.origin))
    return;
  const isServerOnly = serverOnlyURLs == null ? void 0 : serverOnlyURLs.find((filename) => {
    var _a4;
    return (_a4 = request == null ? void 0 : request.url) == null ? void 0 : _a4.endsWith(filename);
  });
  if (!isServerOnly)
    return;
  return fetch({ request });
};
const X4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  findPatternFromUrl,
  getForbiddenResponse,
  getNotFoundResponse,
  getRedirectResponse,
  getServerOnlyResponse,
  getStaticResponse
}, Symbol.toStringTag, { value: "Module" }));
console.log(X1);
console.log(X2);
console.log(X3);
console.log(X4);
console.log(X5);
console.log(X6);

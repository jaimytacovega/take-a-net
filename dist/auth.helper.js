import { f as fetch$1 } from "./worker.lib.js";
const fetch = async ({ url, ...options }) => {
  try {
    const fetchResult = await fetch$1({ url, ...options });
    if (fetchResult == null ? void 0 : fetchResult.err)
      return fetchResult;
    const response = fetchResult == null ? void 0 : fetchResult.response;
    const responseStatus = response.ok ? [] : [(response == null ? void 0 : response.statusText) || (response == null ? void 0 : response.status)];
    if (!response.ok)
      throw responseStatus;
    const json = await response.json();
    const messages = json == null ? void 0 : json.messages;
    if ((json == null ? void 0 : json.status) !== "success")
      throw [...responseStatus, ...messages];
    const data = json == null ? void 0 : json.data;
    if (!data && (messages == null ? void 0 : messages.length))
      throw [...responseStatus, ...messages];
    return { data, messages };
  } catch (err) {
    return { err };
  }
};
const BASE_API = "https://apptan.sierpes48.es";
const isCookieStoreAvailable = () => typeof cookieStore !== "undefined";
const addCookie = ({ key, value, config }) => isCookieStoreAvailable() ? cookieStore == null ? void 0 : cookieStore.set(key, value, config) : null;
const getCookie = async ({ key }) => {
  var _a;
  return isCookieStoreAvailable() ? (_a = await (cookieStore == null ? void 0 : cookieStore.get(key))) == null ? void 0 : _a.value : null;
};
const getAutorizationCookie = ({ request } = {}) => {
  var _a, _b;
  if (isCookieStoreAvailable())
    return getCookie({ key: "Authorization" });
  const cookies = (_b = (_a = request == null ? void 0 : request.headers) == null ? void 0 : _a.get("Cookie")) == null ? void 0 : _b.match(/Authorization=([^;]+)/);
  return cookies == null ? void 0 : cookies.at(1);
};
const addAuthorizationCookie = ({ credential }) => {
  const userId = JSON.stringify(credential);
  if (isCookieStoreAvailable())
    return addCookie({ key: "Authorization", value: userId, config: { sameSite: "strict", secure: true } });
  document.cookie = `Authorization=${userId}; SameSite=Strict; Secure`;
};
const handleFreeze = ({ form, mode = "unfreeze" }) => {
  const btnSubmit = form == null ? void 0 : form.querySelector('[type="submit"]');
  const inputs = form == null ? void 0 : form.querySelectorAll("input, textarea");
  for (const input of inputs)
    input.disabled = mode === "freeze";
  btnSubmit.classList[mode === "freeze" ? "add" : "remove"]("form-loading");
};
const freeze = ({ form }) => handleFreeze({ form, mode: "freeze" });
const unfreeze = ({ form }) => handleFreeze({ form });
const addInvalid = ({ invalid, msg }) => {
  var _a;
  (_a = invalid == null ? void 0 : invalid.classList) == null ? void 0 : _a.add("is-invalid");
  invalid == null ? void 0 : invalid.setAttribute("data-invalid", msg);
};
const removeInvalid = ({ invalid }) => {
  var _a;
  (_a = invalid == null ? void 0 : invalid.classList) == null ? void 0 : _a.remove("is-invalid");
  invalid == null ? void 0 : invalid.removeAttribute("data-invalid");
};
const resetInvalid = ({ form }) => {
  const invalids = form == null ? void 0 : form.querySelectorAll(".is-invalid");
  invalids == null ? void 0 : invalids.forEach((invalid) => removeInvalid({ invalid }));
  removeInvalid({ invalid: form });
};
const showInvalid = ({ form, data }) => {
  var _a;
  if (!(data == null ? void 0 : data.field) && !(data == null ? void 0 : data.inForm))
    return;
  const invalid = (data == null ? void 0 : data.inForm) ? form : (_a = form.querySelector(`#${data == null ? void 0 : data.field}, [name="${data == null ? void 0 : data.field}"]`)) == null ? void 0 : _a.parentNode;
  addInvalid({ invalid, msg: data == null ? void 0 : data.desc });
  invalid == null ? void 0 : invalid.scrollIntoView({ behavior: "smooth", block: "end" });
  const msg = `Sanitize error: ${data == null ? void 0 : data.desc}${(data == null ? void 0 : data.field) ? ` in field ${data == null ? void 0 : data.field} ` : " "}for `;
  console.info(msg, data == null ? void 0 : data.doc);
};
const LOGIN_API = `${BASE_API}/login`;
const VERIFY_API = `${BASE_API}/usuarios/verify_token`;
const login = async ({ username, password }) => {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  const body = JSON.stringify({
    username,
    password
  });
  const options = {
    method: "POST",
    headers,
    body
  };
  const result = await fetch({ url: LOGIN_API, ...options });
  if (result == null ? void 0 : result.err)
    return result;
  const token = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.token;
  if (!token)
    return { err: ["INVALID USER"] };
  return { data: { token } };
};
const verify = async ({ token }) => {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Cache-Control", "no-cache");
  const body = JSON.stringify({
    token
  });
  const options = {
    method: "POST",
    headers,
    body
  };
  const result = await fetch({ url: VERIFY_API, ...options });
  if (result == null ? void 0 : result.err)
    return result;
  return {
    data: {
      token: (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.token
    }
  };
};
export {
  BASE_API as B,
  addAuthorizationCookie as a,
  fetch as b,
  freeze as f,
  getAutorizationCookie as g,
  login as l,
  resetInvalid as r,
  showInvalid as s,
  unfreeze as u,
  verify as v
};

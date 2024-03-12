import { b as fetch, B as BASE_API } from "./auth.helper.js";
const CREATE_API = `${BASE_API}/usuarios/crear`;
const UPDATE_API = `${BASE_API}/usuarios/editar`;
const DELETE_API = `${BASE_API}/usuarios/eliminar`;
const add = async ({ token, user }) => {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(user);
  const options = {
    method: "POST",
    headers,
    body
  };
  const result = await fetch({ url: CREATE_API, ...options });
  if (result == null ? void 0 : result.err)
    return result;
  const data = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.usuario;
  const messages = result == null ? void 0 : result.messages;
  return { data, messages };
};
const update = async ({ token, user }) => {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  const body = JSON.stringify(user);
  const options = {
    method: "PATCH",
    headers,
    body
  };
  const result = await fetch({ url: `${UPDATE_API}/${user == null ? void 0 : user.username}`, ...options });
  if (result == null ? void 0 : result.err)
    return result;
  const data = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.usuario;
  const messages = result == null ? void 0 : result.messages;
  return { data, messages };
};
const remove = async ({ token, id }) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  const options = {
    method: "DELETE",
    headers
  };
  const result = await fetch({ url: `${DELETE_API}/${id}`, ...options });
  if (result == null ? void 0 : result.err)
    return result;
  const data = result == null ? void 0 : result.data;
  const messages = result == null ? void 0 : result.messages;
  return { data, messages };
};
export {
  add as a,
  remove as r,
  update as u
};

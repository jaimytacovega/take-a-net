import { f as freeze, r as resetInvalid, l as login, s as showInvalid, u as unfreeze, a as addAuthorizationCookie } from "./auth.helper.js";
import "./worker.lib.js";
const submit = async ({ e, srcElement }) => {
  var _a, _b;
  e.preventDefault();
  const usernameInput = srcElement == null ? void 0 : srcElement.querySelector("#username");
  const passwordInput = srcElement == null ? void 0 : srcElement.querySelector("#password");
  const username = usernameInput == null ? void 0 : usernameInput.value;
  const password = passwordInput == null ? void 0 : passwordInput.value;
  freeze({ form: srcElement });
  resetInvalid({ form: srcElement });
  const loginResult = await login({ username, password });
  console.log("--- loginResult =", loginResult);
  if (loginResult == null ? void 0 : loginResult.err) {
    showInvalid({
      form: srcElement,
      data: {
        inForm: true,
        desc: (_a = loginResult == null ? void 0 : loginResult.err) == null ? void 0 : _a.join("-")
      }
    });
    unfreeze({ form: srcElement });
    return;
  }
  const token = (_b = loginResult == null ? void 0 : loginResult.data) == null ? void 0 : _b.token;
  addAuthorizationCookie({ credential: { token } });
  resetInvalid({ form: srcElement });
  unfreeze({ form: srcElement });
  srcElement == null ? void 0 : srcElement.reset();
  location.href = "/admin/usuarios";
};
const A15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  submit
}, Symbol.toStringTag, { value: "Module" }));
export {
  A15 as A
};

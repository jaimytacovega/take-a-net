import { u as update } from "./user.model.js";
import { f as freeze, r as resetInvalid, s as showInvalid, u as unfreeze, g as getAutorizationCookie, v as verify } from "./auth.helper.js";
import "./worker.lib.js";
const submit = async ({ e, srcElement }) => {
  var _a, _b;
  e.preventDefault();
  const usernameInput = srcElement == null ? void 0 : srcElement.querySelector("#username");
  const lastnameInput = srcElement == null ? void 0 : srcElement.querySelector("#last_name");
  const emailInput = srcElement == null ? void 0 : srcElement.querySelector("#email");
  const passwordInput = srcElement == null ? void 0 : srcElement.querySelector("#password");
  const confirmPasswordInput = srcElement == null ? void 0 : srcElement.querySelector("#confirm-password");
  const phoneInput = srcElement == null ? void 0 : srcElement.querySelector("#phone");
  const id = srcElement == null ? void 0 : srcElement.getAttribute("data-user-id");
  const username = usernameInput == null ? void 0 : usernameInput.value;
  const last_name = lastnameInput == null ? void 0 : lastnameInput.value;
  emailInput == null ? void 0 : emailInput.value;
  const password = passwordInput == null ? void 0 : passwordInput.value;
  const confirmPassword = confirmPasswordInput == null ? void 0 : confirmPasswordInput.value;
  const phone = phoneInput == null ? void 0 : phoneInput.value;
  freeze({ form: srcElement });
  resetInvalid({ form: srcElement });
  if (password !== confirmPassword) {
    showInvalid({
      form: srcElement,
      data: {
        inForm: true,
        desc: "DIFFERENT PASSWORD"
      }
    });
    unfreeze({ form: srcElement });
    return;
  }
  const credential = await getAutorizationCookie();
  const token = (_a = JSON.parse(credential || "{}")) == null ? void 0 : _a.token;
  console.log("--- token =", token);
  const verifyTokenResult = await verify({ token });
  console.log("--- verifyTokenResult =", verifyTokenResult);
  if (verifyTokenResult == null ? void 0 : verifyTokenResult.err) {
    location.href = "/login";
    return;
  }
  const user = {
    id,
    username,
    first_name: username,
    last_name,
    phone
  };
  console.log("--- user to edit =", user);
  const editUserResult = await update({ token, user });
  console.log("--- editUserResult =", editUserResult);
  if (editUserResult == null ? void 0 : editUserResult.err) {
    showInvalid({
      form: srcElement,
      data: {
        inForm: true,
        desc: (_b = editUserResult.err) == null ? void 0 : _b.join("-")
      }
    });
    unfreeze({ form: srcElement });
    return;
  }
  location == null ? void 0 : location.reload();
};
const A13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  submit
}, Symbol.toStringTag, { value: "Module" }));
export {
  A13 as A
};

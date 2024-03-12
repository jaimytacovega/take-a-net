import { a as add } from "./user.model.js";
import { f as freeze, r as resetInvalid, g as getAutorizationCookie, v as verify, s as showInvalid, u as unfreeze } from "./auth.helper.js";
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
  const activeInput = srcElement == null ? void 0 : srcElement.querySelector('[name="active"]:checked');
  const username = usernameInput == null ? void 0 : usernameInput.value;
  const last_name = lastnameInput == null ? void 0 : lastnameInput.value;
  const email = emailInput == null ? void 0 : emailInput.value;
  const password = passwordInput == null ? void 0 : passwordInput.value;
  const confirmPassword = confirmPasswordInput == null ? void 0 : confirmPasswordInput.value;
  const phone = phoneInput == null ? void 0 : phoneInput.value;
  const active = (activeInput == null ? void 0 : activeInput.value) === "yes";
  freeze({ form: srcElement });
  resetInvalid({ form: srcElement });
  const credential = await getAutorizationCookie();
  const token = (_a = JSON.parse(credential || "{}")) == null ? void 0 : _a.token;
  const verifyTokenResult = await verify({ token });
  console.log("--- verifyTokenResult =", verifyTokenResult);
  if (verifyTokenResult == null ? void 0 : verifyTokenResult.err) {
    location.href = "/login";
    return;
  }
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
  const user = {
    username,
    password,
    email,
    first_name: `${username} nombre`,
    last_name,
    phone,
    active
  };
  console.log("--- user to add =", user);
  const addUserResult = await add({ token, user });
  if (addUserResult == null ? void 0 : addUserResult.err) {
    showInvalid({
      form: srcElement,
      data: {
        inForm: true,
        desc: (_b = addUserResult.err) == null ? void 0 : _b.join("-")
      }
    });
    unfreeze({ form: srcElement });
    return;
  }
  console.log("--- addUserResult =", addUserResult);
  location == null ? void 0 : location.reload();
};
const A12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  submit
}, Symbol.toStringTag, { value: "Module" }));
export {
  A12 as A
};

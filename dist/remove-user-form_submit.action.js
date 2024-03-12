import { r as remove } from "./user.model.js";
import { g as getAutorizationCookie, f as freeze, r as resetInvalid, v as verify, s as showInvalid, u as unfreeze } from "./auth.helper.js";
import "./worker.lib.js";
const submit = async ({ e, srcElement }) => {
  var _a, _b;
  e.preventDefault();
  const id = srcElement == null ? void 0 : srcElement.getAttribute("data-user-id");
  const credential = await getAutorizationCookie();
  const token = (_a = JSON.parse(credential || "{}")) == null ? void 0 : _a.token;
  freeze({ form: srcElement });
  resetInvalid({ form: srcElement });
  const verifyTokenResult = await verify({ token });
  console.log("--- verifyTokenResult =", verifyTokenResult);
  if (verifyTokenResult == null ? void 0 : verifyTokenResult.err) {
    location.href = "/login";
    return;
  }
  const removeUserResult = await remove({ token, id });
  console.log("--- removeUserResult =", removeUserResult);
  if (removeUserResult == null ? void 0 : removeUserResult.err) {
    showInvalid({
      form: srcElement,
      data: {
        inForm: true,
        desc: (_b = removeUserResult == null ? void 0 : removeUserResult.err) == null ? void 0 : _b.join("-")
      }
    });
    unfreeze({ form: srcElement });
    return;
  }
  location == null ? void 0 : location.reload();
};
const A17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  submit
}, Symbol.toStringTag, { value: "Module" }));
export {
  A17 as A
};

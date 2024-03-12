import { g as getHTML } from "./crud-user-dialog.component.js";
import "./worker.lib.js";
const click = ({ e, srcElement }) => {
  var _a, _b, _c;
  const script = (_a = srcElement == null ? void 0 : srcElement.parentNode) == null ? void 0 : _a.querySelector("script[data-user]");
  const user = JSON.parse((script == null ? void 0 : script.textContent) || "{}");
  const dialogId = (_b = `edit-user-${user == null ? void 0 : user.username}`) == null ? void 0 : _b.replaceAll(" ", "-");
  const oldDialog = document == null ? void 0 : document.querySelector(`#${dialogId}`);
  if (oldDialog)
    oldDialog == null ? void 0 : oldDialog.remove();
  const dialogHTML = getHTML({
    dialogId,
    title: "Editar usuario",
    description: "Edita los siguientes datos del usuario",
    mode: "edit",
    user
  });
  (_c = document == null ? void 0 : document.body) == null ? void 0 : _c.insertAdjacentHTML("beforeend", dialogHTML);
  const dialog = document == null ? void 0 : document.querySelector(`#${dialogId}`);
  console.log("--- dialog =", dialog);
  dialog == null ? void 0 : dialog.showModal();
};
const A10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  click
}, Symbol.toStringTag, { value: "Module" }));
export {
  A10 as A
};

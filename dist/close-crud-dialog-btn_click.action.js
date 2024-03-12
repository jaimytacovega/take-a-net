const dialogModesToRemove = ["edit", "remove"];
const click = ({ e, srcElement }) => {
  const dialog = srcElement == null ? void 0 : srcElement.closest("dialog");
  const form = dialog == null ? void 0 : dialog.querySelector("form");
  dialog == null ? void 0 : dialog.close();
  form == null ? void 0 : form.reset();
  const mode = dialog == null ? void 0 : dialog.getAttribute("data-mode");
  if (!(dialogModesToRemove == null ? void 0 : dialogModesToRemove.includes(mode)))
    return;
  dialog == null ? void 0 : dialog.remove();
};
const A6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  click
}, Symbol.toStringTag, { value: "Module" }));
export {
  A6 as A
};

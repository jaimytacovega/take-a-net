const click = ({ e, srcElement }) => {
  e.preventDefault();
  const id = srcElement == null ? void 0 : srcElement.getAttribute("data-dialog-id");
  const dialog = document == null ? void 0 : document.querySelector(`#${id}`);
  dialog == null ? void 0 : dialog.showModal();
};
const A9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  click
}, Symbol.toStringTag, { value: "Module" }));
export {
  A9 as A
};

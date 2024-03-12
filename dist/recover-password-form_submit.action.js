const submit = ({ e, srcElement }) => {
  e.preventDefault();
  const emailInput = srcElement == null ? void 0 : srcElement.querySelector("#email");
  const email = emailInput == null ? void 0 : emailInput.value;
  if (email) {
    location.href = `/recuperar-contrasena-enviado?email=${email}`;
  }
};
const A16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  submit
}, Symbol.toStringTag, { value: "Module" }));
export {
  A16 as A
};

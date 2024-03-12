const click = ({ e, srcElement }) => {
  var _a;
  const passwordInput = (_a = srcElement == null ? void 0 : srcElement.parentNode) == null ? void 0 : _a.querySelector("[data-input-password]");
  const type = passwordInput == null ? void 0 : passwordInput.type;
  if (passwordInput)
    passwordInput.type = type === "password" ? "text" : "password";
  const img = srcElement == null ? void 0 : srcElement.querySelector("img");
  const imgSrc = img == null ? void 0 : img.src;
  const isOff = imgSrc == null ? void 0 : imgSrc.includes("eye-off");
  img.src = imgSrc == null ? void 0 : imgSrc.replace(`eye${isOff ? "-off" : ""}`, `eye${isOff ? "" : "-off"}`);
};
const A18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  click
}, Symbol.toStringTag, { value: "Module" }));
export {
  A18 as A
};

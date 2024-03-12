const executeOnScheduler = async ({ callback, signal, priority }) => {
  var _a;
  try {
    if (!((_a = self == null ? void 0 : self.scheduler) == null ? void 0 : _a.postTask))
      return { data: await callback() };
    const data = await scheduler.postTask(callback, { priority, signal });
    return { data };
  } catch (err) {
    return { err };
  }
};
const stream = ({ callbacks, headers }) => {
  const { readable, writable } = new TransformStream();
  const done = (async () => {
    var _a;
    for (const callback of callbacks) {
      const abortController = new AbortController();
      const executeOnSchedulerResult = await executeOnScheduler({ callback, signal: abortController.signal, priority: "background" });
      const html = (executeOnSchedulerResult == null ? void 0 : executeOnSchedulerResult.err) ?? (executeOnSchedulerResult == null ? void 0 : executeOnSchedulerResult.data);
      const response = new Response(html, { headers, status: 200 });
      await ((_a = response.body) == null ? void 0 : _a.pipeTo(writable, { preventClose: true }));
      abortController.abort();
    }
    writable.getWriter().close();
  })();
  return {
    done,
    response: new Response(readable, { headers })
  };
};
const fetch = async ({ url, request, ...config }) => {
  var _a;
  try {
    const response = await ((_a = self == null ? void 0 : self.fetch(url || request, config)) == null ? void 0 : _a.catch((err) => ({ err })));
    if (response == null ? void 0 : response.err)
      return response;
    return { response };
  } catch (err) {
    return { err };
  }
};
const X6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetch,
  stream
}, Symbol.toStringTag, { value: "Module" }));
export {
  X6 as X,
  fetch as f,
  stream as s
};

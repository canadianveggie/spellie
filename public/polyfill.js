(function f() {
  const h = window.location.hostname;
  const s = "spellie";
  const g = "game";
  if (![`${s}${g}.com`, "localhost"].includes(h)) {
    window.location.replace(`https://${s}${g}.com`);
  }
})();

if (typeof window.queueMicrotask !== "function") {
  window.queueMicrotask = function queueMicrotask(callback) {
    Promise.resolve()
      .then(callback)
      .catch((e) =>
        setTimeout(() => {
          throw e;
        })
      );
  };
}

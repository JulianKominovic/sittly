export default (debounceMs = 1000, callback) => {
  const controller = new AbortController();
  new Promise((resolve, reject) => {
    controller.signal.addEventListener("abort", () => {
      reject("ABORTED");
    });
    const id = setTimeout(() => {
      resolve(callback);
      clearTimeout(id);
    }, debounceMs);
  });
  return controller;
};

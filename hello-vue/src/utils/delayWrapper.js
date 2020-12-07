const delayWrapper = (fun, delay = 1000) => (...args) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(fun(...args));
    }, delay);
  });

export default delayWrapper;

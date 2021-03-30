const promise = new Promise((resolve, reject) => {
  resolve({
    a: 1, b: 2,
  });
})
  .then(res => res.a)

promise.then(console.log)

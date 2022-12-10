const os = require("os");

console.log(os.homedir());

const fakePromise = (timeout) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello World");
    }, 100 * timeout);
  });

const list = [];

for (let i = 0; i < 100; i++) {
  list.push(fakePromise(i));
}

console.log(list);

// cancelamos todo
const instantPromise = new Promise((resolve) => {
  resolve(0);
});
Promise.race([...list, instantPromise]).then((result) => {
  console.log(result);
  console.log(list);
});

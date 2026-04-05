
// Option 1: Function that returns a Promise
const createPromise = (value) => {
  return new Promise(function (resolve, reject) {
    if (value == 1) {
      resolve("success");
    } else {
      reject("failure");
    }
  });
}

// Now you can pass different values:
createPromise(1)
  .then(result => console.log(`With value 1: ${result}`))
  .catch(err => console.log(`Error: ${err}`));

createPromise(2)
  .then(result => console.log(`With value 2: ${result}`))
  .catch(err => console.log(`With value 2: ${err}`));

// Option 2: Direct Promise creation with parameter (more concise)
const aPromise = (value) => {
  return value == 1 ? Promise.resolve("success") : Promise.reject("failure");
};

aPromise(1)
  .then(result => console.log(`Direct approach with 1: ${result}`))
  .catch(err => console.log(err));

// Call stack needs to clear first before async function triggers
console.log("here first");

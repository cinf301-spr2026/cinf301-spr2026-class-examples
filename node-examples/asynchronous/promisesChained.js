// See: https://javascript.info/promise-chaining
new Promise((resolve, reject) => {

  /* 
   * First run with next line commented out to see 
   * the catch() in action, then uncomment it to see 
   * the chaining in action.
   */
  //  reject('bad');
  setTimeout(() => resolve(1), 1000); // (*)

}).then((result) => { // (**)

  console.log(result); // 1
  return result * 2;

}).then((result) => { // (***)

  console.log(result); // 2
  return result * 2;

}).then((result) => {

  console.log(result); // 4
  return result * 2;

}).catch(bad => console.log(bad));

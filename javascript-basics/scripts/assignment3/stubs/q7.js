// Test data for higher-order functions
const testData = [1, 2, 3];
const people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

// Your implementations here:
// const createValidator = ...
// const createMapper = ...
// const createComparator = ...

const isPositive = createValidator(x => x > 0);
const doubler = createMapper(x => x * 2);
const sortByAge = createComparator('age');

console.log("Is 5 positive?", isPositive(5)); // true
console.log("Is -3 positive?", isPositive(-3)); // false
console.log("Doubled array:", doubler(testData)); // [2, 4, 6]
console.log("People sorted by age:", people.sort(sortByAge));

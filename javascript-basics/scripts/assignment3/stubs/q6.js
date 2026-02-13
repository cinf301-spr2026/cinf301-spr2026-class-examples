function isEven(n) {
    return n % 2 === 0;
}

function getFullName(person) {
    return person.firstName + " " + person.lastName;
}

function calculateArea(length, width) {
    if (length <= 0 || width <= 0) {
        return 0;
    }
    return length * width;
}

function processNumbers(numbers) {
    return numbers
        .filter(function(n) { return n > 0; })
        .map(function(n) { return n * n; })
        .reduce(function(sum, n) { return sum + n; }, 0);
}

// Test data
const testPerson = { firstName: "John", lastName: "Smith" };
const testNumbers = [-2, 3, -1, 4, 5];

// Test all functions
console.log("Is 4 even?", isEven(4));
console.log("Is 7 even?", isEven(7));
console.log("Full name:", getFullName(testPerson));
console.log("Area of 5x3:", calculateArea(5, 3));
console.log("Area of -2x4:", calculateArea(-2, 4));
console.log("Process numbers result:", processNumbers(testNumbers));
console.log("Expected positive squares sum:", 9 + 16 + 25); // 50

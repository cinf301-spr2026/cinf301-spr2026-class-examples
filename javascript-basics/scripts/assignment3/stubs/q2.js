const createPipeline = // your solution

const testValues = [-2, 3, -1, 4, 5, -3, 6, 0, 7, -1];

const pipeline = createPipeline(
    arr => arr.filter(n => n > 0),
    arr => arr.map(n => n * n),
    arr => arr.reduce((sum, n) => sum + n, 0) / arr.length
);

console.log("Pipeline result:", pipeline(testValues)); 
// Should output average of squares of positive numbers
console.log("Expected squares:", [9, 16, 25, 36, 49]);

const sampleObject = {
    name: "Alice",
    age: 25,
    city: "Boston",
    score: 95,
    email: "alice@example.com",
    grade: 3.8,
    active: true,
    count: 42
};

const analyzeObject = // your solution here

const objectAnalysis = analyzeObject(sampleObject);
console.log("Object analysis:", objectAnalysis);
console.log("String properties:", objectAnalysis.stringProps);
console.log("Number properties:", objectAnalysis.numberProps);
console.log("Total string length:", objectAnalysis.totalStringLength);
console.log("Number sum:", objectAnalysis.numberSum);

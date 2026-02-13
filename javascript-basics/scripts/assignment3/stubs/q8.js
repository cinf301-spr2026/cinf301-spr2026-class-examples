const calculator = {
    value: 0,
    add: function(n) {
        this.value += n;
        return this;
    },
    multiply: function(n) {
        this.value *= n;
        return this;
    },
    getResult: function() {
        return this.value;
    }
};

const counter = { value: 10 };
const tracker = { value: 5 };

console.log("Initial counter value:", counter.value);
console.log("Initial tracker value:", tracker.value);

// Your call/apply/bind implementations here

// Test the bound function
console.log("Final counter value:", counter.value);
console.log("Final tracker value:", tracker.value);
console.log("Bound getTrackerValue result:", getTrackerValue());

const orders = [
    { id: 1, customer: "John", items: ["laptop", "mouse"], total: 1200, date: "2026-01-15" },
    { id: 2, customer: "Jane", items: ["phone", "case"], total: 800, date: "2026-01-16" },
    { id: 3, customer: "John", items: ["keyboard"], total: 150, date: "2026-01-17" },
    { id: 4, customer: "Bob", items: ["laptop", "monitor"], total: 1500, date: "2026-01-18" }
];

const customers = {
    John: { email: "john@email.com", tier: "premium" },
    Jane: { email: "jane@email.com", tier: "standard" },
    Bob: { email: "bob@email.com", tier: "premium" }
};

// Your analytics object implementation here
const analytics = {
    // getTotalRevenue: ...
    // getCustomerStats: ...
    // getPremiumCustomers: ...
    // getMostPopularItems: ...
    // bindCustomerLookup: ...
// };

// Test all methods
console.log("Total revenue:", analytics.getTotalRevenue());
console.log("Customer stats:", analytics.getCustomerStats());
console.log("Premium customer orders:", analytics.getPremiumCustomers());
console.log("Most popular items:", analytics.getMostPopularItems());

const customerLookup = analytics.bindCustomerLookup();
console.log("John's info:", customerLookup("John"));
console.log("Jane's info:", customerLookup("Jane"));

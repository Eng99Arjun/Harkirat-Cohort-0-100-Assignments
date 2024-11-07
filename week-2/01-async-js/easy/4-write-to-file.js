// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

fs.writeFile("file.txt", "Hello, World!", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File written successfully.");
});

let counter = 0;
function incrementCounter() {
    counter++;
    console.log(counter);
    setTimeout(incrementCounter, 1000);
}

incrementCounter();

let expensiveOperation = 0;
function incrementExpensiveOperation() {
    expensiveOperation++;
    console.log(expensiveOperation);
    setTimeout(incrementExpensiveOperation, 1000);
}

incrementExpensiveOperation();


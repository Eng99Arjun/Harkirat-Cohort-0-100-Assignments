// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 


const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
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

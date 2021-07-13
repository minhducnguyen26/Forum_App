//! Entry point of the app
const server   = require("./server");
const database = require("./database");

// Define a port
const port = process.argv[2] || process.env.PORT || 8080;

database( function() {
    // start listen to the server
    server.listen(port, function() {
        console.log("Running server on port " + port);
        console.log("");
    })
})
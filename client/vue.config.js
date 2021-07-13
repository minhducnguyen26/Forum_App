const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../public"),

    devServer: {
        proxy: {
            "/thread": {
                target: "http://localhost:8080"
            },
            "/post": {
                target: "http://localhost:8080"
            }
        }
    }
}
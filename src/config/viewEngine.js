import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // phía client có thể truy cập vào file nào 
    app.set("view engine", "ejs");
    app.set("views", "./src/views"); 
}

module.exports = configViewEngine; 
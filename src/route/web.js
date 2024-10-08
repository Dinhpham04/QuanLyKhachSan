import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutMe);

    router.get("/dinhpham", (req, res) => {
        return res.send('hello word cac ban');
    });
    // rest api 
    return app.use("/", router);
}

module.exports = initWebRoutes; 
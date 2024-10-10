import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {  // khởi tạo các router 
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutMe);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
  
    // rest api 
    return app.use("/", router);
}

module.exports = initWebRoutes; 
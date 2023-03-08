import { Router } from "express";

const homeWebRouter = new Router();

homeWebRouter.get("/home", async (req, res) => {
  if (!req.session.passport?.user) {
    res.render("login.ejs");
  } else {
    res.render("home.ejs", { nombre: req.session.passport?.user.nombre });
  }
});

export default homeWebRouter;
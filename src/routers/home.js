import { Router } from "express";

const homeWebRouter = new Router();

homeWebRouter.get("/home", async (req, res) => {
  if (!req.session.passport?.user) {
    res.render("auth/login.ejs");
  } else {
    res.render("home.ejs", { user: req.session.passport?.user });
  }
});

homeWebRouter.get("/carrito", async (req, res) => {
  if (!req.session.passport?.user) {
    res.render("auth/login.ejs");
  } else {
    res.render("carrito.ejs", { user: req.session.passport?.user});
  }
});

homeWebRouter.get("/mi-perfil", async (req, res) => {
  if (!req.session.passport?.user) {
    res.render("auth/login.ejs");
  } else {
    res.render("mi-perfil.ejs", { user: req.session.passport?.user });
  }
});

export default homeWebRouter;
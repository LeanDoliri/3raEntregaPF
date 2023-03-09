import { Router } from "express";

const homeWebRouter = new Router();

homeWebRouter.get("/home", async (req, res) => {
  if (!req.session.passport?.user) {
    res.render("login.ejs");
  } else {
    res.render("home.ejs", { nombre: req.session.passport?.user.nombre });
  }
});

homeWebRouter.get("/carrito", async (req, res) => {
  if (!req.session.passport?.user) {
    res.render("login.ejs");
  } else {
    res.render("carrito.ejs", { nombre: req.session.passport?.user.nombre });
  }
});

homeWebRouter.get("/mi-perfil", async (req, res) => {
  if (!req.session.passport?.user) {
    res.render("login.ejs");
  } else {
    res.render("mi-perfil.ejs", { nombre: req.session.passport?.user.nombre });
  }
});

export default homeWebRouter;
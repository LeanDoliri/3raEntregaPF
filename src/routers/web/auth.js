import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import { Router } from "express";
import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import userSchema from "../../schemas/userSchema.js";

const authWebRouter = new Router();
const usersApi = new ContainerMongoDB(userSchema);

/*----------- bcrypt -----------*/
async function generateHashPassword(password) {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}

async function verifyPassword(user, password) {
  const match = await bcrypt.compare(password, user.password);
  return match;
}

/*----------- passport -----------*/
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      const usersDB = await usersApi.getAll();
      const userExist = usersDB.find((usr) => usr.email == email);

      if (!userExist) {
        return done(null, false);
      } else {
        const match = await verifyPassword(userExist, password);

        if (!match) {
          return done(null, false);
        }
        return done(null, userExist);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario);
});

passport.deserializeUser(async (email, done) => {
  const usersDb = await usersApi.getAll();
  const user = usersDb.find((usr) => usr.email == email);
  done(null, user);
});

/*----------- rutas -----------*/
/*----- login -----*/
authWebRouter.get("/", (req, res) => {
  res.redirect("login");
});

authWebRouter.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});

authWebRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login-error",
  })
);

/*----- logout -----*/
authWebRouter.get("/logout", (req, res) => {
  if (!req.session.passport?.user) {
    res.redirect("login");
  } else {
    res.render("auth/logout.ejs", { nombre: req.session.passport?.user.nombre });
  }
});

/*----- login-error -----*/
authWebRouter.get("/login-error", (req, res) => {
  res.render("auth/login-error.ejs");
});

/*----- signin -----*/
authWebRouter.get("/signin", (req, res) => {
  res.render("auth/signin.ejs");
});

authWebRouter.post("/signin", async (req, res) => {
  const { nombre, direccion, edad, telefono, foto, email, password } = req.body;
  const usersDb = await usersApi.getAll();
  const userExist = usersDb.find((usr) => usr.email == email);

  if (userExist) {
    res.render("auth/signin-error.ejs");
  } else {
    const newUser = {
      nombre,
      direccion,
      edad,
      telefono,
      foto,
      email,
      password: await generateHashPassword(password),
    };
    await usersApi.save(newUser);
    res.redirect("/login");
  }
});

export default authWebRouter;

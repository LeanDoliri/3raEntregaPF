import { Router } from "express";

const authWebRouter = new Router();

authWebRouter.get("/", (req, res) => {
  res.redirect("login");
});

authWebRouter.get("/login", (req, res) => {
    res.render('login.ejs');
});

authWebRouter.get('/signin', (req, res)=>{
    res.render('signin.ejs');
});

authWebRouter.post('/signin', (req, res)=>{
    const {nombre, direccion, edad, telefono, foto, email, password} = req.body;
    
});

export default authWebRouter;

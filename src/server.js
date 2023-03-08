import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import config from "./config.js";
import authWebRouter from "./routers/web/auth.js";

function createServer() {
  const app = express();
  const httpServer = new HttpServer(app);
  const io = new Socket(httpServer);

  io.on("connection", async (socket) => {
    // console.log("Nuevo cliente conectado!");

    mensajesWs(socket);
    productosWs(socket);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static("public"));

  app.set("view engine", "ejs");
  app.set("views", "./views");

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.mongoRemote.cnxStr,
        mongoOptions: config.mongoRemote.options,
      }),
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );

  /*----------- rutas -----------*/
  app.use(authWebRouter);

  app.get("/test", (req, res) => {
    res.send("Hola Mundo!");
  });

  return {
    listen: (port) =>
      new Promise((resolve, reject) => {
        const connectedServer = httpServer.listen(port, () => {
          resolve(connectedServer);
        });
        connectedServer.on("error", (error) => {
          reject(error);
        });
      }),
  };
}

export { createServer };

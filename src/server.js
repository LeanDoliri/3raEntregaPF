import express from "express";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

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
  app.set("views", "../public/views");

  app.get('/test', (req, res) => {
    res.send('Hola Mundo!');
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

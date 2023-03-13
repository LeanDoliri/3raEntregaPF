import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import productSchema from "../../schemas/productSchema.js";
const productsApi = new ContainerMongoDB(productSchema);

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

export default async function configurarSocket(socket) {
  // ---- PRODUCTOS ----
  // carga inicial de productos
  const products = await productsApi.getAll();
  socket.emit("products", products);
}

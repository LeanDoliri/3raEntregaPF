import { createServer } from "./server.js";

const app = createServer();

const port = 8080;

try {
  const connectedServer = await app.listen(port);
  console.log(`escuchando en el puerto ${connectedServer.address().port}`);
} catch (error) {
  console.log(`Error en servidor ${error}`);
}

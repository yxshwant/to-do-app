const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5500;

server.use(middlewares);
server.use(router);

server.listen(port);

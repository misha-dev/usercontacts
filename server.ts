const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
server.db = router.db;
const middlewares = jsonServer.defaults({
  static: "./build",
});
const PORT = process.env.PORT || 8000;
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    users: 600,
    messages: 640,
    "/api/*": "/$1",
  }),
);
server.use(auth);
server.use(router);

server.listen(PORT, () => {
  console.log("Server is running");
});

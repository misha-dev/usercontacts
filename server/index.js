const jsonServer = require("json-server");
const path = require("path");
const auth = require("json-server-auth");

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

const rules = auth.rewriter({
  users: 600,
  contacts: 660,
});

server.db = router.db;

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(8000, () => {
  console.log("server is running on 8000 port");
});

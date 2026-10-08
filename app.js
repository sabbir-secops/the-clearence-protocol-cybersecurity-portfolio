/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS Node.js entrypoint */
const http = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";

const app = next({
  dev: false,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      handle(req, res);
    });

    server.listen(port, hostname, () => {
      console.log(`> Next.js ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js application:", error);
    process.exit(1);
  });
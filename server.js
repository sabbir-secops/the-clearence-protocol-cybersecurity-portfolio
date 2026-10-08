/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS Node.js entrypoint */
const { spawn } = require("child_process");

const port = process.env.PORT || 3000;

const app = spawn(
  "npm",
  ["start"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: port,
    },
  }
);

app.on("close", (code) => {
  process.exit(code);
});

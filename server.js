import express from "express";
import next from "next";

const port = process.env.PORT ?? 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = express();

  server.use(express.static(process.cwd() + "/public"));

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (/** @type {any} */ err) => {
    if (err) throw err;

    console.log(`Server listening on http://localhost:${port}`);
  });
});

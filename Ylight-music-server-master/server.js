const ytdl = require("ytdl-core");
const express = require("express");
const cors = require("cors");
const cors_proxy = require("cors-anywhere");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(cors());
app.options("*", cors());

const port = 8000;

app.get("/", (req, res) => {
  res.send("Welcome to beats music api");
});

app.get("/song", async (req, res) =>
  ytdl
    .getInfo(req.query.id)
    .then((info) => {
      const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
      res.set("Cache-Control", "public, max-age=20000"); //6hrs aprox
      res.json(audioFormats[1].url);
    })
    .catch((err) => res.status(400).json(err.message))
);

let proxy = cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [], // Do not remove any headers.
});

app.get("/proxy/:proxyUrl*", (req, res) => {
  req.url = req.url.replace("/proxy/", "/"); // Strip '/proxy' from the front of the URL, else the proxy won't work.
  proxy.emit("request", req, res);
});

app.listen(port, () => console.log(`Server is listening on port ${port}.`));

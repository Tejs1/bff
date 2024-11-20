import * as http from "node:http";
import * as path from "node:path";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");
    res.end("<h1>Hello World</h1>\n");
    return;
  }

  if (req.url === "/health" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");
    res.end("Server is running\n");
    return;
  }

  if (req.url === "/echo" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res.end(body + "\n");
    });
    return;
  }

  if (req.url === "/time" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");
    res.end(`${new Date().toUTCString()}\n`);
    return;
  }
  res.statusCode = 404;
  res.setHeader("Content-type", "text/html");
  res.end("<h1>Page not found</h1>\n");
});
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

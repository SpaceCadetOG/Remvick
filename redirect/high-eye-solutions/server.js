const http = require("http");

const port = Number(process.env.PORT || 8080);
const target = (process.env.REDIRECT_TARGET || "https://remvick-web-zihnjtarma-uc.a.run.app").replace(/\/$/, "");

http
  .createServer((request, response) => {
    const sourceUrl = new URL(request.url || "/", "http://localhost");
    const location = `${target}${sourceUrl.pathname}${sourceUrl.search}`;

    response.writeHead(308, {
      Location: location,
      "Cache-Control": "public, max-age=300",
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end(`Redirecting to ${location}\n`);
  })
  .listen(port, "0.0.0.0", () => {
    console.log(`Redirecting High Eye Solutions traffic to ${target}`);
  });

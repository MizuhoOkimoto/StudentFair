const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
        target: "https://student-fair-prj66.herokuapp.com/",
        changeOrigin: true,
    })
  );
};
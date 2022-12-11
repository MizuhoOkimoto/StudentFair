const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/serverApi", {
        target: "https://student-fair-prj666.herokuapp.com/",
        changeOrigin: true,
    })
  );
};
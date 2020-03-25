module.exports = {
  port: 8050,
  https: true,
  directory: './',
  stack: [
      "body-parser",
      './url.js',
      "static"
  ],
}
module.exports = {
  port: 3010,
  https: true,
  directory: './',
  stack: [
      "body-parser",
      './url.js',
      "static"
  ],
}
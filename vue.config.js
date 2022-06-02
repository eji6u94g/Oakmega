const fs = require("fs");

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(`./src/assets/https/localhost-key.pem`),
      cert: fs.readFileSync(`./src/assets/https/localhost.pem`)
    }
  }
};
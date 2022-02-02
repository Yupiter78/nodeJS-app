const path = require("path");
console.log("path_dirname:", path.dirname(__filename));
console.log("path_basename:", path.basename(__filename));
console.log("path_extname:", path.extname(__filename).slice(1));
console.log("path_parse:", path.parse(__filename));
console.log(
    "path_resolve:",
    path.resolve(__dirname, "..", "./modules", "./app.js")
);
console.log("path_join:", path.join(__dirname, "..", "./modules", "./app.js"));

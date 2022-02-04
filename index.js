// const http = require("http");
const express = require("express");
const chalk = require("chalk");
// const fs = require("fs/promises");
const path = require("path");
const { addNote } = require("./notes.controller");

const app = express();
app.use(
    express.urlencoded({
        extended: true
    })
);
const port = 3000;
const basePath = path.join(__dirname, "pages");

app.get("/", (req, res) => {
    res.sendFile(path.join(basePath, "index.html"));
});

app.post("/", async (req, res) => {
    console.log("req.body.title:", req.body.title);
    await addNote(req.body.title);
    res.sendFile(path.join(basePath, "index.html"));
});

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
});

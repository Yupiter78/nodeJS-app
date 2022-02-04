const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes } = require("./notes.controller");

const app = express();
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true
    })
);
const port = 3000;
// const basePath = path.join(__dirname, "pages");

app.get("/", async (req, res) => {
    // res.sendFile(path.join(basePath, "index.html"));
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    });
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    // res.sendFile(path.join(basePath, "index.html"));
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true
    });
});

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
});

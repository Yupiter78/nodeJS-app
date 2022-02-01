const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    };
    notes.push(note);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach((note) => {
        console.log(chalk.red(note.id), chalk.blue(note.title));
    });
}

async function removeNote(noteId) {
    console.log("nodeId:", noteId);
    console.log("nodeId_type:", typeof noteId);
    const notes = await getNotes();
    const filteredNotes = notes.filter(({ id }) => noteId.toString() !== id);
    console.log("filteredNotes:", filteredNotes);
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
}

module.exports = {
    addNote,
    printNotes,
    removeNote
};

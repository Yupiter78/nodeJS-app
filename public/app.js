document.addEventListener("click", ({ target }) => {
    if (target.dataset.type === "remove") {
        const id = target.dataset.id;
        remove(id).then(() => {
            // target.parentNode.remove();
            target.closest("li").remove();
        });
    }
    if (target.dataset.type === "update") {
        const newTitle = prompt(
            "Enter new title",
            target.dataset.title
        )?.trim();
        if (newTitle) {
            update({ id: target.dataset.id, title: newTitle }).then(
                ({ status }) => {
                    if (status === 200) {
                        target.closest("li").querySelector("span").textContent =
                            newTitle;
                    }
                }
            );
        }
    }
    target.blur();
});

async function remove(id) {
    return await fetch(`/${id}`, { method: "DELETE" });
}

async function update(newNote) {
    return await fetch(`/${newNote.id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
}

document.addEventListener("click", ({ target }) => {
    if (target.dataset.type === "remove") {
        const id = target.dataset.id;
        console.log("id_remove:", id);
        remove(id).then(({ status }) => {
            console.log("status_remove:", status);
            // target.parentNode.remove();
            target.closest("li").remove();
        });
    }
    if (target.dataset.type === "update") {
        const id = target.dataset.id;
        console.log("id_update:", id);
        const newTitle = prompt("Enter new title", "")?.trim();
        console.log("newTitle:", newTitle);
        if (newTitle) {
            update(id, newTitle).then(({ status }) => {
                if (status === 200) {
                    target.closest("li").firstChild.textContent = newTitle;
                }
            });
        }
    }
    target.blur();
});

async function remove(id) {
    return await fetch(`/${id}`, { method: "DELETE" });
}

async function update(id, newTitle) {
    console.log("fetch_update_newTitle", newTitle);
    return await fetch(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            title: newTitle
        }),
        headers: { "Content-Type": "application/json" }
    });
}

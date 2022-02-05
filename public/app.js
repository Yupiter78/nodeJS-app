document.addEventListener("click", ({ target }) => {
    if (target.dataset.type === "remove") {
        const id = target.dataset.id;
        remove(id).then(() => {
            // target.parentNode.remove();
            target.closest("li").remove();
        });
    }
    if (target.dataset.type === "update") {
        const newTitle = prompt("Enter new title", "")?.trim();
        if (newTitle) {
            update(target.dataset.id, newTitle).then(({ status }) => {
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
    return await fetch(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            title: newTitle
        }),
        headers: { "Content-Type": "application/json" }
    });
}

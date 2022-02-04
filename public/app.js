document.addEventListener("click", ({ target }) => {
    if (target.dataset.type === "remove") {
        const id = target.dataset.id;
        console.log("id:", id);
        remove(id).then(() => {
            // target.parentNode.remove();
            target.closest("li").remove();
        });
    }
});

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}

document.addEventListener("click", ({ target }) => {
    const dataType = ["remove", "update", "edit", "return"];
    if (!dataType.includes(target.dataset.type)) return;
    const group = Array.from(
        document.querySelectorAll(
            `[data-id="${target.dataset.id}"][data-group='display']`
        )
    );

    const inputElem = target.closest("li").querySelector("[name='noteTitle']");

    const newTitle = inputElem.value;
    switch (target.dataset.type) {
        case "remove":
            const id = target.dataset.id;
            remove(id).then(() => {
                target.closest("li").remove();
            });
            break;
        case "update":
            if (inputElem.value === "") {
                inputElem.value = target.dataset.title;
            }
            if (newTitle) {
                update({ id: target.dataset.id, title: newTitle }).then(
                    ({ status }) => {
                        if (status === 200) {
                            target
                                .closest("li")
                                .querySelector("span").innerText = newTitle;
                        }
                    }
                );
            }
            toggleDisplay(group);
            break;

        case "edit":
            toggleDisplay(group);
            break;

        case "return":
            inputElem.value = target.dataset.title;
            toggleDisplay(group);
            break;
        default:
            break;
    }
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

function toggleDisplay(group) {
    group.forEach((item) => item.classList.toggle("d-none"));
}

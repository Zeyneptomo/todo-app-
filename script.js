const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

function addTodo() {
    const görev = todoInput.value.trim();

    if (görev === "") {
        return;
    }

    const li = document.createElement("li");
    li.classList.add("todo-item");

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = görev;

    const statusBtn = document.createElement("button");
    statusBtn.classList.add("status-btn");
    statusBtn.textContent = "Yapılmadı";

    statusBtn.addEventListener("click", function () {
        li.classList.toggle("completed");

        if (li.classList.contains("completed")) {
            statusBtn.textContent = "Yapıldı";
        } else {
            statusBtn.textContent = "Yapılmadı";
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Sil";

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(statusBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    todoInput.value = "";
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];


function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


function loadTodos() {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }

    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(function (todo, index) {
        const li = createTodoElement(todo, index);
        todoList.appendChild(li);
    });
}


function createTodoElement(todo, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    if (todo.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = todo.text;

    const statusBtn = document.createElement("button");
    statusBtn.classList.add("status-btn");
    statusBtn.textContent = todo.completed ? "Yapıldı" : "Yapılmadı";

    statusBtn.addEventListener("click", function () {
        toggleTodoStatus(index);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Sil";

    deleteBtn.addEventListener("click", function () {
        deleteTodo(index);
    });

    li.appendChild(span);
    li.appendChild(statusBtn);
    li.appendChild(deleteBtn);

    return li;
}


function addTodo() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTodo = {
        text: taskText,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = "";

    saveTodos();
    renderTodos();
}


function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function toggleTodoStatus(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}


addBtn.addEventListener("click", addTodo);


todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});


loadTodos();
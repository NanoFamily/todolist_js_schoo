`use strict`;

let todos = localStorage.getItem("todos");
if (todos) {
    todos = JSON.parse(todos);
} else {
    todos = [];
}

let todoForm = document.getElementById("todo-form");
let todoList = document.getElementById("todo-list");
let todoInput = document.querySelector("#todo-form input")

let addItem = function(event) {
    event.preventDefault();

    if (!todoInput.value){
        return;
    }

    todos.push({text: todoInput.value, done: false});
    render();

    todoInput.value = "";
};

let render = function(){
    todoList.innerHTML = "";

    todos.forEach(function(todo) {
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = todo.done;
        checkBox.addEventListener("change", function(event) {
            todo.done = event.target.checked;
        });
    
        let span = document.createElement("span");
        span.textContent = todo.text;
    
        let label = document.createElement("label");
        label.appendChild(checkBox);
        label.appendChild(span);
    
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.addEventListener("click", function() {
            let index = todos.indexOf(todo);
            todos.splice(index, 1);
            render();
        });
    
        let listItem = document.createElement("li");
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);
    
        todoList.appendChild(listItem);

        localStorage.setItem("todos", JSON.stringify(todos));
    });
};

let deleteItem = function(event) {
    let listItem = event.target.parentElement;
    todoList.removeChild(listItem);
};

todoForm.addEventListener("submit", addItem);

render();
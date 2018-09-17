var todos = ["Buy New Turtle"];

var input = prompt("What would you like to do?");

while(input !== "quit") {
    if(input === "list") {
        listTodos();
    } else if (input === "new") {
        //ask for new todos
        addTodo();
    } else if (input === "delete") {
        deleteTodo();
    }
    var input = prompt("What would you like to do?");
}

function listTodos(){
    todos.forEach(function(todo, i) {
        console.log("**********");
        console.log(i + ": " + todo);
        console.log("**********");

    })
    console.log(todos);
}

function addTodo() {
    var newTodo = prompt("Enter new todo");
    todos.push(newTodo);
    console.log("Added Todo");
}

function deleteTodo() {
    var index = prompt("Enter index of todo to delete");
        todos.splice(index, 1);
        console.log("Deleted Todo");
}

console.log("Quitting app");
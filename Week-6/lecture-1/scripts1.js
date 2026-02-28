// Document Object Model(DOM) Manipulation
function addTodo1() {
    // write a code that reads content from the input box
    // create a new todo on the html dom
    // clears the input box

    let element = document.getElementById('todoInput');
    // use value to access the value inside input
    const todo = element.value


    const newDiv = document.createElement("div");
    // use innerHTML to access the value inside a div

    newDiv.innerHTML = todo;
    // running it till here does not make any changes because we havent told it yet to put elements inside div

    // to put it inside a DOM we need to tell it where to put it
    const parentDiv = document.getElementById('todos');
    parentDiv.appendChild(newDiv);
};



function addTodo2() {
    const element = document.getElementById('todoInput');
    const todo = element.value;

    const newDiv = document.createElement('div');
    newDiv.innerHTML = "<span>" + todo + "</span> <button> Delete Todo </button>";

    const parentDiv = document.getElementById("todos");
    parentDiv.appendChild(newDiv);

};

let todoIndex = 0;

function addTodo() {

    // extract value from input
    const element = document.getElementById('todoInput');
    let todo = element.value;

    if (todo !== "") {
        const todoDiv = document.createElement("div");
        todoDiv.setAttribute("id", "todo"+todoIndex)

        // create a span and add my todo in the span
        const todoSpan = document.createElement('span');
        todoSpan.innerHTML = todo;

        // appending in tododiv
        todoDiv.appendChild(todoSpan);


        // add a delete button for the created todo
        const todoButton = document.createElement('button');
        todoButton.innerHTML = 'Delete Div';
        todoButton.setAttribute("onclick", "deleteTodo("+todoIndex+")")



        todoDiv.appendChild(todoButton);

        const parentDiv = document.getElementById('parentDiv');
        parentDiv.appendChild(todoDiv)


        // clearing the input
        element.value = "";

        todoIndex+=1;
    }

    else{
        alert("Cannot add Empty task")
    }

}

// above we have onclick = "deleteTodo(" + todoIndex + ")";
// this translate to deleteTodo(1) so 1 is passed

function deleteTodo(index){
    // alert('Delete Todo Is called with ' + index)
    // remove element
    const removeElement = document.getElementById("todo"+index);
    removeElement.parentElement.removeChild(removeElement);

    // alternatively
    // document.getElementById('todo').removeChild(removeElement)
}
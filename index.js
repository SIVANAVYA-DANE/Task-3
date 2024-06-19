let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));

};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        status: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    

    let itemIndex = todoList.findIndex(function(eachItem) {
        let eachItemId = "todo" + eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true;

        } else {
            return false;
        }
    });

    let todoItem = todoList[itemIndex];
    if (todoItem.status === true) {
        
        todoItem.status = false;
    } else {
        
        todoItem.status = true;
    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let dateId="date"+todo.uniqueNo;

    const today = new Date();
    const createdDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    let todoElement = document.createElement("li");
    
    todoElement.classList.add("todo-item-container");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.status;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId,);
    };

    inputElement.classList.add("checkbox-input");
    
    if (todo.status) {
        todoElement.style.order = 1;
    } else {
        todoElement.style.order = 0;
    }
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container","d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    labelContainer.appendChild(inputElement);
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.status === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let dateEl=document.createElement("p");
    dateEl.textContent=createdDate;
    dateEl.id=dateId;
    dateEl.classList.add("date-info");
    labelContainer.appendChild(dateEl);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
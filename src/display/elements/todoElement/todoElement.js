import "./style.css";


const TODO_CONTAINER_CLASSNAME = "todo-container";
const TODO_TITLE_CONTAINER_CLASSNAME = "todo-title-container";
const TODO_DATA_CONTAINER_CLASSNAME = "todo-data-container";
const TODO_PRIORITY_CONTAINER_CLASSNAME = "todo-priority-container";
const TODO_DUE_DATE_CONTAINER_CLASSNAME = "todo-due-date-container";
const TODO_DESCRIPTION_CONTAINER_CLASSNAME = "todo-description-container";


function getTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList.add(TODO_CONTAINER_CLASSNAME);

    const todoTitleContainer = document.createElement("div");
    todoTitleContainer.classList.add(TODO_TITLE_CONTAINER_CLASSNAME);
    todoTitleContainer.textContent = todo.title;

    const todoPriorityContainer = document.createElement("div");
    todoPriorityContainer.classList.add(TODO_PRIORITY_CONTAINER_CLASSNAME);
    todoPriorityContainer.textContent = todo.priority;

    const todoDueDateContainer = document.createElement("div");
    todoDueDateContainer.classList.add(TODO_DUE_DATE_CONTAINER_CLASSNAME);
    todoDueDateContainer.textContent = todo.dueDate? todo.dueDate: "No due date";

    const todoDescriptionContainer = document.createElement("div");
    todoDescriptionContainer.classList.add(TODO_DESCRIPTION_CONTAINER_CLASSNAME);
    todoDescriptionContainer.textContent = todo.description;

    const todoDataContainer = document.createElement("div");
    todoDataContainer.classList.add(TODO_DATA_CONTAINER_CLASSNAME);
    todoDataContainer.appendChild(todoPriorityContainer);
    todoDataContainer.appendChild(todoDueDateContainer);

    todoElement.appendChild(todoTitleContainer);
    todoElement.appendChild(todoDataContainer);
    todoElement.appendChild(todoDescriptionContainer);

    return todoElement;
}


export { getTodoElement };

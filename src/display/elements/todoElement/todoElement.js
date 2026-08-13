import { format } from "date-fns";

import { Expandable } from "#display/elements/expandable.js"

import "./style.css";


const TODO_CONTAINER_CLASSNAME = "todo-container";
const TODO_SUMMARY_CONTAINER_CLASSNAME = "todo-summary-container";
const TODO_TITLE_CONTAINER_CLASSNAME = "todo-title-container";
const TODO_DATA_CONTAINER_CLASSNAME = "todo-data-container";
const TODO_PRIORITY_CONTAINER_CLASSNAME = "todo-priority-container";
const TODO_DUE_DATE_CONTAINER_CLASSNAME = "todo-due-date-container";
const TODO_INFO_CONTAINER_CLASSNAME = "todo-info-container";

const PRIORITY_TO_COLOR_MAP = {
    1: "red",
    2: "orange",
    3: "green"
};

function getTodoSummaryElement(todo) {
    const todoSummaryElement = document.createElement("div");
    todoSummaryElement.classList.add(TODO_SUMMARY_CONTAINER_CLASSNAME);

    const todoTitleContainer = document.createElement("p");
    todoTitleContainer.classList.add(TODO_TITLE_CONTAINER_CLASSNAME);
    todoTitleContainer.innerHTML = todo.title;

    const todoPriorityContainer = document.createElement("span");
    todoPriorityContainer.classList.add(TODO_PRIORITY_CONTAINER_CLASSNAME);
    todoPriorityContainer.textContent = todo.priority;
    todoPriorityContainer.style.backgroundColor = PRIORITY_TO_COLOR_MAP[todo.priority];
    todoPriorityContainer.style.color = "white";

    todoSummaryElement.appendChild(todoPriorityContainer);
    todoSummaryElement.appendChild(todoTitleContainer);

    const todoDueDateContainer = document.createElement("div");
    todoDueDateContainer.classList.add(TODO_DUE_DATE_CONTAINER_CLASSNAME);
    todoDueDateContainer.textContent = todo.dueDate? `- due before ${format(todo.dueDate, "yyyy-MM-dd")}` : "";
    todoSummaryElement.appendChild(todoDueDateContainer);

    return todoSummaryElement;
}

function getTodoInfoElement(todo) {
    const todoDescriptionContainer = document.createElement("div");
    todoDescriptionContainer.classList.add(TODO_INFO_CONTAINER_CLASSNAME);
    todoDescriptionContainer.textContent = todo.description;

    return todoDescriptionContainer;
}

function getTodoElement(todo) {
    let todoElement = new Expandable(
        getTodoSummaryElement(todo),
        false,
        getTodoInfoElement(todo)
    ).getElement();
    todoElement.classList.add(TODO_CONTAINER_CLASSNAME);

    return todoElement;
}


export { getTodoElement };

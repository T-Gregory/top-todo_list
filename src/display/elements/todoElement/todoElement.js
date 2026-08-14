import { format } from "date-fns";

import { Expandable } from "#display/elements/expandable.js"

import "./style.css";
import checkmarkSvg from "./check-mark.svg?raw";
import pencilSvg from "./pencil.svg?raw";


const TODO_CONTAINER_CLASSNAME = "todo-container";
const TODO_SUMMARY_CONTAINER_CLASSNAME = "todo-summary-container";
const TODO_SUMMARY_DATA_CONTAINER_CLASSNAME = "todo-data-container";
const TODO_SUMMARY_ACTION_CONTAINER_CLASSNAME = "todo-action-container";
const TODO_TITLE_CONTAINER_CLASSNAME = "todo-title-container";
const TODO_DATA_CONTAINER_CLASSNAME = "todo-data-container";
const TODO_PRIORITY_CONTAINER_CLASSNAME = "todo-priority-container";
const TODO_DUE_DATE_CONTAINER_CLASSNAME = "todo-due-date-container";
const TODO_INFO_CONTAINER_CLASSNAME = "todo-info-container";

const TODO_ACTION_BUTTON_CLASSNAME = "todo-action-button"
const TODO_EDIT_BUTTON_CLASSNAME = "todo-edit-button";
const TODO_DONE_BUTTON_CLASSNAME = "todo-done-button";

const PRIORITY_TO_COLOR_MAP = {
    1: "red",
    2: "orange",
    3: "green"
};

function getTodoSummaryDataElement(todo) {
    const todoSummaryDataElement = document.createElement("div");
    todoSummaryDataElement.classList.add(TODO_SUMMARY_DATA_CONTAINER_CLASSNAME);

    const todoTitleContainer = document.createElement("p");
    todoTitleContainer.classList.add(TODO_TITLE_CONTAINER_CLASSNAME);
    todoTitleContainer.innerHTML = todo.title;

    const todoPriorityContainer = document.createElement("span");
    todoPriorityContainer.classList.add(TODO_PRIORITY_CONTAINER_CLASSNAME);
    todoPriorityContainer.textContent = todo.priority;
    todoPriorityContainer.style.backgroundColor = PRIORITY_TO_COLOR_MAP[todo.priority];
    todoPriorityContainer.style.color = "white";

    todoSummaryDataElement.appendChild(todoPriorityContainer);
    todoSummaryDataElement.appendChild(todoTitleContainer);

    const todoDueDateContainer = document.createElement("div");
    todoDueDateContainer.classList.add(TODO_DUE_DATE_CONTAINER_CLASSNAME);
    todoDueDateContainer.textContent = todo.dueDate? `- due before ${format(todo.dueDate, "yyyy-MM-dd")}` : "";
    todoSummaryDataElement.appendChild(todoDueDateContainer);

    return todoSummaryDataElement;
}

function getTodoDoneButton(todo) {
    const todoDoneButton = document.createElement("button");
    todoDoneButton.classList.add(TODO_DONE_BUTTON_CLASSNAME);

    const projectDoneButtonLogo = document.createElement("div");
    projectDoneButtonLogo.innerHTML = checkmarkSvg;
    todoDoneButton.appendChild(projectDoneButtonLogo);

    return todoDoneButton;
}

function getTodoEditButton(todo) {
    const todoEditButton = document.createElement("button");
    todoEditButton.classList.add(TODO_EDIT_BUTTON_CLASSNAME);

    const projectEditButtonLogo = document.createElement("div");
    projectEditButtonLogo.innerHTML = pencilSvg;
    todoEditButton.appendChild(projectEditButtonLogo);

    return todoEditButton;
}

function getTodoSummaryActionElement(todo) {
    const todoSummaryActionElement = document.createElement("div");
    todoSummaryActionElement.classList.add(TODO_SUMMARY_ACTION_CONTAINER_CLASSNAME);

    const todoDoneButton = getTodoDoneButton(todo);
    todoDoneButton.classList.add(TODO_ACTION_BUTTON_CLASSNAME);
    const todoEditButton = getTodoEditButton(todo);
    todoEditButton.classList.add(TODO_ACTION_BUTTON_CLASSNAME);

    todoSummaryActionElement.appendChild(todoDoneButton);
    todoSummaryActionElement.appendChild(todoEditButton);
    return todoSummaryActionElement;
}

function getTodoSummaryElement(todo) {
    const todoSummaryElement = document.createElement("div");
    todoSummaryElement.classList.add(TODO_SUMMARY_CONTAINER_CLASSNAME);

    const todoSummaryDataElement = getTodoSummaryDataElement(todo);
    const todoSummaryActionElement = getTodoSummaryActionElement(todo);

    todoSummaryElement.appendChild(todoSummaryDataElement);
    todoSummaryElement.appendChild(todoSummaryActionElement);

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

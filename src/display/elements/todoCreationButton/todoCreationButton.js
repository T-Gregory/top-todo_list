import { createTodoCreationModal } from "#src/display/modals/todoCreationModal.js";
import { triggerStateChangeEvent } from "#display/event.js";

import "./style.css";


const TODO_CREATION_BUTTON_CONTAINER_CLASS_NAME = "todo-creation-button-container";

function getTodoCreationButton(project) {
    const todoCreationButtonContainer = document.createElement("div");
    todoCreationButtonContainer.classList.add(TODO_CREATION_BUTTON_CONTAINER_CLASS_NAME);

    const todoCreationButton = document.createElement("button");
    todoCreationButton.textContent = "New todo";

    const todoCreationModalPostSubmit = () => { triggerStateChangeEvent(); }
    const todoCreationModal = createTodoCreationModal(project, todoCreationModalPostSubmit);
    todoCreationButtonContainer.appendChild(todoCreationModal);

    todoCreationButton.addEventListener("click", (event) => {
        todoCreationModal.showModal();
    });
    todoCreationButtonContainer.appendChild(todoCreationButton);

    return todoCreationButtonContainer;
}


export { getTodoCreationButton };

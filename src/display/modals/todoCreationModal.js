import { createFormInputItem } from "#elements/formInputItem/formInputItem.js";
import { Todo } from "#src/core/todo/todo.js";


const TODO_TITLE_INPUT_ID = "todo-title-creation-field";
const TODO_DESCRIPTION_INPUT_ID = "todo-description-creation-field";
const TODO_DUE_DATE_INPUT_ID = "todo-due-date-creation-field";
const TODO_PRIORITY_INPUT_ID = "todo-priority-creation-field";


function createTodoCreationModal(project, postSubmitCallback) {
    const creationModal = document.createElement("dialog");
    const creationForm = document.createElement("form");
    creationForm.action = "";
    creationForm.method = "";

    const titleField = document.createElement("input");
    titleField.type = "text";
    titleField.id = TODO_TITLE_INPUT_ID;
    titleField.minLength = 3;
    titleField.maxLength = 25;
    const titleFieldLabel = document.createElement("label");
    titleFieldLabel.setAttribute("for", TODO_TITLE_INPUT_ID);
    titleFieldLabel.textContent = "Title:";
    let titleInputItem = createFormInputItem(titleFieldLabel, titleField);
    
    const descriptionField = document.createElement("textarea");
    descriptionField.id = TODO_DESCRIPTION_INPUT_ID;
    descriptionField.maxLength = 1000;
    const descriptionFieldLabel = document.createElement("label");
    descriptionFieldLabel.setAttribute("for", TODO_DESCRIPTION_INPUT_ID);
    descriptionFieldLabel.textContent = "Description:";
    let descriptionInputItem = createFormInputItem(descriptionFieldLabel, descriptionField);

    const priorityField = document.createElement("input");
    priorityField.type = "number";
    priorityField.id = TODO_PRIORITY_INPUT_ID;
    priorityField.min = 1;
    priorityField.max = 3;
    priorityField.step = 1;
    const priorityFieldLabel = document.createElement("label");
    priorityFieldLabel.setAttribute("for", TODO_PRIORITY_INPUT_ID);
    priorityFieldLabel.textContent = "Priority:";
    let prioritydInputItem = createFormInputItem(priorityFieldLabel, priorityField);

    const dueDateField = document.createElement("input");
    dueDateField.type = "date";
    dueDateField.id = TODO_DUE_DATE_INPUT_ID;
    const dueDateFieldLabel = document.createElement("label");
    dueDateFieldLabel.setAttribute("for", TODO_DUE_DATE_INPUT_ID);
    dueDateFieldLabel.textContent = "Due before:";
    let dueDateInputItem = createFormInputItem(dueDateFieldLabel, dueDateField);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        let dueDate = null;
        if (dueDateField.value && dueDateField !== "") {
            dueDate = new Date(dueDateField.value);
        }
        const newTodo = new Todo(
            titleField.value,
            descriptionField.value ? descriptionField.value : null,
            dueDate,
            priorityField.value ? Number(priorityField.value) : null
        );
        project.addTodo(newTodo);

        creationForm.reset();
        creationModal.close();

        postSubmitCallback();
    });

    creationForm.appendChild(titleInputItem);
    creationForm.appendChild(descriptionInputItem);
    creationForm.appendChild(prioritydInputItem);
    creationForm.appendChild(dueDateInputItem);
    creationForm.appendChild(submitButton);
    creationModal.appendChild(creationForm);

    return creationModal;
}


export { createTodoCreationModal };
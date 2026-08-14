import { createFormInputItem } from "#elements/formInputItem/formInputItem.js"


const TODO_TITLE_INPUT_ID = "todo-title-edit-field";
const TODO_DESCRIPTION_INPUT_ID = "todo-description-edit-field";
const TODO_DUE_DATE_INPUT_ID = "todo-due-date-edit-field";
const TODO_PRIORITY_INPUT_ID = "todo-priority-edit-field";

function createTodoEditModal(todo, postSubmitCallback) {
    const editModal = document.createElement("dialog");
    const editForm = document.createElement("form");
    editForm.action = "";
    editForm.method = "";

    const titleField = document.createElement("input");
    titleField.type = "text";
    titleField.id = TODO_TITLE_INPUT_ID;
    titleField.minLength = 3;
    titleField.maxLength = 25;
    titleField.value = todo.title;
    const nameFieldLabel = document.createElement("label");
    nameFieldLabel.setAttribute("for", TODO_TITLE_INPUT_ID);
    nameFieldLabel.textContent = "Title:";
    let titleInputItem = createFormInputItem(nameFieldLabel, titleField);

    const descriptionField = document.createElement("textarea");
    descriptionField.id = TODO_DESCRIPTION_INPUT_ID;
    descriptionField.maxLength = 1000;
    descriptionField.value = todo.description ? todo.description : "";
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
    priorityField.value = todo.priority;
    const priorityFieldLabel = document.createElement("label");
    priorityFieldLabel.setAttribute("for", TODO_PRIORITY_INPUT_ID);
    priorityFieldLabel.textContent = "Priority:";
    let prioritydInputItem = createFormInputItem(priorityFieldLabel, priorityField);

    const dueDateField = document.createElement("input");
    dueDateField.type = "date";
    dueDateField.id = TODO_DUE_DATE_INPUT_ID;
    dueDateField.value = todo.dueDate;
    const dueDateFieldLabel = document.createElement("label");
    dueDateFieldLabel.setAttribute("for", TODO_DUE_DATE_INPUT_ID);
    dueDateFieldLabel.textContent = "Due before:";
    let dueDateInputItem = createFormInputItem(dueDateFieldLabel, dueDateField);

    let todoEditSubmitButton = document.createElement("button");
    todoEditSubmitButton.textContent = "Submit";
    todoEditSubmitButton.addEventListener("click", (event) => {
        event.preventDefault();

        todo.title = titleField.value;
        todo.description = descriptionField.value;
        todo.priority = Number(priorityField.value);
        if (dueDateField.value && dueDateField !== "") {
            todo.dueDate = new Date(dueDateField.value);
        }

        editForm.reset();
        editModal.close();

        postSubmitCallback();
    });

    editForm.appendChild(titleInputItem);
    editForm.appendChild(descriptionInputItem);
    editForm.appendChild(prioritydInputItem);
    editForm.appendChild(dueDateInputItem);
    editForm.appendChild(todoEditSubmitButton);

    editModal.appendChild(editForm);

    return editModal;
}


export { createTodoEditModal };

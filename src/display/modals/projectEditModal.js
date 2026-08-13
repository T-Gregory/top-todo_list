import { createFormInputItem } from "#elements/formInputItem/formInputItem.js"


const PROJECT_NAME_INPUT_ID = "project-name-edit-field";

function createProjectEditModal(project, postSubmitCallback) {
    const editModal = document.createElement("dialog");
    const editForm = document.createElement("form");
    editForm.action = "";
    editForm.method = "";

    const nameField = document.createElement("input");
    nameField.type = "text";
    nameField.id = PROJECT_NAME_INPUT_ID;
    nameField.minLength = 3;
    nameField.maxLength = 25;

    const nameFieldLabel = document.createElement("label");
    nameFieldLabel.setAttribute("for", PROJECT_NAME_INPUT_ID);
    nameFieldLabel.textContent = "New project's name:";

    let nameInputItem = createFormInputItem(nameFieldLabel, nameField);

    let projectEditSubmitButton = document.createElement("button");
    projectEditSubmitButton.textContent = "Submit";
    projectEditSubmitButton.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            project.title = nameField.value;
        } catch (error) {
            alert(error);
        }
        editForm.reset();
        editModal.close();

        postSubmitCallback();
    });

    editForm.appendChild(nameInputItem);
    editForm.appendChild(projectEditSubmitButton);
    editModal.appendChild(editForm);

    return editModal;
}


export { createProjectEditModal };

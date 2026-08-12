import { createFormInputItem } from "#elements/formInputItem/formInputItem.js"


const PROJECT_NAME_EDIT_FIELD_ID_NAME = "project-name-edit-field"

function createProjectEditModal(project, postSubmitCallback) {
    const projectEditModal = document.createElement("dialog");
    const projectEditForm = document.createElement("form");
    projectEditForm.action = "";
    projectEditForm.method = "";

    const projectNameEditField = document.createElement("input");
    projectNameEditField.type = "text";
    projectNameEditField.id = PROJECT_NAME_EDIT_FIELD_ID_NAME;
    projectNameEditField.minLength = 3;
    projectNameEditField.maxLength = 25;

    const projectNameEditFieldLabel = document.createElement("label");
    projectNameEditFieldLabel.setAttribute("for", PROJECT_NAME_EDIT_FIELD_ID_NAME);
    projectNameEditFieldLabel.textContent = "New project's name:";

    let projectNameInputITem = createFormInputItem(projectNameEditFieldLabel, projectNameEditField);

    let projectEditSubmitButton = document.createElement("button");
    projectEditSubmitButton.textContent = "Submit";
    projectEditSubmitButton.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            project.title = projectNameEditField.value;
        } catch (error) {
            alert(error);
        }
        projectEditForm.reset();
        projectEditModal.close();

        postSubmitCallback();
    });

    projectEditForm.appendChild(projectNameInputITem);
    projectEditForm.appendChild(projectEditSubmitButton);
    projectEditModal.appendChild(projectEditForm);

    return projectEditModal;
}


export { createProjectEditModal };

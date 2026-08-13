import { createFormInputItem } from "#elements/formInputItem/formInputItem.js";
import { Project } from "#src/core/project/project.js";


const PROJECT_NAME_INPUT_ID = "project-name-field";


function createProjectCreationModal(app, postSubmitCallback) {
    const creationModal = document.createElement("dialog");
    const creationForm = document.createElement("form");
    creationForm.action = "";
    creationForm.method = "";

    const nameField = document.createElement("input");
    nameField.type = "text";
    nameField.id = PROJECT_NAME_INPUT_ID;
    nameField.minLength = 3;
    nameField.maxLength = 25;

    const nameFieldLabel = document.createElement("label");
    nameFieldLabel.setAttribute("for", PROJECT_NAME_INPUT_ID);
    nameFieldLabel.textContent = "Project's name:";

    let nameInputItem = createFormInputItem(nameFieldLabel, nameField);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const newProject = new Project(nameField.value);
        app.addProject(newProject);

        creationForm.reset();
        creationModal.close();

        postSubmitCallback();
    });

    creationForm.appendChild(nameInputItem);
    creationForm.appendChild(submitButton);
    creationModal.appendChild(creationForm);

    return creationModal;
}


export { createProjectCreationModal };
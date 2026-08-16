import { createFormInputItem } from "#elements/formInputItem/formInputItem.js";
import { Project } from "#src/core/project/project.js";


const PROJECT_TITLE_INPUT_ID = "project-title-creation-field";


function createProjectCreationModal(app, postSubmitCallback) {
    const creationModal = document.createElement("dialog");
    const creationForm = document.createElement("form");
    creationForm.action = "";
    creationForm.method = "";

    const titleField = document.createElement("input");
    titleField.type = "text";
    titleField.id = PROJECT_TITLE_INPUT_ID;
    titleField.minLength = 3;
    titleField.maxLength = 25;

    const titleFieldLabel = document.createElement("label");
    titleFieldLabel.setAttribute("for", PROJECT_TITLE_INPUT_ID);
    titleFieldLabel.textContent = "Title:";

    let titleInputItem = createFormInputItem(titleFieldLabel, titleField);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const newProject = new Project(titleField.value);
        app.addProject(newProject);

        creationForm.reset();
        creationModal.close();

        postSubmitCallback();
    });

    creationForm.appendChild(titleInputItem);
    creationForm.appendChild(submitButton);
    creationModal.appendChild(creationForm);

    return creationModal;
}


export { createProjectCreationModal };
import { createProjectCreationModal } from "#display/modals/projectCreationModal.js";
import { triggerStateChangeEvent } from "#display/event.js";

import "./style.css";


const PROJECT_CREATION_BUTTON_CONTAINER_CLASS_NAME = "project-creation-button-container";

function getProjectCreationButton(app) {
    const projectCreationButtonContainer = document.createElement("div");
    projectCreationButtonContainer.classList.add(PROJECT_CREATION_BUTTON_CONTAINER_CLASS_NAME);

    const projectCreationButton = document.createElement("button");
    projectCreationButton.textContent = "New project";

    const projectCreationModalPostSubmit = () => { triggerStateChangeEvent(); }
    const projectCreationModal = createProjectCreationModal(app, projectCreationModalPostSubmit);
    projectCreationButtonContainer.appendChild(projectCreationModal);

    projectCreationButton.addEventListener("click", (event) => {
        projectCreationModal.showModal();
    });
    projectCreationButtonContainer.appendChild(projectCreationButton);

    return projectCreationButtonContainer;
}


export { getProjectCreationButton };

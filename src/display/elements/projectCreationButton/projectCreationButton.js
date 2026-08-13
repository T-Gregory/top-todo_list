import { createProjectCreationModal } from "#display/modals/projectCreationModal.js";
import { triggerStateChangeEvent } from "#display/event.js";


function getProjectCreationButton(app) {
    const projectCreationButtonContainer = document.createElement("div");
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

import { Expandable } from "#display/elements/expandable.js"
import { createProjectEditModal } from "#display/modals/projectEditModal.js"
import { triggerStateChangeEvent } from "#display/event.js";

import "./style.css";
import binSvg from "./trash-can.svg?raw";
import pencilSvg from "./pencil.svg?raw";


function getProjectEditModal(project) {
    const projectEditModalPostSubmit = () => { triggerStateChangeEvent(); }
    const projectEditModal = createProjectEditModal(project, projectEditModalPostSubmit);

    return projectEditModal;
}

function getProjectEditButton(project, projectEditModal) {
    const PROJECT_EDIT_BUTTON_CLASSNAME = "project-edit-button";
    let projectEditButton = document.createElement("button");
    projectEditButton.classList.add(PROJECT_EDIT_BUTTON_CLASSNAME);

    const projectEditButtonLogo = document.createElement("div");
    projectEditButtonLogo.innerHTML = pencilSvg;
    projectEditButton.appendChild(projectEditButtonLogo);

    projectEditButton.addEventListener("click", (event) => {
        projectEditModal.showModal();
        event.stopPropagation();
    })

    return projectEditButton;
}

function getProjectDeleteButton(project, app) {
    const PROJECT_DELETE_BUTTON_CLASSNAME = "project-delete-button";
    let projectDeleteButton = document.createElement("button");
    projectDeleteButton.classList.add(PROJECT_DELETE_BUTTON_CLASSNAME);

    const projectDeleteButtonLogo = document.createElement("div");
    projectDeleteButtonLogo.innerHTML = binSvg;
    projectDeleteButton.appendChild(projectDeleteButtonLogo);

    projectDeleteButton.addEventListener("click", (event) => {
        app.removeProject(project.id);
        triggerStateChangeEvent();
    });

    return projectDeleteButton;
}

function getProjectSummaryElement(project, app) {
    const PROJECT_SUMMARY_CONTAINER = "project-summary-container";
    const PROJECT_ACTION_CONTAINER_CLASSNAME = "project-action-container";
    const PROJECT_ACTION_BUTTON_CLASSNAME = "project-action-button";

    let projectSummary = document.createElement("div");
    projectSummary.classList.add(PROJECT_SUMMARY_CONTAINER);
    
    let projectTitleContainer = document.createElement("p");
    projectTitleContainer.textContent = project.title;

    let projectActionContainer = document.createElement("div");
    projectActionContainer.classList.add(PROJECT_ACTION_CONTAINER_CLASSNAME);

    if (project.isAlterable === true) {
        let projectEditModal = getProjectEditModal(project);
        projectSummary.appendChild(projectEditModal);
        let projectEditButton = getProjectEditButton(project, projectEditModal);
        projectEditButton.classList.add(PROJECT_ACTION_BUTTON_CLASSNAME);

        let projectDeleteButton = getProjectDeleteButton(project, app);
        projectDeleteButton.classList.add(PROJECT_ACTION_BUTTON_CLASSNAME);

        projectActionContainer.appendChild(projectEditButton);
        projectActionContainer.appendChild(projectDeleteButton);
    }

    projectSummary.appendChild(projectTitleContainer);
    projectSummary.appendChild(projectActionContainer);

    return projectSummary;
}

function getProjectInfoElement(project) {
    const TODO_CONTAINER_CLASSNAME = "todo-container";
    const PROJECT_INFO_CONTAINER_CLASSNAME = "project-info-container";

    const projectInfoContainer = document.createElement("div");
    projectInfoContainer.classList.add(PROJECT_INFO_CONTAINER_CLASSNAME)

    if (project.todoCollection.size > 0) {
        project.todoCollection.forEach(todo => {
            let todoContainerIt = document.createElement("div");
            todoContainerIt.classList.add(TODO_CONTAINER_CLASSNAME);
            todoContainerIt.textContent = todo.title;

            projectInfoContainer.appendChild(todoContainerIt);
        })
    } else {
        projectInfoContainer.textContent = "Nothing to do for this project."
    }

    return projectInfoContainer;
}

function getProjectElement(project, app) {
    const PROJECT_CONTAINER_CLASSNAME = "project-container";
    
    let projectContainer = new Expandable(
        getProjectSummaryElement(project, app),
        false,
        getProjectInfoElement(project)
    ).getElement();
    projectContainer.classList.add(PROJECT_CONTAINER_CLASSNAME);

    return projectContainer;
}


export { getProjectElement };

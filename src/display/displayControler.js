import { getProjectElement } from "#display/elements/projectElement/projectElement.js"
import { getProjectCreationButton } from "#display/elements/projectCreationButton/projectCreationButton.js";

import "./style.css"


class DisplayControler {
    #CONTENT_CONTAINER_CLASSNAME = "content-container";

    getContentContainer() {
        return document.querySelector(`.${this.#CONTENT_CONTAINER_CLASSNAME}`);
    }

    displayContent(app) {
        const PROJECT_CONTAINER_LIST_CLASSNAME = "project-list-container";
        const contentContainer = this.getContentContainer();
        
        const projectContainerList = document.createElement("div");
        projectContainerList.classList.add(PROJECT_CONTAINER_LIST_CLASSNAME);

        app.projectCollection.forEach(project => {
            const projectContainerIt = getProjectElement(project, app);
            projectContainerList.appendChild(projectContainerIt);
        });

        const projectCreationButton = getProjectCreationButton(app);

        contentContainer.appendChild(projectContainerList);
        contentContainer.appendChild(projectCreationButton);
    }

    clearContent() {
        const contentContainer = this.getContentContainer();

        while (contentContainer.firstChild) {
            contentContainer.removeChild(contentContainer.lastChild);
        }
    }

    refreshContent(app) {
        this.clearContent();
        this.displayContent(app);
    }
}


export { DisplayControler };

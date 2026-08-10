import "./style.css"


class DisplayControler {
    #CONTENT_CONTAINER_CLASSNAME = "content-container";
    
    #getContentContainer() {
        return document.querySelector(`.${this.#CONTENT_CONTAINER_CLASSNAME}`);
    }


    getProjectInfoElement(project) {
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

    getProjectElement(project) {
        const PROJECT_CONTAINER_CLASSNAME = "project-container";
        
        let projectContainer = document.createElement("details");
        projectContainer.classList.add(PROJECT_CONTAINER_CLASSNAME);

        let projectSummary = document.createElement("summary");
        projectSummary.textContent = project.title;

        projectContainer.appendChild(projectSummary);
        projectContainer.appendChild(this.getProjectInfoElement(project));
        return projectContainer;
    }

    getProjectListElement(app) {
        const PROJECT_CONTAINER_LIST_CLASSNAME = "project-list-container";
        const contentContainer = this.#getContentContainer();
        
        const projectContainerList = document.createElement("div");
        projectContainerList.classList.add(PROJECT_CONTAINER_LIST_CLASSNAME);

        app.projectCollection.forEach(project => {
            const projectContainerIt = this.getProjectElement(project);
            projectContainerList.appendChild(projectContainerIt);
        });

        contentContainer.appendChild(projectContainerList);
    }

    clearContent() {
        const contentContainer = this.#getContentContainer();

        while (contentContainer.firstChild) {
            contentContainer.removeChild(contentContainer.lastChild);
        }
    }

    displayContent(app) {
        this.clearContent();
        this.getProjectListElement(app);
    }
}


export { DisplayControler };

import { Project } from "#core/project/project.js";


class App {
    #projectCollection;

    #_defaultProjectTitle = "Default Project";
    #defaultProjectId;

    constructor() {
        this.projectCollection = new Map();
        const defaultProject = new Project(this.#_defaultProjectTitle);
        this.addProject(defaultProject);
        this.#defaultProjectId = defaultProject.id;
    }

    get projectCollection() {return this.#projectCollection;}

    set projectCollection(value) {
        if (!(value instanceof Map)) {
            throw new Error(
                `Invalid projectCollection: ${value}.` +
                ` ProjectCollection has to be of type Map, got ${typeof value}.`
            );
        }
        value.forEach((item) => {
                if (!(item instanceof Project)) {
                    throw new Error(
                        `Invalid projectCollection: ${value}.` +
                        ` ProjectCollection item has to be of type Project, got ${typeof item} for item ${item}.`
                    );
                }
            }
        );
        this.#projectCollection = value;
    }

    addProject(project) {
        const tmpProjectCollection = this.projectCollection;
        tmpProjectCollection.set(project.id, project);
        this.projectCollection = tmpProjectCollection;
    }

    removeProject(toRemoveProjectId) {
        if (toRemoveProjectId === this.#defaultProjectId) {
            throw new Error(
                `Invalid Project's Id: ${toRemoveProjectId}.` +
                ` Default Project can not be removed.`
            );
        }

        const tmpProjectCollection = this.projectCollection;
        tmpProjectCollection.delete[toRemoveProjectId];
        this.projectCollection = tmpProjectCollection;
    }
}

export { App };

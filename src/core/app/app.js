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
        this.#projectCollection = new Map(value);
    }

    addProject(project) {
        const projectIds = Array.from(this.projectCollection.keys());
        if (projectIds.includes(project.id)) {
            throw new Error(
                `Invalid project: ${project}.` +
                ` Collection already contains a project with id: ${project.id}.`
            );
        }

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
        const projectIds = Array.from(this.projectCollection.keys()).filter((projectId) => {return projectId != this.#defaultProjectId});
        if (!(projectIds.includes(toRemoveProjectId))) {
            throw new Error(
                `Unknown project's id: ${toRemoveProjectId}.` +
                ` Possible project's ids are: ${projectIds}.`
            );
        }

        const tmpProjectCollection = this.projectCollection;
        tmpProjectCollection.delete(toRemoveProjectId);
        this.projectCollection = tmpProjectCollection;
    }
}

export { App };

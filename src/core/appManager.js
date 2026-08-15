import { localRepository } from "#src/persistence/localStorage.js";
import { App } from "#core/app/app.js";


const LOCAL_STORAGE_APP_KEY = "todo_app";

class AppManager {
    #localRepository;
    #canAppBeSaved;

    constructor() {
        this.#localRepository = new localRepository();
        this.#canAppBeSaved = this.#localRepository.isLocalStorageAvailable;
    }

    isAppSaved() {
        return (this.#localRepository.load(LOCAL_STORAGE_APP_KEY) !== null);
    }

    getApp() {
        if (!(this.#canAppBeSaved)) {
            console.log("App can not be saved locally.");
        }
        let app;
        if (this.isAppSaved()) {
            let appDataObject = this.#localRepository.load(LOCAL_STORAGE_APP_KEY);
            app = App.fromDataObject(appDataObject);
        } else {
            app = new App();
            app.initDefaultProject();
        }
        return app;
    }

    saveApp(app) {
        if (!(this.#canAppBeSaved)) {
            console.log("App can not be saved locally.");
        }
        this.#localRepository.save(LOCAL_STORAGE_APP_KEY, app.toDataObject());
    }
}

export { AppManager };

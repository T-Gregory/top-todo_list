class localRepository {
    #isLocalStorageAvailable;

    constructor() {
        this.#isLocalStorageAvailable = this.#checkIfLocalStorageAvailable();
    }

    get isLocalStorageAvailable() { return this.#isLocalStorageAvailable; }

    #checkIfLocalStorageAvailable() {
        // from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        let storage;
        try {
            storage = window["localStorage"];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                storage &&
                storage.length !== 0
            );
        }
    }

    save(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }

    load(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export { localRepository };

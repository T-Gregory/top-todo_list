import { AppManager } from "#core/appManager.js"
import { DisplayControler } from "#display/displayControler.js";
import { STATE_CHANGE_EVENT_NAME } from "#display/event.js";


const appManager = new AppManager();
const app = appManager.getApp();
const displayControler = new DisplayControler();

function init() {
    document.addEventListener(STATE_CHANGE_EVENT_NAME, (event) => {
        displayControler.refreshContent(app);
        appManager.saveApp(app);
    });
    displayControler.refreshContent(app);
}

init();

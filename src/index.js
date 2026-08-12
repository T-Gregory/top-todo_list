import { App } from "#core/app/app.js";
import { Project } from "#core/project/project.js";
import { Todo } from "#core/todo/todo.js";
import { DisplayControler } from "#display/displayControler.js";
import { STATE_CHANGE_EVENT_NAME } from "#display/event.js";


const app = new App();
const displayControler = new DisplayControler();

function initData() {
    let customProject = new Project("Custom project");
    let customTodo = new Todo("Custom Todo");
    customProject.addTodo(customTodo);
    let customTodo2 = new Todo("Custom Todo 2");
    customProject.addTodo(customTodo2);
    app.addProject(customProject);
}


function init() {
    document.addEventListener(STATE_CHANGE_EVENT_NAME, (event) => {
        displayControler.refreshContent(app);
    });
    displayControler.refreshContent(app);
}

initData();
console.dir(app);

init();

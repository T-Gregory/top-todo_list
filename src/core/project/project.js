import { Todo } from "#core/todo/todo.js";

class Project {
    #id;
    #title;
    #todoCollection;
    #isAlterable;

    #titleLengthBottomBoundary = 3;
    #titleLengthTopBoundary = 25;

    constructor(title, todoCollection=new Map(), isAlterable=true) {
        this.#id = crypto.randomUUID();

        this.title = title;
        this.todoCollection = todoCollection;
        this.#isAlterable = isAlterable;
    }

    get id() {return this.#id;}

    get title() {return this.#title;}

    set title(value) {
        if (typeof value != "string") {
            throw new Error(
                `Invalid title: ${value}.` +
                ` Title has to be of type String, got ${typeof value}.`
            );
        }
        if (value.length < this.#titleLengthBottomBoundary || value.length > this.#titleLengthTopBoundary) {
            throw new Error(
                `Invalid title: ${value}.` +
                ` Title has to be between ${this.#titleLengthBottomBoundary} and ${this.#titleLengthTopBoundary} characters long.`
            );
        }
        if ((this.title !== undefined) && !(this.isAlterable)) {
            throw new Error(
                `Unable to change title for project: ${this}.` +
                ` Project can not be edited.`
            );
        }
        this.#title = value;
    }

    get isAlterable() {return this.#isAlterable;}

    get todoCollection() {return this.#todoCollection;}

    set todoCollection(value) {
        if (!(value instanceof Map)) {
            throw new Error(
                `Invalid todoCollection: ${value}.` +
                ` TodoCollection has to be of type Map, got ${typeof value}.`
            );
        }
        value.forEach((item) => {
                if (!(item instanceof Todo)) {
                    throw new Error(
                        `Invalid todoCollection: ${value}.` +
                        ` TodoCollection item has to be of type Todo, got ${typeof item} for item ${item}.`
                    );
                }
            }
        );
        this.#todoCollection = new Map(value);
    }

    addTodo(todo) {
        const todoIds = Array.from(this.todoCollection.keys());
        if (todoIds.includes(todo.id)) {
            throw new Error(
                `Invalid Todo: ${todo}.` +
                ` Collection already contains a todo with id: ${todo.id}.`
            );
        }

        const tmpTodoCollection = this.todoCollection;
        tmpTodoCollection.set(todo.id, todo);
        this.todoCollection = tmpTodoCollection;
    }

    removeTodo(toRemoveTodoId) {
        const todoIds = Array.from(this.todoCollection.keys());
        if (!(todoIds.includes(toRemoveTodoId))) {
            throw new Error(
                `Unknown Todo's Id: ${toRemoveTodoId}.` +
                ` Possible Todo's Ids are: ${todoIds}.`
            );
        }

        const tmpTodoCollection = this.todoCollection;
        tmpTodoCollection.delete(toRemoveTodoId);
        this.todoCollection = tmpTodoCollection;
    }
}

export { Project };

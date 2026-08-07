import { Todo } from "#core/todo/todo.js";

class Project {
    #id;
    #title;
    #todoCollection;

    #titleLengthBottomBoundary = 3;
    #titleLengthTopBoundary = 25;

    constructor(title, todoCollection=[]) {
        this.#id = crypto.randomUUID();

        this.title = title;
        this.todoCollection = todoCollection;
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
        this.#title = value;
    }

    get todoCollection() {return this.#todoCollection;}

    set todoCollection(value) {
        if (!(value instanceof Array)) {
            throw new Error(
                `Invalid todoCollection: ${value}.` +
                ` TodoCollection has to be of type Array, got ${typeof value}.`
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
        this.#todoCollection = value;
    }

    addTodo(todo) {
        if (!(todo instanceof Todo)) {
            throw new Error(
                `Invalid todo: ${todo}.` +
                ` Todo has to be of type Todo, got ${typeof todo}.`
            );
        }

        const tmpTodoCollection = this.todoCollection;
        tmpTodoCollection.push(todo);
        this.todoCollection = tmpTodoCollection;
    }

    removeTodo(toRemoveTodoId) {
        const todoIds = this.todoCollection.map((todo) => {return todo.id});
        if (!(todoIds.includes(toRemoveTodoId))) {
            throw new Error(
                `Unknown Todo's Id: ${toRemoveTodoId}.` +
                ` Possible Todo's Ids are: ${todoIds}.`
            );
        }
        this.todoCollection = this.todoCollection.filter((todo) => todo.id != toRemoveTodoId);
    }
}

export { Project };

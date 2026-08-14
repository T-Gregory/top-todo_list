class Todo {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;

    #titleLengthBottomBoundary = 3;
    #titleLengthTopBoundary = 25;
    #descriptionLengthTopBoundary = 1000;
    #priorityBottomBoundary = 1;
    #priorityLengthTopBoundary = 3;
    
    constructor(title, description=null, dueDate=null, priority=3) {
        this.#id = crypto.randomUUID();

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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

    get description() {return this.#description;}

    set description(value) {
        if (!(typeof value == "string" || value === null)) {
            throw new Error(
                `Invalid description: ${value}.` +
                ` Description has to be of type String or Null, got ${typeof value}.`
            );
        }
        if (
            typeof value == "string" &&
            value.length > this.#descriptionLengthTopBoundary
        ) {
            throw new Error(
                `Invalid description: ${value}.` +
                ` Description has to be less than ${this.#descriptionLengthTopBoundary}-character long.`
            );
        }
        this.#description = value;
    }

    get dueDate() {return this.#dueDate;}

    set dueDate(value) {
        if (!(value instanceof Date  || value === null)) {
            throw new Error(
                `Invalid dueDate: ${value}.` +
                ` DueDate has to be of type Date or Null, got ${typeof value}.`
            );
        }
        this.#dueDate = value;
    }

    get priority() {return this.#priority;}

    set priority(value) {
        if (!(typeof value === "number" || value === null)) {
            throw new Error(
                `Invalid priority: ${value}.` +
                ` Priority has to be of type Number or Null, got ${typeof value}.`
            );
        }
        if (
            typeof value === "number" && 
            value < this.#priorityBottomBoundary || value > this.#priorityLengthTopBoundary
        ) {
            throw new Error(
                `Invalid priority: ${value}.` +
                ` Priority has to be between ${this.#priorityBottomBoundary} and ${this.#priorityLengthTopBoundary}.`
            );
        }
        this.#priority = value;
    }
}

export { Todo };

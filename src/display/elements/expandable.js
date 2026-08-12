class Expandable {
    #isExpanded;
    #rootDiv;
    #dynamicDiv;

    constructor(rootDiv, isExpanded=false, dynamicDiv=null) {
        this.#rootDiv = rootDiv;
        this.#dynamicDiv = dynamicDiv;
        this.#isExpanded = isExpanded;
    }

    getElement() {
        let expandableElement = document.createElement("div");
        let rootDiv = this.#rootDiv;

        this.#rootDiv.addEventListener("click", (event) => {
            if (this.#isExpanded) {
                expandableElement.removeChild(this.#dynamicDiv);
            } else {
                expandableElement.appendChild(this.#dynamicDiv);
            }
            this.#isExpanded = !this.#isExpanded;
        })
        expandableElement.appendChild(this.#rootDiv);
        if (this.#isExpanded) {
            expandableElement.appendChild(this.#dynamicDiv);
        }

        return expandableElement;
    }
}


export { Expandable };

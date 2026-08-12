import "./style.css";


const INPUT_ITEM_CLASSNAME = "input-element";

function createFormInputItem(labelElement, InputElement) {
    const inputItem = document.createElement("div");
    inputItem.classList.add(INPUT_ITEM_CLASSNAME);

    inputItem.appendChild(labelElement);
    inputItem.appendChild(InputElement);

    return inputItem;
}


export { createFormInputItem };

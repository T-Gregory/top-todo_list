const STATE_CHANGE_EVENT_NAME = "state-change";

function triggerStateChangeEvent() {
    const event = new CustomEvent(STATE_CHANGE_EVENT_NAME, {});
    document.dispatchEvent(event);
}


export { STATE_CHANGE_EVENT_NAME, triggerStateChangeEvent };

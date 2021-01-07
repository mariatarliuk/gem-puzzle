const createElement = (tag, style, text = '') => {
    const element = document.createElement(tag);
    element.innerHTML = text;
    element.classList.add(style);
    return element;
}

export default createElement;
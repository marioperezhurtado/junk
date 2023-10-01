import { createEffect } from "./signals.js";

const isEvent = (k, v) => k.startsWith('on') && typeof v === 'function';
const eventName = (k) => k.toLowerCase().substr(2);
const isFunction = (tag) => typeof tag === 'function';
const isTextNode = (child) => typeof child === 'string' || typeof child === 'number';
const isEmpty = (child) => typeof child === 'undefined' || child === null || child === false;

export function createElement(tag, props, ...children) {
  // Custom component
  if (isFunction(tag)) {
    return tag({ ...props, children });
  }

  // Create DOM element with attributes
  const element = addAttributes(document.createElement(tag), props);

  // Append children
  children.flat().forEach((child) => {
    const node = isTextNode(child) ? document.createTextNode(child) : child;

    if (typeof child === 'function') {
      createEffect(() => createExpression(element, child));
    } else {
      if (node) element.appendChild(node);
    }
  });

  return element;
}

// Create expression
function createExpression(element, expression) {
  const result = expression();
  if (isEmpty(result)) {
    element.innerHTML = '';
    return;
  }

  if (isTextNode(result)) {
      element.textContent = result;
      return;
  }
    
  element.innerHTML = '';
  element.appendChild(result);
}

function addAttributes(element, props) {
  if (!props) return element;

  Object.entries(props).forEach(([k, v]) => {
    // Add event listener
    if (isEvent(k, v)) {
      element.addEventListener(eventName(k), v);
    } // Add class
    else if (k === 'className') {
      const classes = Array.isArray(v) ? v : [v];
      classes.forEach((c) => element.classList.add(c));
    } // Add other attribute
    else {
      element.setAttribute(k, v);
    }
  });

  return element;
}

export function Fragment(props) {
  if (Array.isArray(props.children)) {
    const fragment = document.createDocumentFragment();
    props.children.forEach((child) => fragment.appendChild(child));
    return fragment;
  }

  return props.children;
}

export function render(rootElement) {
  document.getElementById('root').appendChild(rootElement);
}

export * as Junk from "./render.js";

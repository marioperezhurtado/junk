import { createEffect } from "./signals.js";

const isEvent = (k, v) => k.startsWith('on') && typeof v === 'function';
const eventName = (k) => k.toLowerCase().substr(2);
const isFunction = (tag) => typeof tag === 'function';
const isTextNode = (child) => typeof child === 'string' || typeof child === 'number';
const isSomething = (child) => typeof child !== 'undefined' && child !== null && child !== false;

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

function createExpression(element, expression) {
  const result = expression();
  if (isSomething(result)) {
    if (isTextNode(result)) {
      element.innerHTML = result;
    } else {
      element.innerHTML = '';

      if (Array.isArray(result)) {
        const fragment = document.createDocumentFragment();
        result.forEach((child) => fragment.appendChild(child));
        element.appendChild(fragment);
      } else {
        element.appendChild(result);
      }
    }
  } else {
    element.innerHTML = '';
  }
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
    } // Add attribute
    else {
      element.setAttribute(k, v);
    }
  });

  return element;
}

export function Fragment(props) {
  return props.children;
}

export function render(rootElement) {
  if (Array.isArray(rootElement)) {
    const fragment = document.createDocumentFragment();
    rootElement.forEach((child) => fragment.appendChild(child));
    rootElement = fragment;
  }
  document.getElementById('root').appendChild(rootElement);
}

export * as Junk from "./render.js";

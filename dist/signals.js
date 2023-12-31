const context = [];

function getCurrentObserver() {
  return context[context.length - 1];
}

export function createSignal(value) {
  const subscribers = new Set();

  const read = () => {
    const current = getCurrentObserver();
    if (current) subscribers.add(current);
    return value;
  };
  const write = (newValue) => {
    value = newValue;
    subscribers.forEach((sub) => sub());
  };

  return [read, write];
}

export function createEffect(callback) {
  const execute = () => {
    context.push(execute);
    try {
      callback();
    } finally {
      context.pop();
    }
  };
  execute();
}

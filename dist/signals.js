var context = [];
function getCurrentObserver() {
  return context[context.length - 1];
}
export function createSignal(value) {
  var subscribers = new Set();
  var read = function() {
    var current = getCurrentObserver();
    if (current)
      subscribers.add(current);
    return value;
  };
  var write = function(newValue) {
    value = newValue;
    subscribers.forEach(function(sub) { return sub(); });
  };
  return [read, write];
}
export function createEffect(fn) {
  var execute = function() {
    context.push(execute);
    try {
      fn();
    }
    finally {
      context.pop();
    }
  };
  execute();
}

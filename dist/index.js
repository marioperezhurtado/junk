import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";
function Counter(props) {
  const [count, setCount] = createSignal(props.start);
  const [todos, setTodos] = createSignal(["Foo", "Bar", "Baz"]);
  function removeTodo(todo) {
    setTodos(todos().filter(t => t !== todo));
  }
  createEffect(() => console.log("Count is:", count()));
  return Junk.createElement("div", null, Junk.createElement("h1", null, "Count is: ", Junk.createElement("span", null, count)), Junk.createElement("button", {
    onClick: () => setCount(count() - 1)
  }, "-"), Junk.createElement("button", {
    onClick: () => setCount(count() + 1)
  }, "+"), Junk.createElement(Double, {
    count: count
  }), Junk.createElement("p", null, () => count() > 5 ? "Mayor a 5" : "Menor o igual a 5"), Junk.createElement("ul", null, () => todos().map(todo => Junk.createElement("li", null, todo, Junk.createElement("button", {
    onClick: () => removeTodo(todo)
  }, "Eliminar")))));
}
function Double(props) {
  const double = () => props.count() * 2;
  return Junk.createElement("h2", null, "Double is: ", Junk.createElement("span", null, double));
}
function App() {
  return Junk.createElement("div", null, Junk.createElement("h1", null, "Hello World"), Junk.createElement(Counter, {
    start: 0
  }));
}
Junk.render(Junk.createElement(App, null));
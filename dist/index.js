import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";
function Counter(props) {
  const [count, setCount] = createSignal(props.start);
  createEffect(() => console.log("Count is:", count()));
  return Junk.createElement("section", null, Junk.createElement("h1", null, "Count is: ", Junk.createElement("span", null, count)), Junk.createElement(Double, {
    count: count
  }), Junk.createElement("button", {
    onClick: () => setCount(count() - 1)
  }, "-"), Junk.createElement("button", {
    onClick: () => setCount(count() + 1)
  }, "+"));
}
function Double(props) {
  const double = () => props.count() * 2;
  return Junk.createElement("h2", null, "Double is: ", Junk.createElement("span", null, double));
}
function Todos() {
  const [todos, setTodos] = createSignal(["Foo", "Bar", "Baz"]);
  function removeTodo(todo) {
    setTodos(todos().filter(t => t !== todo));
  }
  return Junk.createElement("section", null, Junk.createElement("ul", null, () => todos().map(todo => Junk.createElement("li", null, todo, Junk.createElement("button", {
    onClick: () => removeTodo(todo)
  }, "Eliminar")))), Junk.createElement(AddTodo, {
    onAddTodo: todo => setTodos([...todos(), todo])
  }));
}
function AddTodo(props) {
  const [input, setInput] = createSignal("");
  function addTodo(e) {
    e.preventDefault();
    if (!input()) return;
    props.onAddTodo(input());
    setInput("");
    e.target.reset();
  }
  return Junk.createElement("form", {
    onSubmit: addTodo
  }, Junk.createElement("input", {
    type: "text",
    onInput: e => setInput(e.target.value)
  }), Junk.createElement("button", {
    type: "submit"
  }, "Add Todo"));
}
function App() {
  return Junk.createElement(Junk.Fragment, null, Junk.createElement("h1", null, "Hello World from Junk!"), Junk.createElement(Counter, {
    start: 0
  }), Junk.createElement(Todos, null));
}
Junk.render(Junk.createElement(App, null));
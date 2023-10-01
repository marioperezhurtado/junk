import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";
function Counter(props) {
  const [count, setCount] = createSignal(props.start);
  createEffect(() => console.log("Count is:", count()));
  return Junk.createElement("section", null, Junk.createElement("h1", null, "Count is: ", Junk.createElement("span", null, count)), Junk.createElement("p", null, () => count() > 5 ? "Greather than 5" : "Less or equal to 5"), Junk.createElement(Double, {
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
function App() {
  return Junk.createElement(Junk.Fragment, null, Junk.createElement("h1", null, "Hello World!"), Junk.createElement(Counter, {
    start: 0
  }));
}
Junk.render(Junk.createElement(App, null));
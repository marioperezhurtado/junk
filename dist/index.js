import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";
function Counter(props) {
  const [count, setCount] = createSignal(props.start);
  createEffect(() => console.log(`The count is ${count()}`));
  return Junk.createElement("div", null, Junk.createElement("h1", null, "Count is: ", Junk.createElement("span", null, count)), Junk.createElement("button", {
    onClick: () => setCount(count() + 1)
  }, "Click me!"), Junk.createElement(Double, {
    count: count
  }), count() > 5 && Junk.createElement("h2", null, "Count is greater than 5"));
}
function Double(props) {
  const double = () => props.count() * 2;
  createEffect(() => console.log(`Double is ${double()}`));
  return Junk.createElement("h2", null, "Double is ", Junk.createElement("span", null, double));
}
Junk.render(Junk.createElement("div", null, Junk.createElement("h1", {
  style: "color: blue;"
}, "Hello World"), Junk.createElement(Counter, {
  start: 0
})));
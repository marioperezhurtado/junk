import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";

function Counter(props) {
  const [count, setCount] = createSignal(props.start);

  createEffect(() => console.log(`The count is ${count()}`));

  return (
    <div>
      <h1>Count is: <span>{count}</span></h1>
      <button onClick={() => setCount(count() + 1)}>Click me!</button>
      <Double count={count} />
      {count() > 5 && <h2>Count is greater than 5</h2>}
    </div>
  );
}

function Double(props) {
  const double = () => props.count() * 2;

  createEffect(() => console.log(`Double is ${double()}`));

  return <h2>Double is <span>{double}</span></h2>;
}

Junk.render(
  <div>
    <h1 style="color: blue;">Hello World</h1>
    <Counter start={0} />
  </div>
);

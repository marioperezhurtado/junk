import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";

function Counter(props) {
  const [count, setCount] = createSignal(props.start);

  createEffect(() => console.log("Count is:", count()));

  return (
    <section>
      <h1>Count is: <span>{count}</span></h1>
      <p>{() => count() > 5 ? "Greather than 5" : "Less or equal to 5"}</p>
      <Double count={count} />
      <button onClick={() => setCount(count() - 1)}>-</button>
      <button onClick={() => setCount(count() + 1)}>+</button>
    </section>
  );
}

function Double(props) {
  const double = () => props.count() * 2;

  return <h2>Double is: <span>{double}</span></h2>;
}

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <Counter start={0} />
    </>
  );
}

Junk.render(<App />);

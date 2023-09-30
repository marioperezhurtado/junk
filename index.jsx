import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";

function Counter(props) {
  const [count, setCount] = createSignal(props.start);
  const [todos, setTodos] = createSignal(["Foo", "Bar", "Baz"]);

  function removeTodo(todo) {
    setTodos(todos().filter((t) => t !== todo));
  }

  createEffect(() => console.log("Count is:", count()));

  return (
    <div>
      <h1>Count is: <span>{count}</span></h1>
      <button onClick={() => setCount(count() - 1)}>-</button>
      <button onClick={() => setCount(count() + 1)}>+</button>
      <Double count={count} />
      <p>{() => count() > 5 ? "Mayor a 5" : "Menor o igual a 5"}</p>
      <ul>
        {() => todos().map((todo) => 
          <li>
            {todo}
            <button onClick={() => removeTodo(todo)}>Eliminar</button>
          </li>
        )}
      </ul>
    </div>
  );
}

function Double(props) {
  const double = () => props.count() * 2;

  return <h2>Double is: <span>{double}</span></h2>;
}

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Counter start={0} />
    </div>
  );
}

Junk.render(<App />);

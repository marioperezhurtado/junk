import { createSignal, createEffect } from "./signals.js";
import { Junk } from "./render.js";

function Counter(props) {
  const [count, setCount] = createSignal(props.start);

  createEffect(() => console.log("Count is:", count()));

  return (
    <section>
      <h1>Count is: <span>{count}</span></h1>
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

function Todos() {
  const [todos, setTodos] = createSignal(["Foo", "Bar", "Baz"]);

  function removeTodo(todo) {
    setTodos(todos().filter((t) => t !== todo));
  }

  return (
    <section>
      <ul>
        {() => todos().map((todo) =>
          <li>
            {todo}
            <button onClick={() => removeTodo(todo)}>Eliminar</button>
          </li>
        )}
      </ul>
      <AddTodo onAddTodo={(todo) => setTodos([...todos(), todo])} />
    </section>
  );
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

  return (
    <form onSubmit={addTodo}>
      <input type="text" onInput={(e) => setInput(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
}

function App() {
  return (
    <>
      <h1>Hello World from Junk!</h1>
      <Counter start={0} />
      <Todos />
    </>
  );
}

Junk.render(<App />);

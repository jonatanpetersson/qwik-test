import { $, component$, useContext, useRef, useStylesScoped$ } from "@builder.io/qwik";
import { ListItem } from "~/components/listItem/listitem";
import { Context, ContextType } from "~/context/context";
import './todo.css?inline';

export default component$(() => {
  // useStylesScoped$()
  const ctx = useContext(Context);
  const input = useRef<HTMLInputElement>();
  const todos = ContextType.Todos;

  const addTodo = $(() => ctx[todos] = [...ctx[todos], input.current!.value]);

  return (
    <>
    <div class="todo-form">
      <label htmlFor="todo-input">Write a todo</label>
      <input ref={ input } type="text" name="todo-input" id="todo-input" />
      <button onClick$={ addTodo }>
        Add to list
      </button>
    </div>
      { !!ctx[todos]?.length &&
        <ul>
          {ctx[todos].map((_, idx) => 
            <ListItem idx={ idx } ctxType={ todos } />
          )}
        </ul>
      }
    </>
  );
});
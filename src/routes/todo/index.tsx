import {
  $,
  component$,
  useContext,
  useRef,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Button } from '~/components/shared/button/button';
import { ListItem } from '~/components/shared/list-item/list-item';
import { Context, ContextType } from '~/context/context';
import styles from './todo.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const ctx = useContext(Context);
  const input = useRef<HTMLInputElement>();
  const todos = ContextType.Todos;

  const addTodo = $(() => (ctx[todos] = [...ctx[todos], input.current!.value]));

  return (
    <>
      <div class="todo-form">
        <label htmlFor="todo-input">Write a todo</label>
        <input ref={input} type="text" name="todo-input" id="todo-input" />
        <Button clickHandler={addTodo} label="ADD TO LIST" />
      </div>
      {!!ctx[todos]?.length && (
        <ul>
          {ctx[todos].map((_, idx) => (
            <ListItem idx={idx} ctxType={todos} />
          ))}
        </ul>
      )}
    </>
  );
});

import { $, component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { Context, ContextType } from '~/context/context';
import { Button } from '../button/button';
import styles from './list-item.css';

interface ListItemProps {
  ctxType: ContextType;
  idx: number;
}

export const ListItem = component$(({ ctxType, idx }: ListItemProps) => {
  useStylesScoped$(styles);
  const ctx = useContext(Context);
  const item: string = ctx[ctxType][idx];
  const deleteItem = $(
    () => (ctx[ctxType] = ctx[ctxType].filter((_, i) => i !== idx))
  );

  return (
    <li className={ctxType === ContextType.Todos ? 'todo-list-item' : ''}>
      {ctxType === ContextType.GithubRepos && (
        <a href={item} target="_blank">
          {item.split('/').at(-1)}
        </a>
      )}
      {ctxType === ContextType.Todos && (
        <>
          <span>{item}</span>
          <Button clickHandler={deleteItem} label="DELETE" />
        </>
      )}
    </li>
  );
});

import { $, component$, useContext } from "@builder.io/qwik";
import { Context, ContextType } from "~/context/context";

export const ListItem = component$(({ ctxType, idx }: { ctxType: ContextType, idx: number}) => {
  const ctx = useContext(Context);
  const item: string = ctx[ctxType][idx];
  const deleteItem = $(() => ctx[ctxType] = ctx[ctxType].filter((_, i) => i !== idx));

  return(
    <li>
      {ctxType === ContextType.GithubRepos &&     
          <a href={ item } target="_blank">{ item.split('/').at(-1) }</a>
      }
      {ctxType === ContextType.Todos && 
        <>        
          <span>{ item }</span>
          <button onClick$={ deleteItem }>Delete todo</button>
        </>
      }
    </li>
  )
});
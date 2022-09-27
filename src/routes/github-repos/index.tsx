import { $, component$, Resource, useContext, useRef, useResource$, useStore } from "@builder.io/qwik";
import { ListItem } from "~/components/listItem/listitem";
import { Context, ContextType } from "~/context/context";

export const mockData = [
  {name: 'random-1'},
  {name: 'random-2'},
  {name: 'random-3'},
  {name: 'random-4'},
  {name: 'random-5'},
  {name: 'random-6'},
  {name: 'random-7'},
  {name: 'random-8'},
  {name: 'random-9'},
  {name: 'random-10'},
];

export default component$(() => {
  const ctx = useContext(Context);
  const repos = ContextType.GithubRepos;
  const input = useStore({value: 'jonatanpetersson'});

  const setUserName = $((ev: KeyboardEvent) => input.value = (ev.target as HTMLInputElement).value);

  const reposResource = useResource$<string[]>(async ({ track, cleanup }) => {
    const userName = track(input, 'value')
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    // const res = await fetch(`https://api.github.com/users/${userName}/repos`, {
    //   signal: abortController.signal,
    // });
    const res: {name: string}[] = await new Promise((res, rej) => setTimeout(() => res(mockData)));
    // const repos = await (res as any).json();
    return res.map((r: any) => `https://github.com/${userName}/${r.name}`);
  });

  const onReposResourceResolved = (reposList: string[]) => {
    ctx[repos] = reposList;
    return <ul>{ ctx[repos].map((_, idx) => <ListItem idx={ idx } ctxType={ repos } />) }</ul>;
  }

  return (
    <>
      <label htmlFor="github-input">Github username</label>
      <input 
        type="text" 
        name="github-input" 
        id="github-input" 
        onKeyUp$={ setUserName } 
        value={ input.value }
      />
      <Resource
        value={reposResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load repos. Make sure the username is correct.</div>}
        onResolved={ onReposResourceResolved }
      />
    </>
  );
});
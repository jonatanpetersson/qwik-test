import {
  $,
  component$,
  Resource,
  useContext,
  useRef,
  useResource$,
  useStore,
} from '@builder.io/qwik';
import { ListItem } from '~/components/shared/list-item/list-item';
import { Context, ContextType } from '~/context/context';

export default component$(() => {
  const ctx = useContext(Context);
  const repos = ContextType.GithubRepos;
  const input = useStore({ value: 'jonatanpetersson' });

  const setUserName = $(
    (ev: KeyboardEvent) => (input.value = (ev.target as HTMLInputElement).value)
  );

  const reposResource = useResource$<string[]>(async ({ track, cleanup }) => {
    const userName = track(input, 'value');
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    const res = await new Promise((res) =>
      setTimeout(async () => {
        const result = await fetch(
          `https://api.github.com/users/${userName}/repos`,
          {
            signal: abortController.signal,
          }
        );
        res(result);
      }, 1000)
    );
    // const res = await fetch(`https://api.github.com/users/${userName}/repos`, {
    //   signal: abortController.signal,
    // });
    const repos = await (res as any).json();
    return repos.map((r: any) => `https://github.com/${userName}/${r.name}`);
  });

  const onReposResourceResolved = (reposList: string[]) => {
    ctx[repos] = reposList;
    return (
      <ul>
        {ctx[repos].map((_, idx) => (
          <ListItem idx={idx} ctxType={repos} />
        ))}
      </ul>
    );
  };

  return (
    <>
      <label htmlFor="github-input">Github username</label>
      <input
        type="text"
        name="github-input"
        id="github-input"
        onKeyUp$={setUserName}
        value={input.value}
      />
      <Resource
        value={reposResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => (
          <div>Failed to load repos. Make sure the username is correct.</div>
        )}
        onResolved={onReposResourceResolved}
      />
    </>
  );
});

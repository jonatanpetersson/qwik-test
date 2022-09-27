import { createContext } from "@builder.io/qwik";

type Context = { [value in ContextType]: string[] };

export enum ContextType {
  GithubRepos,
  Todos
}

export const Context = createContext<Context>('context');
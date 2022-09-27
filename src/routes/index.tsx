import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <p>Testing out Qwik by building some basic stuff. Routing, api calls, state management, shared components etc.</p>
      <p>In terms of DX it's very similar to React, this also uses JSX. But it comes with simplified syntax in many ways.</p>
      <p>Working with state for instance, there's no need for a setState function. A simple "state =" assignment is enough.</p>
      <p>I've only scratched the surface on the really powerful stuff like lazy loading and serializing,
        and this is where it seem to differ the most from React also DX-wise with a different life cycle and hooks.
      </p>
      <p>Also, the docs are absolutely amazing.</p>
    </>
  );
});
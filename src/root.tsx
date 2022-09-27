import { component$, useContextProvider, useStore } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { Head } from './components/head/head';
import { Context, ContextType } from './context/context';

import './global.css';
export default component$(() => {
  useContextProvider(Context, useStore({
    [ContextType.GithubRepos]: [],
    [ContextType.Todos]: [],
  }));
  return (
    <QwikCity>
      <head> {/* Keep head */}
        <meta charSet="utf-8" />
        <Head />
      </head>
      <body lang="en"> {/* Keep body */}
        <div className='main-wrapper'>
          <RouterOutlet />
        </div>
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
});

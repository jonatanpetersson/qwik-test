import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { GithubIcon } from '~/assets/icons/github-icon';
import { NoteIcon } from '~/assets/icons/note-icon';

export default component$(() => {

  return (
    <header>
      <h1><Link href="/">Just testing this real Qwik</Link></h1>
      <nav>
        <Link href="/github-repos"><GithubIcon /><p>Repo browser</p></Link>
        <Link href="/todo"><NoteIcon /><p>Todo</p></Link>
      </nav>
    </header>
  );
});

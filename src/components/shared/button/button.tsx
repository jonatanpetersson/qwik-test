import { component$, QRL, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button.css';

interface ButtonProps {
  clickHandler: QRL;
  label: string;
}

export const Button = component$(({ clickHandler, label }: ButtonProps) => {
  useStylesScoped$(styles);
  return <button onClick$={clickHandler}>{label}</button>;
});

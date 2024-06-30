import type { Action } from "svelte/action";

export const inView: Action<
    HTMLElement, 
    undefined, 
    { 
      'on:enter': (e: CustomEvent<{ observer: IntersectionObserver}>) => void,
      'on:leave': (e: CustomEvent<{ observer: IntersectionObserver}>) => void
    }
> = (node: HTMLElement) => {

    const observer = new IntersectionObserver((entries, _observer) => {
        entries.forEach((entry) => {
          node.dispatchEvent(new CustomEvent(entry.isIntersecting ? 'enter' : 'leave', {
            _observer
          }));
        });
    });

    observer.observe(node);

    return {
        destroy: () => {
            observer.disconnect();
        }
    }
}
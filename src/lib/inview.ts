import type { Action } from "svelte/action";

export const inView: Action<
    HTMLElement, 
    number, 
    { 
      'on:enter': (e: CustomEvent<undefined>) => void,
      'on:leave': (e: CustomEvent<undefined>) => void
    }
> = (node: HTMLElement, threshold: number = 0) => {
    const observer = new IntersectionObserver((entries, _observer) => {
        entries.forEach((entry) => {
          node.dispatchEvent(new CustomEvent(entry.isIntersecting ? 'enter' : 'leave'));
        });
    }, {
      threshold
    });

    observer.observe(node);

    return {
        destroy: () => {
            observer.disconnect();
        }
    }
}
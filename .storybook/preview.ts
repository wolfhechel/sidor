import type { Preview } from "@storybook/svelte";
import "$lib/root.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: 'centered',
    backgrounds: {
      grid: {
        cellSize: 20,
        opacity: 0.5,
        cellAmount: 5
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    grid: {
      gridOn: true,
      columns: 6,
      gap: '16px',
      gutter: '16px',
      maxWidth: '1024px',
    }
  },
};

export default preview;

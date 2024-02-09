# Layout

## Mobile
Page is width 100%
Menu is hidden under hamburger.
Feed preferences to the right side of the top bar
List of feeds is a tabbar at the top.

Actions are displayed at the bottom bar, post is a FAB.

## Table

Page is 600px wide
Menu is expanded on the left side of the page.
Feed preferences is missing?
List of feeds is a tabbar at the top.

Actions are expanded within the menu.
Post is a FAB.

## Desktop

Page is 600px wide
Menu is expanded on the left aligned towards the feed page.
Feed preferences is at the top right next to the feed label.
List of feeds is expanded on the left side.
Actions are expanded within the menu.
Post is a button under the menu.

## Implementation

## Breakpoints
Table: 800px
Desktop: 1300px

# Page
`max-width: 600px; width: 100%;`

# Menu is

# Page



# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

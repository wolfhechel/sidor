// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

// since the app is run statically in the browser we don't want 
// side-effects from server side rendering during development.
export const ssr = false;

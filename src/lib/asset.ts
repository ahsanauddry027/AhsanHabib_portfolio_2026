// Files in public/ are referenced through Vite's base URL, so the site works both at a domain root
// and under a sub-path such as https://<user>.github.io/<repo>/.
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

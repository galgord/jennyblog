# Mom Blog

A personal blog built with Vite and React.

## GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### How it works

1. The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys the site when changes are pushed to the `main` branch.
2. The site is built using Vite and deployed to the `gh-pages` branch.
3. GitHub Pages serves the content from the `gh-pages` branch.

### Manual deployment

If you prefer to deploy manually:

1. Build the project:
   ```
   npm run build
   ```

2. Push the contents of the `dist` folder to the `gh-pages` branch.

### Configuration

- The base path is configured in `vite.config.ts` to be `/momBlog/` in production.
- If you rename the repository, update the base path in `vite.config.ts` accordingly. 
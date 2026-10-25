# Publish a GitHub Pages preview

The workflow in `.github/workflows/pages.yml` deploys a noindex GitHub Pages preview from `main`. It does not configure `kalamartsstudio.com` or change DNS.

## Create the repository

1. In GitHub, choose **New repository** and name it `kalam-arts-studio-pages`. The shorter `kalam-arts-studio` name already belongs to your private Flask project; this preview must stay separate.
2. Choose **Public** and leave **Add README**, `.gitignore`, and license unchecked.
3. Create the repository.
4. Upload the current workspace contents. Include the site HTML pages, `styles.css`, `app.js`, `landing-pages.js`, `integrations.js`, `assets/`, `google-apps-script/`, `README.md`, `.gitignore`, `.nojekyll`, and `.github/workflows/pages.yml`.
5. Do not upload `static-site-preview.zip` or the duplicate `static-site-preview/` directory.
6. Commit the uploaded files to the `main` branch.

## Enable GitHub Pages

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open **Actions** and wait for **Publish GitHub Pages preview** to complete.
4. GitHub will show the preview URL, normally `https://<your-github-username>.github.io/kalam-arts-studio-pages/`.

The Pages workflow inserts `noindex, nofollow` into generated HTML and does not set a custom domain. Google Sheets/Gmail remain disconnected until the Apps Script endpoint is configured. Product data, inventory, payments, and live checkout are not available in this preview.

To update the preview, commit file changes to `main`; GitHub Actions will deploy again. Do not upload credentials or API secrets to the repository.

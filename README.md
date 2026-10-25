# KALAM ARTS STUDIO storefront preview

A responsive, no-build storefront prototype for KALAM ARTS STUDIO. Open `index.html` in a browser; the page does not require Node, a package install, or a development server.

## Current scope

- Editorial responsive homepage with collection browsing, portfolio, studio story, FAQ, contact and policy disclosures.
- Separate landing pages for Shop, six art collections, custom artwork, portfolio, About, workshops/projects and Contact. Shared page content and navigation are maintained in `landing-pages.js`.
- Working category filter, search, product detail dialog, and local persistent cart behavior for published catalogue entries.
- Custom enquiry forms share one transport: after Google Apps Script is deployed, submissions are saved to Google Sheets and notify the studio by Gmail; until configured, forms clearly offer WhatsApp instead.
- Google Apps Script backend starter is in `google-apps-script/Code.gs`, with setup instructions in `google-apps-script/SETUP.md`.
- Product records are in `app.js`. The current entries are unpublished placeholders with no prices, and therefore cannot be purchased or added to the cart.
- The Google backend is not live until its owner deploys it and enters the `/exec` URL in `integrations.js`. Order management, customer accounts, live inventory, payment processing, shipping calculation, and production checkout remain unavailable.

## Add verified catalogue products

In `app.js`, replace the placeholder objects in `catalogue` with confirmed product information. Set `published: true` only when the title, category, price in AED, description, availability and product image are accurate. A numeric price greater than zero is required for a product to be eligible for the cart. Images can be local relative paths, for example `assets/original-work-01.webp`; use descriptive alt text when adding image support.

The cart is stored in that browser's local storage for prototype testing. It is not an order system and is not shared with the studio.

## Launch readiness

Before launch, add real artwork photography; verify product details and prices; publish approved shipping, returns, privacy and terms policies; deploy and test the enquiry backend using `google-apps-script/SETUP.md`; configure a WordPress/WooCommerce store or another supported commerce backend; configure and test UAE delivery zones, tax treatment and payment gateway; and test the production enquiry and order notifications. Do not use this prototype to accept payments or promise delivery terms.

## Asset checklist

- Official logo image is included at `assets/kalam-arts-studio-logo.png` and displayed in the header using its original proportions and colors.
- Hero artwork or studio/process photograph, landscape and mobile crops.
- At least one verified image for each live collection and product, with detail/scale photos as available.
- Real portfolio images with approved captions; Instagram images supplied or connected using an authorized integration.
- Product names, categories, descriptions, prices in AED, dimensions, materials, care instructions and confirmed availability/lead times.
- Confirmed contact, delivery, return, privacy, terms, payment and tax information.

## WordPress handoff

The current implementation is a front-end concept only. The long-term preferred setup from the brief is a lightweight WordPress theme with WooCommerce, using WordPress product administration for editable catalogue entries and WooCommerce for inventory, cart, checkout, payment and orders. Confirm hosting and take a backup before any deployment; the existing domain currently serves a coming-soon page and no hosting or WordPress access has been verified here.

## GitHub Pages preview

The workflow in `.github/workflows/pages.yml` publishes a noindex preview from the `main` branch after GitHub Pages is enabled with **GitHub Actions** as its source. It uploads only the static website files and logo; it deliberately does not configure `kalamartsstudio.com`, change DNS, or publish the Python/Google backend. The preview requires a public GitHub repository for GitHub Pages on the free plan. See `CPANEL_STAGING.md` if you prefer a cPanel preview instead.

For repository creation and browser-based publishing steps, see `GITHUB_PUBLISH.md`.
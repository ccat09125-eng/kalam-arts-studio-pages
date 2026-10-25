# cPanel staging preview

The prepared `static-site-preview.zip` can be previewed on the current cPanel host without replacing the WordPress site or changing DNS.

## Upload a private preview

1. In the hosting panel, create and download a full account backup if available. At minimum, back up the current WordPress files and database using the host's documented backup process. Keep the backup outside `public_html`.
2. Open **File Manager** and go to `public_html`.
3. Create a folder named `preview`. Do not remove or rename the WordPress files.
4. Upload `static-site-preview.zip` into `public_html/preview` and extract it there. The HTML files, `styles.css`, scripts, `assets`, and `google-apps-script` folder should be directly inside `preview`; do not extract into an extra nested folder.
5. In `public_html/preview`, create `.htaccess` with:

```apache
Options -Indexes
<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow, noarchive"
</IfModule>
```

6. Open `https://kalamartsstudio.com/preview/index.html`. Check category links, the mobile menu, logo loading, and the contact pages. If the host's WordPress rewrite rules intercept `/preview`, ask the hosting provider to confirm the folder is served as a real directory; do not edit the root WordPress `.htaccess` without a backup.

## Preview limitations

- The preview does not connect Google Sheets/Gmail until an Apps Script `/exec` URL is configured in `integrations.js` and deployed by the account owner.
- Enquiry forms will say Google is not connected and offer a WhatsApp draft.
- Product data and artwork photography are placeholders; no purchase or payment is enabled.
- The `X-Robots-Tag` header is best-effort and depends on `mod_headers` being enabled by the host. Ask the host to confirm staging is not indexed if that protection is required.

## Before production promotion

Do not copy the preview over the WordPress document root yet. First supply verified products, photos, prices and policies; configure and test the Sheets/Gmail endpoint; confirm hosting backup and rollback; and decide whether the production site should remain WordPress/WooCommerce or move to the static preview. The static preview is not a replacement for production order management or payment processing.
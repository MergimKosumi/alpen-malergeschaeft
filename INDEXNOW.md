# IndexNow

After a successful `pages build and deployment` run on `main`, the read-only
`Notify IndexNow after Pages deployment` workflow validates the live key file,
sitemap and canonical URLs, then submits the sitemap URLs to IndexNow.
The workflow can also be run manually in GitHub Actions.

The ownership file at the website root is deliberately public; it is not a
GitHub credential or a Bing Webmaster Tools API token. Do not remove it while
this integration is active.

Run `python3 scripts/indexnow.py --dry-run` for local validation without a
notification. A response of 200 means received; 202 means key validation is
pending. Neither response guarantees crawling, ranking or indexing.

Only independent canonical pages belong in `sitemap.xml`. Current legacy HTML
routes redirect to sections of the homepage and must not be submitted as
separate content. Update the sitemap when real public pages are added.

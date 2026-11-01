# Codex brief — Alpen Malergeschäft GmbH

## Objective
Turn the current alpen-malergeschaeft.ch GitHub Pages website into a distinctive, polished Swiss Modern editorial website for a professional painting and surface-finishing company based in Pfäffikon ZH, Switzerland.

The new homepage is implemented in `index.html` and `swiss-modern.css` on the `design/swiss-modern-homepage` branch. Treat this as the initial art direction and iterate on it rather than reverting to a generic AI-generated template.

## Art direction
- Swiss Modern typography, editorial hierarchy, asymmetric spacing, deliberate layout, restrained blue accents, warm off-white, deep charcoal.
- Strong immersive photography, whitespace, fine rules, clear navigation. Avoid cards, gradients, glowing effects, shadows and dashboard-looking sections.
- Microinteractions should be subtle (600–900ms). Respect reduced-motion preferences.
- Start with the homepage, then make the interior pages feel like the same cohesive brand.

## What to build next
1. Visually QA the new homepage at 390px, 768px, 1280px and 1600px; correct overflow, image crop, navigation and headings. Test keyboard and reduced-motion behavior.
2. Convert `leistungen.html`, `referenzen.html`, `ueber-uns.html`, and `offerte-anfordern.html` from Webador-exported markup into clean, maintainable HTML using shared `swiss-modern.css` and consistent navigation/footer. Do this one page at a time, testing every step.
3. Retain actual company name, Pfäffikon ZH location, correct German (de-CH) text, and existing service categories: Malerarbeiten, Fassaden, Bodenbeschichtungen. Don't invent certifications, customer ratings, years of operation, prices, telephone numbers, emails, completed projects, client testimonials or before/after galleries.
4. The homepage includes clearly marked illustrative Unsplash imagery. Replace with genuine company photos when provided. Never misrepresent stock images as completed company projects.
5. Check that the offer/contact CTA actually works when the contact page is modernized. Prefer a legitimate email link or an explicitly configured form endpoint; do not build a pretend form that doesn't submit.
6. SEO: canonical domain `https://alpen-malergeschaeft.ch/`, correct metadata per page, semantic headings, sitemap if appropriate, descriptive alt text, privacy/legal footer links when confirmed.
7. Preserve `CNAME` unchanged. Do not introduce a paid website builder, unnecessary build system or monthly subscription.
8. Perform visual QA and link/image checks. Keep source clean, mobile-first, accessible and easy for the owner to update.

## Safety / deployment
- Don't push directly to `main` or change the live site without review. Use branches and pull requests.
- Do not remove existing working pages or features before replacing them.
- Do not change DNS, Hostpoint configuration, company contact data, or legal claims without confirmation.
- This repository appears to be a static snapshot exported from Webador, and the old pages reference external Webador scripts/styles. Replace such dependencies cautiously, verifying no lost features.
- The official brand logo should be used when available; the home currently uses a text-only AM placeholder.

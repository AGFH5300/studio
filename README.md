# STUDIO/AE

A production-oriented multi-page website for a UAE web design and digital systems studio. STUDIO/AE is a temporary working brand.

## Routes

- `/` — homepage
- `/work` — clearly labelled concept portfolio
- `/services` — capabilities and delivery approach
- `/pricing` — four package starting points and FAQ
- `/build` — client-side modular website estimator
- `/process` — delivery process and differentiation
- `/about` — studio positioning and principles
- `/contact` — estimator-aware project enquiry
- `/website-check` — clearly labelled simulated audit experience
- `/privacy` — prototype privacy and commercial terms

## Run

```bash
npm install
npm run dev
```

## Enquiry delivery

Create `.env.local` or configure equivalent deployment secrets:

```bash
RESEND_API_KEY=re_xxxxxxxxx
LEAD_TO_EMAIL=projects@example.com
LEAD_FROM_EMAIL="STUDIO/AE <website@your-verified-domain.ae>"
```

The contact API validates input, uses a honeypot, keeps the provider key server-side and returns an explicit configuration error when delivery is unavailable. Verify the sender domain in Resend before launch.

## Commercial estimator

The public UI never displays per-item add-on prices. Internal modular values generate only the final indicative estimate, so a one-page Signature design is priced by its actual scope rather than being forced to a package minimum. Dependencies such as Blog → CMS, Ecommerce → CMS + payments and Dashboard → Login are handled automatically.

## Before public launch

1. Replace the working brand and prototype hostname.
2. Configure the verified email sender and recipient.
3. Replace concept work as genuine client work becomes available.
4. Finalise company details, jurisdiction-specific legal text and analytics consent.
5. Add a production anti-spam service before paid acquisition campaigns.

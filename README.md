# STUDIO/AE website

A premium, conversion-focused UAE web studio site built with Next.js. The current name **STUDIO/AE** is intentionally treated as a working brand so it can be replaced before launch without changing the product structure.

## Included

- Premium responsive landing experience
- Four packages: AED 999 / 2,499 / 4,999 / 9,999+
- Interactive website cost calculator
- Pricing dependencies (for example Blog → CMS, Ecommerce → CMS + payments)
- Concept showcase cards clearly labelled so they do not pretend to be client work
- Services, process, FAQ and project enquiry sections
- SEO metadata + JSON-LD foundation
- Contact API route using Resend when environment variables are configured
- Mobile layouts

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact form environment variables

Create `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=hello@yourdomain.ae
CONTACT_FROM_EMAIL="Studio Website <hello@yourdomain.ae>"
```

For production, verify the sending domain with Resend first. Without these variables the form intentionally returns a configuration error instead of silently losing leads.

## Before launch

1. Replace the working brand `STUDIO/AE` and `https://example.ae` metadata URL.
2. Replace concept showcase work with genuine client work as projects are completed.
3. Add the final email/domain and verified Resend configuration.
4. Connect deployment (Vercel is the simplest fit for this stack).
5. Add privacy/cookie language appropriate to the tracking and tools actually enabled.
6. Consider rate limiting or Turnstile on the contact endpoint before paid traffic.

## Pricing logic

The public calculator is implemented in `lib/pricing.ts`. It uses an internal component model rather than arbitrary package guessing. Package recommendations are generated from page count and complexity, while the displayed calculator result remains an estimate until scope is confirmed.

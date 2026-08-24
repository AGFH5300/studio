export type DesignLevel = "professional" | "premium" | "animated" | "signature";

export type FeatureKey =
  | "cms"
  | "blog"
  | "payments"
  | "booking"
  | "ecommerce"
  | "crm"
  | "aiAssistant"
  | "aiQualifier"
  | "arabic"
  | "copywriting"
  | "rush";

export type CalculatorState = {
  pages: number;
  design: DesignLevel;
  features: Record<FeatureKey, boolean>;
};

export const designOptions: Record<DesignLevel, { label: string; price: number; note: string }> = {
  professional: { label: "Professional", price: 0, note: "Clean, sharp and conversion-focused" },
  premium: { label: "Premium", price: 499, note: "More art direction and richer layouts" },
  animated: { label: "Highly animated", price: 1199, note: "Scroll motion and premium interactions" },
  signature: { label: "Signature", price: 2499, note: "Bespoke creative direction and motion" },
};

export const featureOptions: Record<FeatureKey, { label: string; price: number; note: string }> = {
  cms: { label: "CMS / easy editing", price: 599, note: "Manage key website content without code" },
  blog: { label: "Blog / news", price: 349, note: "CMS-powered articles, categories and SEO metadata" },
  payments: { label: "Online payments", price: 449, note: "One standard payment gateway integration" },
  booking: { label: "Booking", price: 599, note: "One standard booking integration" },
  ecommerce: { label: "Ecommerce", price: 1999, note: "Starter Shopify commerce setup" },
  crm: { label: "CRM", price: 399, note: "Send website leads into one standard CRM" },
  aiAssistant: { label: "AI website assistant", price: 899, note: "AI answers based on approved business content" },
  aiQualifier: { label: "AI lead qualification", price: 1499, note: "AI captures and structures higher-quality enquiries" },
  arabic: { label: "Arabic / RTL", price: 0, note: "Adds RTL layout support; priced at 25% of project subtotal" },
  copywriting: { label: "Copywriting", price: 0, note: "Website copy at AED 199 per page" },
  rush: { label: "Priority delivery", price: 0, note: "Priority production; adds 25%" },
};

export type Quote = {
  subtotal: number;
  total: number;
  recommendedPlan: "Starter" | "Pro" | "Business" | "Signature";
  planPrice: number;
  savings: number;
  dependencies: string[];
};

export function calculateQuote(state: CalculatorState): Quote {
  const dependencies: string[] = [];
  let subtotal = 699;

  subtotal += Math.max(0, state.pages - 3) * 199;
  subtotal += designOptions[state.design].price;

  const active = { ...state.features };

  if (active.blog && !active.cms) {
    active.cms = true;
    dependencies.push("CMS added automatically because Blog / News needs editable content.");
  }

  if (active.ecommerce) {
    if (!active.cms) dependencies.push("CMS is included inside the Ecommerce module.");
    if (!active.payments) dependencies.push("A standard payment setup is included inside Ecommerce.");
    active.cms = false;
    active.payments = false;
  }

  (Object.keys(active) as FeatureKey[]).forEach((key) => {
    if (active[key]) subtotal += featureOptions[key].price;
  });

  if (active.copywriting) subtotal += state.pages * 199;
  if (active.arabic) subtotal *= 1.25;
  if (active.rush) subtotal *= 1.25;

  const total = Math.round(subtotal);

  const complexity =
    (state.design === "signature" ? 4 : state.design === "animated" ? 2 : state.design === "premium" ? 1 : 0) +
    (state.features.ecommerce ? 3 : 0) +
    (state.features.aiQualifier ? 3 : 0) +
    (state.features.aiAssistant ? 2 : 0) +
    (state.features.crm ? 1 : 0) +
    (state.features.arabic ? 1 : 0);

  let recommendedPlan: Quote["recommendedPlan"] = "Starter";
  let planPrice = 999;

  if (state.pages > 4 || state.features.cms || state.features.blog || state.features.booking || state.features.payments || complexity >= 2) {
    recommendedPlan = "Pro";
    planPrice = 2499;
  }
  if (state.pages > 7 || state.features.ecommerce || state.features.crm || state.features.aiAssistant || state.features.aiQualifier || complexity >= 4) {
    recommendedPlan = "Business";
    planPrice = 4999;
  }
  if (state.pages > 15 || state.design === "signature" || complexity >= 7) {
    recommendedPlan = "Signature";
    planPrice = 9999;
  }

  return {
    subtotal: Math.round(subtotal),
    total,
    recommendedPlan,
    planPrice,
    savings: Math.max(0, total - planPrice),
    dependencies,
  };
}

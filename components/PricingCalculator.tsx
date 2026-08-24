"use client";

import { useMemo, useState } from "react";
import {
  calculateQuote,
  CalculatorState,
  DesignLevel,
  designOptions,
  featureOptions,
  FeatureKey,
} from "@/lib/pricing";

const initialFeatures: CalculatorState["features"] = {
  cms: false,
  blog: false,
  payments: false,
  booking: false,
  ecommerce: false,
  crm: false,
  aiAssistant: false,
  aiQualifier: false,
  arabic: false,
  copywriting: false,
  rush: false,
};

const featureGroups: { label: string; keys: FeatureKey[] }[] = [
  { label: "Content", keys: ["cms", "blog", "copywriting", "arabic"] },
  { label: "Sell & book", keys: ["payments", "booking", "ecommerce"] },
  { label: "Business", keys: ["crm", "aiAssistant", "aiQualifier", "rush"] },
];

function money(value: number) {
  return new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(value);
}

export default function PricingCalculator() {
  const [state, setState] = useState<CalculatorState>({
    pages: 7,
    design: "premium",
    features: { ...initialFeatures, cms: true, blog: true },
  });

  const quote = useMemo(() => calculateQuote(state), [state]);

  function toggleFeature(key: FeatureKey) {
    setState((current) => ({
      ...current,
      features: { ...current.features, [key]: !current.features[key] },
    }));
  }

  return (
    <div className="calculator-shell">
      <div className="calculator-controls">
        <div className="calc-step">
          <span className="eyebrow">01 / SIZE</span>
          <div className="calc-heading-row">
            <h3>How many pages?</h3>
            <strong>{state.pages}</strong>
          </div>
          <input
            className="range"
            type="range"
            min="1"
            max="25"
            value={state.pages}
            onChange={(event) => setState((s) => ({ ...s, pages: Number(event.target.value) }))}
            aria-label="Number of website pages"
          />
          <div className="range-labels"><span>1</span><span>25+</span></div>
        </div>

        <div className="calc-step">
          <span className="eyebrow">02 / DESIGN</span>
          <h3>Choose the creative level.</h3>
          <div className="choice-grid">
            {(Object.entries(designOptions) as [DesignLevel, (typeof designOptions)[DesignLevel]][]).map(([key, option]) => (
              <button
                type="button"
                key={key}
                className={`choice-card ${state.design === key ? "selected" : ""}`}
                onClick={() => setState((s) => ({ ...s, design: key }))}
              >
                <span>{option.label}</span>
                <small>{option.note}</small>
                <b>{option.price ? `+ AED ${money(option.price)}` : "Included"}</b>
              </button>
            ))}
          </div>
        </div>

        <div className="calc-step">
          <span className="eyebrow">03 / FEATURES</span>
          <h3>Add what your business actually needs.</h3>
          {featureGroups.map((group) => (
            <div className="feature-group" key={group.label}>
              <span className="feature-group-title">{group.label}</span>
              <div className="feature-list">
                {group.keys.map((key) => {
                  const feature = featureOptions[key];
                  const selected = state.features[key];
                  return (
                    <button
                      type="button"
                      className={`feature-row ${selected ? "selected" : ""}`}
                      onClick={() => toggleFeature(key)}
                      key={key}
                    >
                      <span className="feature-check">{selected ? "✓" : "+"}</span>
                      <span className="feature-copy"><b>{feature.label}</b><small>{feature.note}</small></span>
                      <span className="feature-price">{feature.price ? `+${money(feature.price)}` : "Variable"}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="quote-card">
        <span className="eyebrow">LIVE ESTIMATE</span>
        <h3>Your build.</h3>
        <div className="quote-specs">
          <span>{state.pages} pages</span>
          <span>{designOptions[state.design].label} design</span>
          {(Object.keys(state.features) as FeatureKey[]).filter((key) => state.features[key]).slice(0, 5).map((key) => (
            <span key={key}>{featureOptions[key].label}</span>
          ))}
        </div>

        <div className="estimate-line">
          <span>Individual estimate</span>
          <strong>AED {money(quote.total)}</strong>
        </div>

        <div className="recommended-plan">
          <span>Recommended</span>
          <h4>{quote.recommendedPlan}</h4>
          <p>From</p>
          <div className="plan-price">AED {money(quote.planPrice)}</div>
          {quote.savings > 0 && <div className="saving">Potential bundle saving AED {money(quote.savings)}</div>}
        </div>

        {quote.dependencies.length > 0 && (
          <div className="dependency-note">
            {quote.dependencies.map((note) => <p key={note}>{note}</p>)}
          </div>
        )}

        <a className="button button-light full" href="#contact">Get this scoped properly <span>↗</span></a>
        <small className="estimate-disclaimer">Instant estimate only. Final scope is confirmed before any deposit is taken.</small>
      </aside>
    </div>
  );
}

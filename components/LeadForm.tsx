"use client";

import { FormEvent, useState } from "react";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-grid">
        <label><span>Name</span><input required name="name" placeholder="Your name" /></label>
        <label><span>Company</span><input name="company" placeholder="Company name" /></label>
        <label><span>Email</span><input required type="email" name="email" placeholder="you@company.com" /></label>
        <label><span>Phone</span><input name="phone" placeholder="+971" /></label>
      </div>
      <label><span>What are we building?</span><textarea required name="message" rows={5} placeholder="Tell us about the website, timeline and what you want it to achieve." /></label>
      <div className="form-footer">
        <button className="button button-light" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Sending…" : "Start a project"} <span>↗</span>
        </button>
        {status === "sent" && <p className="form-status success">Received. We’ll be in touch.</p>}
        {status === "error" && <p className="form-status">Couldn’t send yet. Check the contact API configuration.</p>}
      </div>
    </form>
  );
}

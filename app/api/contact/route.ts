import { NextResponse } from "next/server";

function clean(value: unknown, max = 4000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.website)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const company = clean(body.company, 200);
    const phone = clean(body.phone, 100);
    const message = clean(body.message, 5000);

    if (!name || !email || !message || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "Studio Website <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.info("Contact form submission", { name, email, company, phone, message });
      return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New website enquiry — ${company || name}`,
        text: `Name: ${name}\nCompany: ${company || "—"}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend error", error);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

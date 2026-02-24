// ======= Helpers ======
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ======= Bulk Newsletter Handler =======
export async function onRequestPost(context) {
  const { request, env } = context;
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { subscribers, title, html } = data;
  if (!Array.isArray(subscribers) || subscribers.length === 0) {
    return new Response(JSON.stringify({ error: "No subscribers provided" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  if (!title || !html) {
    return new Response(JSON.stringify({ error: "Title or HTML message missing" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "Resend API key not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  const results = [];
  for (const sub of subscribers) {
    if (!validateEmail(sub.email)) {
      results.push({ email: sub.email, status: "invalid_email" });
      continue;
    }

    const personalizedHtml = html.replaceAll("{{name}}", escapeHtml(sub.name || "Subscriber"));

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Volasec Newsletters <newsletter@services.volasec.com>",
          to: sub.email,
          subject: title,
          html: personalizedHtml,
        }),
      });
      if (res.ok) {
        results.push({ email: sub.email, status: "sent" });
      } else {
        const text = await res.text();
        results.push({ email: sub.email, status: "failed", details: text });
      }
    } catch (err) {
      results.push({ email: sub.email, status: "error", details: err.message });
    }
  }

  return new Response(JSON.stringify({ success: true, results }), { status: 200, headers: { "Content-Type": "application/json" } });
}
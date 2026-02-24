export async function onRequestPost(context) {
  const { request, env } = context;
  const { email, title, html } = await request.json();

  if (!email || !title || !html) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Resend API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Volasec Test <newsletter@services.volasec.com>",
        to: email,
        subject: title,
        html,
      }),
    });
    if (res.ok) {
      return new Response(JSON.stringify({ status: "sent" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const text = await res.text();
      return new Response(JSON.stringify({ status: "failed", error: text }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ status: "error", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

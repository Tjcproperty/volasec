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

  const LOGO_URL = "https://volasec.com/assets/logo.png"; // ← your actual logo URL
  const SITE_URL = "https://volasec.com"; // ← your actual site URL
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
    return new Response(JSON.stringify({ error: "No subscribers provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!title || !html) {
    return new Response(
      JSON.stringify({ error: "Title or HTML message missing" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  if (!env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Resend API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const results = [];
  for (const sub of subscribers) {
    if (!validateEmail(sub.email)) {
      results.push({ email: sub.email, status: "invalid_email" });
      continue;
    }

    const personalizedHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0;padding:0;background-color:#F1F2F2;">
  <table width="100%" bgcolor="#F1F2F2" cellpadding="0" cellspacing="0" border="0" style="padding:24px 0;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:680px;border-radius:18px;overflow:hidden;border:1px solid rgba(14,26,43,0.08);" bgcolor="#ffffff" cellpadding="0" cellspacing="0">
          
          <tr>
            <td align="center" style="padding:24px;border-bottom:1px solid rgba(14,26,43,0.08);" bgcolor="#ffffff">
              <img src="${LOGO_URL}" alt="Volasec" width="120" height="28"/>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#0E1A2B;" bgcolor="#ffffff">
              ${html.replaceAll("{{name}}", escapeHtml(sub.name || "Subscriber"))}
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:24px;font-size:12px;color:rgba(14,26,43,0.5);border-top:1px solid rgba(14,26,43,0.08);" bgcolor="#ffffff">
              © ${new Date().getFullYear()} Volasec. All rights reserved.<br/>
              <a href="${SITE_URL}" target="_blank" style="color:#0E1A2B;text-decoration:none;font-weight:600;">Visit Website</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
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

  return new Response(JSON.stringify({ success: true, results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

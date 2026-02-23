
// ======= Helpers =======
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

// ======= API Handler =======
export async function onRequestPost(context) {
    console.log("🔥 subscribe function running");
  const { request, env } = context;

  const { email, token } = await request.json();

  if (!email || !token) {
    return new Response(JSON.stringify({ error: "Missing email or token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const confirmUrl = `https://volasec.com/confirm?token=${token}`;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Volasec <newsletter@volasec.com>",
        to: email,
        subject: "Confirm your subscription — Volasec",
        html: `<a href="${confirmUrl}">Confirm Subscription</a>`,
      }),
    });

    if (!resendRes.ok) {
      throw new Error("Resend API failed");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// ======= Confirmation Email HTML =======
function confirmationEmailHtml({ confirmUrl }) {
  const SITE_URL = "https://volasec.com";
  const LOGO_URL = "https://volasec.com/monologo.png";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm Subscription</title>
</head>
<body style="margin:0;padding:0;background:#F1F2F2;font-family:Helvetica,Arial,sans-serif;color:#0C0C0C;">
  <div style="padding:24px;">
    <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;">
      
      <!-- Header -->
      <div style="padding:18px 22px;background:#0E1A2B;text-align:center;">
        <img src="${LOGO_URL}" alt="Volasec Logo" height="22" />
      </div>

      <!-- Body -->
      <div style="padding:28px;text-align:center;">
        <h1 style="font-size:22px;font-weight:900;margin:0 0 12px;">Confirm Your Subscription</h1>
        <p style="font-size:14px;line-height:1.7;margin-bottom:18px;">
          Click the button below to confirm your email and start receiving exclusive security insights from Volasec.
        </p>
        <a href="${escapeHtml(confirmUrl)}"
           style="display:inline-block;padding:14px 28px;background:#0E1A2B;color:#fff;text-decoration:none;border-radius:999px;font-weight:800;font-size:14px;">
          Confirm Subscription
        </a>
      </div>

      <!-- Footer -->
      <div style="padding:16px;text-align:center;font-size:12px;color:#666;">
        © ${new Date().getFullYear()} Volasec — <a href="${SITE_URL}" target="_blank" style="color:#666;text-decoration:underline;">${SITE_URL}</a>
      </div>

    </div>
  </div>
</body>
</html>
`;
}

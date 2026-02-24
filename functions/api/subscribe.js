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

// ======= API Handler =======
export async function onRequestPost(context) {
  const { request, env } = context;
  console.log("🔥 subscribe function running");

  let data;
  try {
    data = await request.json();
  } catch (e) {
    console.log("❌ Invalid JSON body:", e);
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, token } = data;

  if (!email || !token) {
    console.log("❌ Missing email or token");
    return new Response(JSON.stringify({ error: "Missing email or token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!validateEmail(email)) {
    console.log("❌ Invalid email format:", email);
    return new Response(JSON.stringify({ error: "Invalid email format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("RESEND KEY EXISTS:", !!env.RESEND_API_KEY);

  const confirmUrl = `https://volasecj.pages.dev/confirm?token=${token}`;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Volasec Newsletters <newsletter@services.volasec.com>",
        to: email,
        subject: "Confirm your newsletter subscription — Volasec",
        html: confirmationEmailHtml({ confirmUrl }), // ← CALL the function here
      }),
    });

    const text = await resendRes.text();
    console.log("Resend API response status:", resendRes.status);
    console.log("Resend API response body:", text);

    if (!resendRes.ok) {
      return new Response(
        JSON.stringify({ error: "Resend API failed", details: text }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("❌ Fetch error:", err);
    return new Response(
      JSON.stringify({ error: "Email failed", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// ======= Confirmation Email HTML =======
function confirmationEmailHtml({ confirmUrl }) {
  const SITE_URL = "https://volasec.com";
  const LOGO_URL = "https://volasecj.pages.dev/monologo.png";

  return `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm Subscription</title>
</head>

<body style="margin:0;padding:0;background:#F3F5F7;font-family:Helvetica,Arial,sans-serif;color:#0E1A2B;">

  <div style="padding:40px 20px;">
    <div style="max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid rgba(14,26,43,0.08);border-radius:16px;overflow:hidden;">

      <!-- HEADER -->
      <div style="padding:26px 28px;border-bottom:1px solid rgba(14,26,43,0.06);background:#FFFFFF;">
        <img src="https://volasecj.pages.dev/monoblue.png" alt="Volasec Logo" height="22" />
      </div>

      <!-- BODY -->
      <div style="padding:48px 40px;">

        <div style="width:60px;height:3px;background:#0E1A2B;margin-bottom:28px;"></div>

        <h1 style="font-size:26px;font-weight:800;letter-spacing:-0.5px;margin:0 0 18px 0;color:#0E1A2B;">
          Confirm your subscription
        </h1>

        <p style="font-size:15px;line-height:1.7;color:rgba(14,26,43,0.75);margin-bottom:32px;max-width:520px;">
          You requested access to Volasec security intelligence.  
          Please confirm your email address to begin receiving cloud security insights engineered for enterprise environments.
        </p>

        <a href="${escapeHtml(confirmUrl)}"
           style="display:inline-block;padding:14px 30px;background:#0E1A2B;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.8px;border-radius:999px;">
           Confirm Subscription
        </a>

        <p style="margin-top:36px;font-size:12px;color:rgba(14,26,43,0.55);max-width:480px;">
          If you did not request this subscription, you can safely ignore this email.
        </p>

      </div>

      <!-- FOOTER -->
      <div style="padding:20px 28px;border-top:1px solid rgba(14,26,43,0.06);font-size:12px;color:rgba(14,26,43,0.5);background:#FAFBFC;">
        © ${new Date().getFullYear()} Volasec<br/>
        <a href="${SITE_URL}" target="_blank" style="color:#0E1A2B;text-decoration:none;font-weight:600;">
          ${SITE_URL}
        </a>
      </div>

    </div>
  </div>

</body>
</html>
`;
}

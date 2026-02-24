export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, company, message } = body || {};

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        error: "Missing required fields",
        message: "name, email, and message are required.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const CAL_URL = env.VOLASEC_CAL_URL;
  const TO = env.VOLASEC_CONTACT_TO;
  const FROM = "Volasec Contact <contact@services.volasec.com>";

  const inboxSubject = `New Contact Request — ${name}${company ? ` (${company})` : ""}`;
  const autoReplySubject = "We got your message — Volasec";

  try {
    // 1️⃣ Send to inbox
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: email,
        subject: inboxSubject,
        html: inboxEmailHtml({ name, email, company, message }),
      }),
    });

    // 2️⃣ Auto reply
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: email,
        subject: autoReplySubject,
        html: autoReplyHtml({ name, CAL_URL }),
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to send message",
        message: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

function inboxEmailHtml({ name, email, company, message }) {
  const SITE_URL = "https://volasec.com";
  const LOGO_URL = "https://volasecj.pages.dev/monoblue.png";
  const SUPPORT_HOURS = "Monday – Friday, 9:00 AM – 5:00 PM (GMT)";

  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Volasec Contact Request</title>
 <style>
  body{
    margin:0;
    padding:0;
    background:#F1F2F2;
    font-family:Helvetica,Arial,sans-serif;
    color:#0C0C0C;
  }
  table{border-collapse:collapse;}
  img{display:block;border:0;outline:none;}
  .wrap{width:100%;padding:24px 12px;}
  .card{
    max-width:680px;
    margin:0 auto;
    background:#FFFFFF; /* white background */
    border:1px solid rgba(14,26,43,0.08);
    border-radius:18px;
    overflow:hidden;
  }
  .head{
    padding:18px 22px;
    border-bottom:1px solid rgba(14,26,43,0.08);
  }
  .pill{
    font-size:11px;
    letter-spacing:.18em;
    text-transform:uppercase;
    padding:8px 12px;
    border-radius:999px;
    border:1px solid rgba(12,12,12,.18);
    background:rgba(12,12,12,.06);
    color:#0C0C0C;
  }
  .p{padding:22px;}
  .label{
    font-size:12px;
    letter-spacing:.14em;
    text-transform:uppercase;
    color:rgba(12,12,12,.45);
    margin-bottom:8px;
  }
  .value{
    font-size:15px;
    line-height:1.65;
    color:#0C0C0C;
  }
  .row{
    padding:14px 0;
    border-bottom:1px solid rgba(241,242,242,0.75);
  }
  .row:last-child{border-bottom:none;}
  .msg{
    margin-top:10px;
    padding:16px;
    border-radius:14px;
    background:#F9F9F9; /* subtle white shade */
    border:1px solid rgba(12,12,12,.08);
    white-space:pre-wrap;
  }
  .muted{
    color:rgba(12,12,12,.55);
    font-size:12px;
    line-height:1.6;
  }
  .foot{
    padding:16px 22px;
    border-top:1px solid rgba(241,242,242,0.75);
    text-align:center;
  }
  a{color:#0C0C0C;text-decoration:none;font-weight:700;}
</style>
</head>
<body>
  <table class="wrap" width="100%" role="presentation">
    <tr>
      <td align="center">
        <table class="card" width="100%" role="presentation">
          <tr>
            <td class="head">
              <table width="100%" role="presentation">
                <tr>
                  <td align="left">
                    <img src="${LOGO_URL}" alt="Volasec" height="22" />
                  </td>
                  <td align="right">
                    <span class="pill">New contact request</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="p">
              <div class="row">
                <div class="label">Name</div>
                <div class="value">${escapeHtml(name)}</div>
              </div>

              <div class="row">
                <div class="label">Email</div>
                <div class="value">${escapeHtml(email)}</div>
              </div>

              <div class="row">
                <div class="label">Company</div>
                <div class="value">${escapeHtml(company || "—")}</div>
              </div>

              <div class="row">
                <div class="label">Message</div>
                <div class="msg">${escapeHtml(message)}</div>
              </div>

              <p class="muted" style="margin-top:14px;">
                Replying to this email will reply directly to the sender (Reply-To is set).
              </p>
            </td>
          </tr>

          <tr>
            <td class="foot">
              <div class="muted">
                <a href="${SITE_URL}" target="_blank" rel="noreferrer">${SITE_URL}</a><br/>
                Support hours: ${SUPPORT_HOURS}<br/>
                Please avoid sharing sensitive credentials over email.
              </div>
            </td>
          </tr>
        </table>

        <p class="muted" style="margin-top:14px;">
          © ${new Date().getFullYear()} Volasec. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function autoReplyHtml({ name, CAL_URL }) {
  const LOGO_URL = "https://volasecj.pages.dev/monoblue.png";
  const SUPPORT_HOURS = "Monday – Friday, 9:00 AM – 5:00 PM (GMT)";
  const safeCal = CAL_URL || "https://cal.com/james-moyosore-quqdc8/30min";

  return `
<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Message Received</title>
</head>

<body style="margin:0;padding:0;background:#F1F2F2;font-family:Helvetica,Arial,sans-serif;color:#0C0C0C;">
  <div style="padding:40px 20px;">
    <div style="max-width:700px;margin:0 auto;background:#FFFFFF;border:1px solid rgba(14,26,43,0.08);border-radius:18px;overflow:hidden;">
      
      <!-- Header -->
      <div style="padding:28px;text-align:center;border-bottom:1px solid rgba(14,26,43,0.08);">
        <img src="${LOGO_URL}" height="22" alt="Volasec"/>
      </div>

      <!-- Body -->
      <div style="padding:50px 40px;background:#FFFFFF;">
        <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(12,12,12,0.75);margin-bottom:16px;">
          Inquiry Received
        </p>

        <h1 style="font-size:26px;font-weight:900;margin:0 0 20px 0;">
          Thank you, ${escapeHtml(name)}.
        </h1>

        <p style="font-size:15px;line-height:1.8;color:rgba(12,12,12,0.85);max-width:500px;">
          Your message has been received. A member of the Volasec team will respond within 24 hours.
        </p>

        <a href="${escapeHtml(safeCal)}"
           style="display:inline-block;margin-top:28px;padding:14px 28px;border:2px solid #0C0C0C;color:#0C0C0C;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:1px;border-radius:6px;">
           BOOK STRATEGY CALL
        </a>

        <p style="margin-top:40px;font-size:12px;color:rgba(12,12,12,0.75);max-width:460px;">
          Do not share sensitive credentials via email. Secure channels will be provided if required.
        </p>
      </div>

      <!-- Footer -->
      <div style="padding:20px;text-align:center;font-size:12px;color:rgba(12,12,12,0.75);border-top:1px solid rgba(14,26,43,0.08);">
        © ${new Date().getFullYear()} Volasec<br/>
        Support hours: ${SUPPORT_HOURS}
      </div>
    </div>
  </div>
</body>
</html>
`;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

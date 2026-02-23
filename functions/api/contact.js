
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
  const FROM = "Volasec <contact@volasec.com>";

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
  const LOGO_URL = "https://volasec.com/monologo.png"; // ✅ absolute URL
  const SUPPORT_HOURS = "Monday – Friday, 9:00 AM – 5:00 PM (GMT)";

  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Volasec Contact Request</title>
  <style>
    body{margin:0;padding:0;background:#F1F2F2;font-family:Helvetica,Arial,sans-serif;color:#0C0C0C;}
    table{border-collapse:collapse;}
    img{display:block;border:0;outline:none;}
    .wrap{width:100%;padding:24px 12px;}
    .card{max-width:680px;margin:0 auto;background:#fff;border:1px solid rgba(14,26,43,.16);border-radius:18px;overflow:hidden;}
    .head{padding:18px 22px;background:linear-gradient(180deg, rgba(12,12,12,.96), rgba(14,26,43,.92));border-bottom:1px solid rgba(241,242,242,.12);}
    .pill{font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:8px 12px;border-radius:999px;border:1px solid rgba(241,242,242,.18);background:rgba(241,242,242,.06);color:#F1F2F2;white-space:nowrap;}
    .p{padding:22px;}
    .label{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(12,12,12,.58);margin-bottom:8px;}
    .value{font-size:15px;line-height:1.65;color:#0C0C0C;}
    .row{padding:14px 0;border-bottom:1px solid rgba(14,26,43,.10);}
    .row:last-child{border-bottom:none;}
    .msg{margin-top:10px;padding:16px;border-radius:14px;background:rgba(14,26,43,.04);border:1px solid rgba(14,26,43,.12);white-space:pre-wrap;}
    .muted{color:rgba(12,12,12,.65);font-size:12px;line-height:1.6;}
    .foot{padding:16px 22px;background:rgba(14,26,43,.03);border-top:1px solid rgba(14,26,43,.10);text-align:center;}
    a{color:#0E1A2B;text-decoration:none;font-weight:700;}
    @media (max-width:600px){ .p{padding:18px!important;} .pill{display:none!important;} }
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
  const SITE_URL = "https://volasec.com";
  const LOGO_URL = "https://volasec.com/monologo.png"; // ✅ absolute URL
  const SUPPORT_HOURS = "Monday – Friday, 9:00 AM – 5:00 PM (GMT)";
  const safeCal = CAL_URL || "https://cal.com/james-moyosore-quqdc8/30min";

  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We got your message</title>
  <style>
    body{margin:0;padding:0;background:#F1F2F2;font-family:Helvetica,Arial,sans-serif;color:#0C0C0C;}
    table{border-collapse:collapse;}
    img{display:block;border:0;outline:none;}
    .wrap{width:100%;padding:24px 12px;}
    .card{max-width:680px;margin:0 auto;background:#fff;border:1px solid rgba(14,26,43,.16);border-radius:18px;overflow:hidden;}
    .head{padding:18px 22px;background:linear-gradient(180deg, rgba(12,12,12,.96), rgba(14,26,43,.92));border-bottom:1px solid rgba(241,242,242,.12);}
    .pill{font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:8px 12px;border-radius:999px;border:1px solid rgba(241,242,242,.18);background:rgba(241,242,242,.06);color:#F1F2F2;white-space:nowrap;}
    .p{padding:22px;}
    .title{font-size:22px;line-height:1.25;font-weight:900;letter-spacing:-.2px;margin:0;}
    .muted{color:rgba(12,12,12,.68);font-size:13px;line-height:1.7;margin-top:12px;}
    .btn{display:inline-block;margin-top:16px;padding:14px 20px;background:#0E1A2B;color:#fff!important;text-decoration:none;border-radius:999px;font-weight:800;letter-spacing:.3px;font-size:13px;}
    a{color:#0E1A2B;text-decoration:none;font-weight:800;}
    .links{margin-top:14px;font-size:13px;}
    .links span{color:rgba(12,12,12,.5);margin:0 8px;}
    .support{margin-top:10px;font-size:12px;color:rgba(12,12,12,.55);}
    .box{margin-top:16px;padding:14px 16px;border-radius:14px;background:rgba(14,26,43,.04);border:1px solid rgba(14,26,43,.12);font-size:12px;color:rgba(12,12,12,.7);line-height:1.6;}
    .foot{padding:16px 22px;background:rgba(14,26,43,.03);border-top:1px solid rgba(14,26,43,.10);text-align:center;}
    @media (max-width:600px){ .p{padding:18px!important;} .title{font-size:20px!important;} .btn{display:block!important;text-align:center!important;} .pill{display:none!important;} }
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
                    <span class="pill">Message received</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="p">
              <h1 class="title">Thanks for contacting Volasec, ${escapeHtml(name)}.</h1>

              <p class="muted">
                We’ve received your message and we’ll get back to you within <strong>24 hours</strong>.
                If your request is time-sensitive, reply with <strong>“URGENT”</strong> in the subject.
              </p>

              <a class="btn" href="${escapeHtml(safeCal)}" target="_blank" rel="noreferrer">
                Book a Strategy Call
              </a>

              <div class="links">
                <a href="${SITE_URL}" target="_blank" rel="noreferrer">Visit our website</a>
                <span>•</span>
                <a href="${SITE_URL}/contact" target="_blank" rel="noreferrer">Contact page</a>
              </div>

              <div class="support">Support hours: ${SUPPORT_HOURS}</div>

              <div class="box">
                Please avoid sharing sensitive credentials via email. If required, we’ll provide a secure channel for follow-up.
              </div>

              <p class="muted" style="margin-top:16px;">— Volasec Team</p>
            </td>
          </tr>

          <tr>
            <td class="foot">
              <div style="font-size:12px;color:rgba(12,12,12,.6);line-height:1.7;">
                © ${new Date().getFullYear()} Volasec. All rights reserved.<br/>
                You received this email because you contacted us via our website.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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

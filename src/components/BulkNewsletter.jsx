import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, Toaster } from "react-hot-toast";

export default function BulkNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customized, setCustomized] = useState(false);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [afterCtaText, setAfterCtaText] = useState("");
  const [sending, setSending] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [sendingTest, setSendingTest] = useState(false);
  const [smallFont, setSmallFont] = useState(false);
  const [sendStatus, setSendStatus] = useState([]);

  const LOGO_URL = "https://volasecj.pages.dev/monoblue.png";
  const SITE_URL = "https://volasec.com";

  // Rich text editor toolbar
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "clean"],
    ],
  };

  // Fetch subscribers
  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://subscribe.volasec.com/subscribers");
        const data = await res.json();
        const list = Array.isArray(data.documents)
          ? data.documents.map((doc) => ({
              email: doc.fields.email?.stringValue || "(no email)",
              name: doc.fields.name?.stringValue || "Subscriber",
              confirmed: doc.fields.confirmed?.booleanValue || false,
            }))
          : [];
        setSubscribers(list);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load subscribers");
        setSubscribers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter((sub) => {
    if (filter === "all") return true;
    if (filter === "confirmed") return sub.confirmed;
    if (filter === "pending") return !sub.confirmed;
    return true;
  });

  // Compose email HTML with a card style and white background
  const composeEmailHtml = (subName) => {
    let htmlMessage = message.replaceAll("{{name}}", subName);

    if (ctaText && ctaUrl) {
      htmlMessage += `
      <p style="text-align:center;margin-top:24px;">
        <a href="${ctaUrl}" style="display:inline-block;padding:12px 24px;background:#0E1A2B;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
          ${ctaText}
        </a>
      </p>`;
    }

    if (afterCtaText) {
      htmlMessage += `
      <p style="text-align:center;margin-top:12px;color:rgba(14,26,43,0.75);">
        ${afterCtaText}
      </p>`;
    }

    return `
  <table width="100%" bgcolor="#F1F2F2" cellpadding="0" cellspacing="0" border="0" style="padding:24px 0;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:680px;border-radius:18px;overflow:hidden;border:1px solid rgba(14,26,43,0.08);" bgcolor="#ffffff" cellpadding="0" cellspacing="0">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px;border-bottom:1px solid rgba(14,26,43,0.08);" bgcolor="#ffffff">
              <img src="${LOGO_URL}" alt="Volasec" width="120" height="28"/>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px;font-family:Helvetica,Arial,sans-serif;font-size:${smallFont ? "13px" : "16px"};line-height:1.6;color:#0E1A2B;" bgcolor="#ffffff">
              ${htmlMessage}
            </td>
          </tr>

          <!-- Footer -->
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
  `;
  };

  // Send newsletter
  const handleSend = async () => {
    if (!customized)
      return toast.error("Enable 'Customized Newsletter' first!");
    if (!title.trim() || !message.trim())
      return toast.error("Title and message are required!");
    setSending(true);

    const payload = {
      subscribers: filteredSubscribers.map((s) => ({
        email: s.email,
        name: s.name,
      })),
      title,
      html: composeEmailHtml("Subscriber"),
    };

    try {
      const res = await fetch("/api/bulk-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Newsletter sent!");
        setSendStatus(data.results);
      } else {
        toast.error(data.error || "Failed to send newsletter");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send newsletter");
    } finally {
      setSending(false);
    }
  };

  const retryEmail = async (emailObj) => {
    const { email, name } = emailObj;
    setSendStatus((prev) =>
      prev.map((s) => (s.email === email ? { ...s, status: "pending" } : s)),
    );

    try {
      const res = await fetch("/api/bulk-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscribers: [emailObj],
          title,
          html: composeEmailHtml(name),
        }),
      });
      const data = await res.json();
      setSendStatus((prev) =>
        prev.map((s) =>
          s.email === email
            ? {
                ...s,
                status: res.ok ? "sent" : "failed",
                details: data.error || null,
              }
            : s,
        ),
      );
    } catch (err) {
      setSendStatus((prev) =>
        prev.map((s) =>
          s.email === email
            ? { ...s, status: "error", details: err.message }
            : s,
        ),
      );
    }
  };

  const handleSendTest = async () => {
    if (!testEmail.trim()) return toast.error("Enter a test email!");
    if (!title.trim() || !message.trim())
      return toast.error("Title and message are required!");
    setSendingTest(true);

    try {
      const res = await fetch("/api/send-test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testEmail,
          title,
          html: composeEmailHtml("Test Subscriber"),
        }),
      });
      const data = await res.json();
      data.status === "sent"
        ? toast.success("Test email sent!")
        : toast.error(data.error || "Failed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send test email");
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="p-8 bg-[#F1F2F2] min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-[#0E1A2B]">
          Bulk Newsletter
        </h1>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 font-semibold text-[#0E1A2B]">
            <input
              type="checkbox"
              checked={customized}
              onChange={() => setCustomized(!customized)}
              className="form-checkbox h-5 w-5 text-[#0E1A2B]"
            />
            Customized Newsletter
          </label>
          <span className="text-[#0E1A2B]/50 text-sm">
            {loading ? "Loading..." : `${subscribers.length} subscribers`}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["all", "confirmed", "pending"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === f
                ? "bg-[#0E1A2B] text-white"
                : "bg-white border border-[#0E1A2B]/30 text-[#0E1A2B]"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Subscribers */}
      <div className="mb-6 max-h-64 overflow-auto rounded-lg bg-white border border-[#0E1A2B]/20 p-4 shadow-sm">
        {filteredSubscribers.length === 0 && (
          <p className="text-[#0E1A2B]/50">No subscribers in this category.</p>
        )}
        {filteredSubscribers.map((s) => (
          <div
            key={s.email}
            className="flex justify-between items-center mb-2 last:mb-0"
          >
            <span className="truncate">{s.email}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${s.confirmed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
            >
              {s.confirmed ? "Confirmed" : "Pending"}
            </span>
          </div>
        ))}
      </div>

      {/* Customized Newsletter Form */}
      {customized && (
        <div className="space-y-4">
          {/* Title & Message */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
            <input
              type="text"
              placeholder="Newsletter Title / Subject"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#0E1A2B]/30 focus:outline-none focus:border-[#0E1A2B] bg-white text-[#0E1A2B]"
            />
            <ReactQuill
              value={message}
              onChange={setMessage}
              modules={quillModules}
              placeholder="Write your newsletter message here. Use {{name}} for personalization."
              className="bg-white text-[#0E1A2B] rounded-lg"
            />
          </div>

          {/* CTA */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
            <h2 className="font-bold text-[#0E1A2B]">CTA Options</h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="CTA Button Text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#0E1A2B]/30 focus:outline-none focus:border-[#0E1A2B] bg-white text-[#0E1A2B]"
              />
              <input
                type="url"
                placeholder="CTA URL"
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#0E1A2B]/30 focus:outline-none focus:border-[#0E1A2B] bg-white text-[#0E1A2B]"
              />
            </div>
            <input
              type="text"
              placeholder="Optional text after CTA"
              value={afterCtaText}
              onChange={(e) => setAfterCtaText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#0E1A2B]/30 focus:outline-none focus:border-[#0E1A2B] bg-white text-[#0E1A2B]"
            />
          </div>

          {/* Test Email */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex gap-3 items-center">
            <input
              type="email"
              placeholder="Test Email Address"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-[#0E1A2B]/30 focus:outline-none focus:border-[#0E1A2B] bg-white text-[#0E1A2B]"
            />
            <button
              onClick={handleSendTest}
              disabled={sendingTest}
              className={`px-4 py-2 rounded-lg font-semibold ${sendingTest ? "bg-gray-400" : "bg-[#0E1A2B] text-white hover:bg-[#0E1A2B]/80"}`}
            >
              {sendingTest ? "Sending..." : "Send Test"}
            </button>
          </div>

          {/* Preview */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-[#0E1A2B] mb-2">Preview</h3>
            <div
              className="max-h-96 overflow-auto"
              dangerouslySetInnerHTML={{
                __html: composeEmailHtml("Subscriber"),
              }}
            />
          </div>

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={sending}
            className={`w-full py-3 rounded-xl font-bold text-white ${sending ? "bg-gray-400" : "bg-[#0E1A2B] hover:bg-[#0E1A2B]/80"}`}
          >
            {sending ? "Sending..." : "Send Newsletter"}
          </button>

          {/* Send Status */}
          {sendStatus.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
              <h3 className="font-bold text-[#0E1A2B] mb-2">Send Status</h3>
              <ul className="max-h-64 overflow-auto space-y-2">
                {sendStatus.map((s) => (
                  <li
                    key={s.email}
                    className="flex justify-between items-center"
                  >
                    <span>{s.email}</span>
                    <span className="flex gap-2 items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${s.status === "sent" ? "bg-green-100 text-green-800" : s.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                      >
                        {s.status.toUpperCase()}
                      </span>
                      {["failed", "error"].includes(s.status) && (
                        <button
                          onClick={() => retryEmail(s)}
                          className="text-sm text-[#0E1A2B] underline"
                        >
                          Retry
                        </button>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

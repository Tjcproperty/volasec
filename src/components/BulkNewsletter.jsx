"use client";

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const LOGO_URL = "https://volasecj.pages.dev/monoblue.png";
  const SITE_URL = "https://volasec.com";

  // Fetch subscribers
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
      console.error("Failed to fetch subscribers", err);
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter((sub) => {
    if (filter === "all") return true;
    if (filter === "confirmed") return sub.confirmed;
    if (filter === "pending") return !sub.confirmed;
    return true;
  });

  const composeEmailHtml = (subName) => {
    let htmlMessage = message.replaceAll("{{name}}", subName);

    if (ctaText && ctaUrl) {
      htmlMessage += `<p style="text-align:center;margin-top:24px;">
        <a href="${ctaUrl}" style="display:inline-block;padding:12px 24px;background:#0E1A2B;color:#fff;text-decoration:none;border-radius:6px;font-weight:300;">
          ${ctaText}
        </a>
      </p>`;
    }

    if (afterCtaText) {
      htmlMessage += `<p style="text-align:center;margin-top:12px;color:rgba(14,26,43,0.75);">
        ${afterCtaText}
      </p>`;
    }

    return `
      <div style="font-family:Helvetica,Arial,sans-serif;color:#0E1A2B;background:#F3F5F7;padding:20px;font-size:${smallFont ? "13px" : "16px"};">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(14,26,43,0.08);">
          <div style="padding:12px;text-align:center;border-bottom:1px solid rgba(14,26,43,0.08);">
            <img src="${LOGO_URL}" alt="Volasec" height="24" width="120"/>
          </div>
          <div style="padding:24px;">${htmlMessage}</div>
          <div style="padding:20px;text-align:center;font-size:12px;color:rgba(14,26,43,0.5);border-top:1px solid rgba(14,26,43,0.08);">
            © ${new Date().getFullYear()} Volasec. All rights reserved.<br/>
            <a href="${SITE_URL}" target="_blank" style="color:#0E1A2B;text-decoration:none;font-weight:600;">Visit Website</a>
          </div>
        </div>
      </div>
    `;
  };

  // Bulk send
  const handleSend = async () => {
    if (!customized) return alert("Enable 'Customized Newsletter' first!");
    if (!title.trim() || !message.trim())
      return alert("Title and message are required!");

    setSending(true);

    // Prepare subscriber emails with personalized HTML
    const emailsToSend = filteredSubscribers.map((sub) => ({
      email: sub.email,
      name: sub.name,
      html: composeEmailHtml(sub.name),
    }));

    try {
      const res = await fetch("/api/bulk-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscribers: emailsToSend,
          title,
          html: composeEmailHtml("Subscriber"), // ✅ top-level HTML required by your handler
        }),
      });

      const data = await res.json();
      console.log("Bulk send result:", data);
      alert(`Newsletter sent to ${emailsToSend.length} subscribers!`);
    } catch (err) {
      console.error("Failed to send newsletter:", err);
      alert("Failed to send newsletter. See console for details.");
    } finally {
      setSending(false);
    }
  };
  // Test send
  const handleSendTest = async () => {
    if (!testEmail.trim()) return alert("Enter a test email!");
    if (!title.trim() || !message.trim())
      return alert("Title and message are required!");

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
      alert(
        data.status === "sent" ? "Test email sent!" : `Failed: ${data.error}`,
      );
    } catch (err) {
      console.error(err);
      alert("Failed to send test email");
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="p-8 bg-secondary/5 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-dark">Bulk Newsletter</h1>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-dark font-semibold">
            <input
              type="checkbox"
              checked={customized}
              onChange={() => setCustomized(!customized)}
              className="form-checkbox h-5 w-5 text-primary"
            />
            Customized Newsletter
          </label>
          <span className="text-dark/50 text-sm">
            {loading ? "Loading..." : `${subscribers.length} subscribers`}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        {["all", "confirmed", "pending"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg ${
              filter === f
                ? "bg-primary text-white"
                : "bg-secondary border border-primary-30 text-dark"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-6 max-h-64 overflow-auto border border-primary-20 rounded-lg p-4 bg-secondary">
        {filteredSubscribers.length === 0 && (
          <p className="text-dark/50">No subscribers in this category.</p>
        )}
        {filteredSubscribers.map((sub) => (
          <div
            key={sub.email}
            className="flex justify-between items-center mb-2 last:mb-0"
          >
            <span className="truncate">{sub.email}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                sub.confirmed
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {sub.confirmed ? "Confirmed" : "Pending"}
            </span>
          </div>
        ))}
      </div>

      {customized && (
        <>
          <input
            type="text"
            placeholder="Newsletter Title / Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-primary-30 bg-secondary text-dark placeholder-dark/40 focus:outline-none focus:border-primary transition-all duration-300"
          />

          <ReactQuill
            theme="snow"
            value={message}
            onChange={setMessage}
            placeholder="Write your newsletter message here. Use {{name}} for personalization."
            className="mb-4 bg-white rounded-lg overflow-hidden"
          />

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="CTA Button Text (optional)"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-primary-30 bg-secondary text-dark placeholder-dark/40 focus:outline-none focus:border-primary transition-all duration-300"
            />
            <input
              type="url"
              placeholder="CTA URL (optional)"
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-primary-30 bg-secondary text-dark placeholder-dark/40 focus:outline-none focus:border-primary transition-all duration-300"
            />
          </div>

          <input
            type="text"
            placeholder="Optional text after CTA button"
            value={afterCtaText}
            onChange={(e) => setAfterCtaText(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-primary-30 bg-secondary text-dark placeholder-dark/40 focus:outline-none focus:border-primary transition-all duration-300"
          />

          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={smallFont}
              onChange={() => setSmallFont(!smallFont)}
              className="form-checkbox h-5 w-5 text-primary"
            />
            Use smaller font
          </label>

          <div className="mb-4 flex gap-3 items-center">
            <input
              type="email"
              placeholder="Test Email Address"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-primary-30 bg-secondary text-dark placeholder-dark/40 focus:outline-none focus:border-primary transition-all duration-300"
            />
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                sendingTest
                  ? "bg-gray-400"
                  : "bg-secondary border border-primary-30 text-dark hover:bg-primary/10"
              }`}
              onClick={handleSendTest}
              disabled={sendingTest}
            >
              {sendingTest ? "Sending..." : "Send Test"}
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-dark mb-2">Preview:</h3>
            <div
              className="p-4 border border-primary-30 rounded-lg bg-secondary text-dark max-h-96 overflow-auto"
              dangerouslySetInnerHTML={{
                __html: composeEmailHtml("Subscriber"),
              }}
            />
          </div>

          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              sending
                ? "bg-gray-400"
                : "bg-primary text-white hover:bg-primary/80"
            }`}
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Newsletter"}
          </button>
        </>
      )}
    </div>
  );
}

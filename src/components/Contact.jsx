import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { sendContactMessage } from "@/lib/sendContactMessage";

export default function Contact() {
  const title = "Book a Strategy Call — Volasec";
  const desc =
    "Book a 15–30 minute strategy call. Security architecture for high-stakes cloud environments—built for teams shipping fast.";
  const url = "https://volasec.com/contact";
  const image = "https://volasec.com/og-volasec.jpg";
  const didInit = useRef(false);

  const [callType, setCallType] = useState("30min");

  const callOptions = [
    { id: "15min", duration: "15 min", title: "Quick Chat", calLink: "james-moyosore-quqdc8/15min" },
    { id: "30min", duration: "30 min", title: "Strategy Session", calLink: "james-moyosore-quqdc8/30min" },
    { id: "60min", duration: "1 hour", title: "Deep Dive", calLink: "james-moyosore-quqdc8/60min" },
  ];

  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    (async () => {
      const cal = await getCalApi({ namespace: callType });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [callType]);

  const onChange = (key) => (e) => {
    setStatus({ type: "", msg: "" });
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", msg: "Please fill in your name, email, and message." });
      return;
    }
    try {
      setSending(true);
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
      });
      setStatus({ type: "success", msg: "Message sent. We'll reply within 24 hours." });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", msg: err?.message || "Failed to send message. Please try again." });
    } finally {
      setSending(false);
    }
  };

  const selectedCall = callOptions.find((opt) => opt.id === callType);

  return (
    <>
      <Helmet>
        <meta name="description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Volasec" />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      <section id="contact" className="scroll-mt-24 relative overflow-hidden flex flex-col lg:flex-row min-h-screen">

        {/* ── LEFT — DARK (booking) ── */}
        <div className="relative lg:w-1/2 bg-dark flex flex-col py-20 px-8 md:px-14 overflow-hidden">

          {/* Background video — subtle, dark side */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay src="/cloud.mp4" type="video/mp4"
              loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-primary/80" />
          </div>

          {/* Floating glow */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              {/* Accent line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-0.5 bg-secondary/60 mb-6"
              />
              <p className="text-xs font-black tracking-[0.3em] text-secondary/40  mb-3">
                Book a Call
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight mb-4">
                SCHEDULE YOUR<br />
                <span className="text-secondary/40">STRATEGY SESSION</span>
              </h2>
              <p className="text-secondary/60 font-light text-sm leading-relaxed max-w-sm">
                Choose your preferred session length and pick a time that works for you.
              </p>
            </motion.div>

            {/* Call type selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-3 gap-3 mb-8"
            >
              {callOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setCallType(option.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative p-3 text-left border transition-all duration-300 rounded-lg ${
                    callType === option.id
                      ? "border-secondary/60 bg-secondary/10"
                      : "border-secondary/20 bg-secondary/5 hover:border-secondary/40"
                  }`}
                >
                  {callType === option.id && (
                    <motion.div
                      layoutId="selected-indicator"
                      className="absolute top-2 right-2 w-5 h-5 bg-secondary rounded-full flex items-center justify-center"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                  <div className={`text-[10px] font-black  tracking-wider mb-1 ${
                    callType === option.id ? "text-secondary" : "text-secondary/40"
                  }`}>
                    {option.duration}
                  </div>
                  <div className={`text-xs font-bold ${
                    callType === option.id ? "text-secondary/90" : "text-secondary/50"
                  }`}>
                    {option.title}
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Calendar embed */}
            <AnimatePresence mode="wait">
              <motion.div
                key={callType}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden flex-1"
              >
              <Cal
  namespace={callType}
  calLink={selectedCall.calLink}
  style={{ width: "100%", height: "100%", minHeight: "500px" }}
  config={{
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true",
    theme: "light",         // "light" | "dark"
    brandColor: "#0E1A2B",  // your primary color — controls buttons, selected dates, etc.
  }}
/>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT — LIGHT (form) ── */}
        <div className="relative lg:w-1/2 bg-secondary flex flex-col justify-center py-20 px-8 md:px-14">

          {/* Subtle texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #0E1A2B 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Glow accent */}
          <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-md w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-0.5 bg-primary mb-6"
              />
              <p className="text-xs font-black tracking-[0.3em] text-primary/40  mb-3">
                Send a Message
              </p>
              <h2 className="text-3xl  font-black text-primary leading-tight mb-4">
                PREFER<br />
                <span className="text-primary/40">EMAIL?</span>
              </h2>
              <p className="text-primary/60 font-light text-sm leading-relaxed">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            {/* Status */}
            {status.msg && (
              <div className={[
                "border px-4 py-3 text-sm rounded mb-6",
                status.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800",
              ].join(" ")}>
                {status.msg}
              </div>
            )}

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onSubmit={onSubmit}
              className="space-y-6"
            >
              {[
                { key: "name", label: "Name", type: "text", placeholder: "John Doe" },
                { key: "email", label: "Email", type: "email", placeholder: "john@company.com" },
                { key: "company", label: "Company", type: "text", placeholder: "Company name (optional)" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-[12px]  tracking-[0.2em]  text-primary/50 mb-2">
                    {label}
                  </label>
                  <input
                    value={form[key]}
                    onChange={onChange(key)}
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-white border-2 border-primary/10 px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary/40 transition-all duration-200"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[12px]  tracking-[0.2em]  text-primary/50 mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={onChange("message")}
                  rows="5"
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full bg-white border-2 border-primary/10 px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary/40 transition-all duration-200 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sending}
                className={`w-full py-4 text-sm font-black tracking-widest  bg-primary text-secondary flex items-center justify-center gap-3 transition-all duration-300 ${
                  sending ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/90"
                }`}
              >
                {sending ? "Sending..." : "Send Message"}
                <motion.svg
                  className="w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  animate={sending ? {} : { x: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.button>
            </motion.form>

            {/* Trust badge */}
            <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-3 text-primary/40">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <p className="text-xs">Your information is secure and confidential</p>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
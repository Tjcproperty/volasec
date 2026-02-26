import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactMessage } from "@/lib/sendContactMessage";
import SectionBadge from "./SectionBadge";
import BlurRevealHeading from "./BlurRevealHeading";

export default function ContactSection({ dark = false }) {
  const [callType, setCallType] = useState("30min");

  const callOptions = [
    {
      id: "30min",
      duration: "30 min",
      title: "Quick Chat",
      calLink: import.meta.env.VITE_CAL_LINK_30MIN || "volasec/chat",
    },
    {
      id: "60min",
      duration: "1 hour",
      title: "Strategy Session",
      calLink: import.meta.env.VITE_CAL_LINK_60MIN || "volasec/strategy",
    },
    {
      id: "120min",
      duration: "2 hours",
      title: "Comprehensive Review",
      calLink: import.meta.env.VITE_CAL_LINK_120MIN || "volasec/comprehensive",
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: callType });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
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
      setStatus({
        type: "error",
        msg: "Please fill in your name, email, and message.",
      });
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
      setStatus({
        type: "success",
        msg: "Message sent. We'll reply within 24 hours.",
      });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  const selectedCall = callOptions.find((opt) => opt.id === callType);

  const sectionBg = dark ? "bg-dark" : "bg-secondary";
  const cardBg = dark ? "bg-primary" : "bg-white";
  const cardBorder = dark ? "border-primary-30" : "border-primary-30";
  const textPrimary = dark ? "text-secondary" : "text-dark";
  const textSecondary = dark ? "text-secondary-80" : "text-dark-80";
  const inputBg = dark
    ? "bg-dark-80 border-primary-30 text-secondary placeholder:text-secondary-50"
    : "bg-secondary-50 border-secondary-300 text-dark placeholder:text-dark/40";

  return (
    <section
      id="contact"
      className={`scroll-mt-24 py-24 md:py-32 px-4 md:px-8 relative overflow-hidden border-b border-primary-30 ${sectionBg}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <SectionBadge
            label="Get in Touch"
            className={dark ? "text-secondary-50 border-secondary-30" : "text-dark-80"}
          />
          <BlurRevealHeading
            text="Let's Discuss Your Security"
            as="h2"
            className={`mt-6 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${textPrimary}`}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calendar side */}
          <div className="space-y-6">
            <div className={`${cardBg} border ${cardBorder} p-6`}>
              <h3 className={`text-xl font-medium ${textPrimary} mb-2`}>
                Book Your Strategy Call
              </h3>
              <p className={`text-sm ${textSecondary} font-light`}>
                Choose your preferred session type and select a convenient time.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {callOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setCallType(option.id)}
                  className={`p-3 border-2 text-left transition-all duration-300 ${
                    callType === option.id
                      ? "border-primary bg-primary text-secondary"
                      : `border-primary-30 ${cardBg} ${textPrimary} hover:border-primary`
                  }`}
                >
                  <div className="text-xs font-medium tracking-wider mb-1">
                    {option.duration}
                  </div>
                  <div className="text-xs font-medium">{option.title}</div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={callType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full overflow-hidden"
              >
                <Cal
                  namespace={callType}
                  calLink={selectedCall.calLink}
                  style={{ width: "100%", height: "100%" }}
                  config={{
                    layout: "month_view",
                    useSlotsViewOnSmallScreen: "true",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form side */}
          <div className={`${cardBg} border ${cardBorder} p-8 sticky top-24`}>
            <h3 className={`text-xl font-medium ${textPrimary} mb-2`}>
              Send a Message
            </h3>
            <p className={`text-sm ${textSecondary} font-light mb-8`}>
              Prefer email? Fill out the form below.
            </p>

            {status.msg && (
              <div
                className={`border px-4 py-3 text-sm mb-6 ${
                  status.type === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {status.msg}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {[
                { key: "name", label: "Name", type: "text", placeholder: "John Doe" },
                { key: "email", label: "Email", type: "email", placeholder: "john@company.com" },
                { key: "company", label: "Company", type: "text", placeholder: "Company name (optional)" },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    className={`block font-semibold ${textPrimary} mb-2 tracking-tight uppercase text-xs`}
                  >
                    {field.label}
                  </label>
                  <input
                    value={form[field.key]}
                    onChange={onChange(field.key)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`w-full border-2 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 ${inputBg}`}
                  />
                </div>
              ))}

              <div>
                <label
                  className={`block font-semibold ${textPrimary} mb-2 tracking-tight uppercase text-xs`}
                >
                  Your Message
                </label>
                <textarea
                  value={form.message}
                  onChange={onChange("message")}
                  rows="5"
                  placeholder="Tell us about your project, goals, and timeline..."
                  className={`w-full border-2 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 resize-none ${inputBg}`}
                />
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sending}
                className={`w-full py-4 text-sm font-medium tracking-wider uppercase bg-primary text-secondary transition-all duration-300 flex items-center justify-center gap-3 ${
                  sending ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {sending ? "Sending..." : "Send Message"}
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={sending ? {} : { x: [0, 5, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </motion.button>
            </form>

            <div className={`mt-8 pt-6 border-t ${cardBorder}`}>
              <div className={`flex items-center gap-2 text-sm ${textSecondary}`}>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Your information is secure and confidential
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

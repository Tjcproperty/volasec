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

  // ✅ Call type selection
  const [callType, setCallType] = useState("30min"); // "15min" | "30min" | "60min"

  const callOptions = [
    {
      id: "15min",
      duration: "15 min",
      title: "Quick Chat",
      // description: "Brief introduction and initial discussion",
      calLink: "james-moyosore-quqdc8/15min",
 
    },
    {
      id: "30min",
      duration: "30 min",
      title: "Strategy Session",
      // description: "Detailed consultation on your security needs",
      calLink: "james-moyosore-quqdc8/30min",
    
    },
    {
      id: "60min",
      duration: "1 hour",
      title: "Deep Dive",
      // description: "Comprehensive review and planning session",
      calLink: "james-moyosore-quqdc8/60min",

    },
  ];

  // ✅ form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  // ✅ ui state
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
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

      <section
        id="contact"
        className="scroll-mt-24 py-32 px-4 md:px-16 lg:px-28 relative overflow-hidden"
      >
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            src="/cloud.mp4"
            type="video/mp4"
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-80/60 via-dark/85 to-secondary-30/90" />
        </div>

        {/* texture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-[1]"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(14, 26, 43, 0.15) 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
          />
        </motion.div>

        {/* Accent shapes */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-xl z-[1]"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl z-[1]"
        />

        <div className="max-w-[1400px] mx-auto px-2 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid lg:grid-cols-[0.8fr,1.0fr] gap-16 items-start"
          >
            {/* CAL SECTION */}
            <motion.div variants={itemVariants} className="order-1 space-y-6">
              {/* Header */}
              <div className="bg-white rounded-xl border-l-4 border-primary p-8 shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-7 h-7 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-2xl font-normal text-dark tracking-tight mb-3">
                      Book Your Strategy Call
                    </h3>
                    <p className="text-dark/60 font-light leading-relaxed text-sm">
                      Choose your preferred session type and select a convenient time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call Type Selector */}
              <div className="grid grid-cols-3  gap-4">
                {callOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setCallType(option.id)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative p-3 rounded-lg border-2 text-left transition-all duration-300
                      ${
                        callType === option.id
                          
                        ? "border-secondary-200 bg-white hover:border-primary/50 hover:shadow-md" : "border-primary bg-secondary/80 shadow-lg shadow-primary/20"
                      }
                    `}
                  >
                    {/* Selected indicator */}
                    {callType === option.id && (
                      <motion.div
                        layoutId="selected-indicator"
                        className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    )}

                  
                    <div
                      className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                        callType === option.id ? "text-primary" : "text-dark/50"
                      }`}
                    >
                      {option.duration}
                    </div>
                    <h4
                      className={`font-bold text-xs mb-2 ${
                        callType === option.id ? "text-dark" : "text-dark/80"
                      }`}
                    >
                      {option.title}
                    </h4>
                    <p className="text-xs text-dark/60 leading-relaxed">
                      {option.description}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Calendar Embed */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={callType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full overflow-hidden rounded-lg shadow-lg "
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
            </motion.div>

            {/* FORM SECTION */}
            <motion.div variants={itemVariants} className="order-2">
              <div className="bg-white rounded-xl shadow-xl p-8 sticky top-8 border-t-4 border-primary">
                <div className="mb-10">
                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-14 h-14 bg-dark flex items-center justify-center shrink-0">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-2xl font-normal text-dark tracking-tight mb-3">
                        Send a Message
                      </h3>
                      <p className="text-dark/60 font-light text-sm">
                        Prefer email? Fill out the form below.
                      </p>
                    </div>
                  </div>

                  {/* status */}
                  {status.msg ? (
                    <div
                      className={[
                        "border px-4 py-3 text-sm rounded",
                        status.type === "success"
                          ? "border-green-200 bg-green-50 text-green-800"
                          : "border-red-200 bg-red-50 text-red-800",
                      ].join(" ")}
                    >
                      {status.msg}
                    </div>
                  ) : null}
                </div>

                <form onSubmit={onSubmit} className="space-y-8">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block font-semibold text-dark mb-3 tracking-tight uppercase text-xs">
                      Name
                    </label>
                    <input
                      value={form.name}
                      onChange={onChange("name")}
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-secondary-50 border-2 border-secondary-300 px-5 py-4 text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary focus:bg-white focus:shadow-md transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block font-semibold text-dark mb-3 tracking-tight uppercase text-xs">
                      Email
                    </label>
                    <input
                      value={form.email}
                      onChange={onChange("email")}
                      type="email"
                      placeholder="john@company.com"
                      className="w-full bg-secondary-50 border-2 border-secondary-300 px-5 py-4 text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary focus:bg-white focus:shadow-md transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block font-semibold text-dark mb-3 tracking-tight uppercase text-xs">
                      Company
                    </label>
                    <input
                      value={form.company}
                      onChange={onChange("company")}
                      type="text"
                      placeholder="Company name (optional)"
                      className="w-full bg-secondary-50 border-2 border-secondary-300 px-5 py-4 text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary focus:bg-white focus:shadow-md transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block font-semibold text-dark mb-3 tracking-tight uppercase text-xs">
                      Your Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={onChange("message")}
                      rows="6"
                      placeholder="Tell me about your project, goals, and timeline..."
                      className="w-full bg-secondary-50 border-2 border-secondary-300 px-5 py-4 text-base text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary focus:bg-white focus:shadow-md transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{
                      y: -3,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                    }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    type="submit"
                    disabled={sending}
                    className={[
                      "w-full py-5 text-sm font-bold tracking-wider uppercase bg-primary text-white transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg",
                      sending
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-primary-600",
                    ].join(" ")}
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

                <div className="mt-10 pt-10 border-t-2 border-secondary-200 space-y-5">
                  <div className="flex items-center gap-3 text-dark/50">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm">
                      Your information is secure and confidential
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
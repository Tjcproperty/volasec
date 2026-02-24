import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function SubscribersList() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all / confirmed / pending

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const url = limit
        ? `https://subscribe.volasec.com/subscribers?limit=${limit}`
        : "https://subscribe.volasec.com/subscribers";

      const res = await fetch(url);
      const data = await res.json();

      const list = Array.isArray(data.documents)
        ? data.documents.map((doc) => ({
            email: doc.fields.email?.stringValue || "(no email)",
            confirmed: doc.fields.confirmed?.booleanValue || false,
            source: doc.fields.source?.stringValue || "unknown",
            createdAt: doc.fields.createdAt?.timestampValue || "",
          }))
        : [];

      setSubscribers(list);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Filtered subscribers based on search and status
  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      sub.email.toLowerCase().includes(search.toLowerCase()) ||
      sub.source.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "confirmed" && sub.confirmed) ||
      (statusFilter === "pending" && !sub.confirmed);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative p-8 pt-20 min-h-screen bg-secondary/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-12 gap-6">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary/50 mb-2">
            Admin Dashboard
          </p>
          <h1 className="text-4xl font-extrabold text-dark flex items-center gap-3">
            Subscribers
            <span className="inline-flex items-center justify-center text-sm font-semibold bg-primary/10 text-primary border border-primary/20 rounded-sm px-3 py-0.5">
              {loading ? "…" : filteredSubscribers.length}
            </span>
          </h1>
        </div>

        <div className="flex gap-3 flex-wrap">
          <input
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-28 px-4 py-2 bg-secondary border-2 border-primary-30 rounded-lg text-dark placeholder-dark/40 text-sm focus:outline-none focus:border-primary transition-all duration-300"
          />
          <button
            onClick={fetchSubscribers}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/80 transition-colors duration-300 active:scale-95 shadow-sm"
          >
            Refresh
          </button>
          <input
            type="text"
            placeholder="Search by email or source"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-52 px-4 py-2 bg-secondary border-2 border-primary-30 rounded-lg text-dark placeholder-dark/40 text-sm focus:outline-none focus:border-primary transition-all duration-300"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-secondary border-2 border-primary-30 rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-all duration-300"
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="flex items-center gap-3 text-dark/50 text-base mt-16">
          <svg className="animate-spin w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading subscribers…
        </div>
      ) : filteredSubscribers.length === 0 ? (
        <p className="text-dark/50 text-base mt-16">No subscribers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSubscribers.map((sub, idx) => (
              <motion.div
                key={sub.email + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease, delay: idx * 0.05 }}
                className="relative bg-secondary border border-primary-20 rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                {/* Floating orb */}
                <motion.div
                  className="absolute w-28 h-28 bg-primary/10 rounded-sm blur-3xl -top-6 -right-6 pointer-events-none"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                />

                {/* Status & Source */}
                <div className="flex justify-between mb-4 items-center">
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-sm border ${
                      sub.confirmed
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-dark/5 text-dark/50 border-dark/20"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-sm ${
                        sub.confirmed ? "bg-primary" : "bg-dark/30"
                      }`}
                    />
                    {sub.confirmed ? "Confirmed" : "Pending"}
                  </span>
                  <span className="text-xs text-dark/40 bg-primary/5 px-2.5 py-1 rounded-sm border border-primary/10">
                    {sub.source}
                  </span>
                </div>

                {/* Email */}
                <h2 className="text-sm font-bold text-dark mb-2 truncate group-hover:text-primary transition-colors duration-200">
                  {sub.email}
                </h2>

                {/* Date */}
                <p className="text-xs text-dark/40">
                  {sub.createdAt
                    ? new Date(sub.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Unknown date"}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
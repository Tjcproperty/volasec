import NewsletterModal from "@/components/NewsletterModal";
import React, { useState } from "react";

// Example usage of the NewsletterModal component
export default function DemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-black text-secondary">
          Newsletter Modal Demo
        </h1>

        <p className="text-secondary/70 max-w-md mx-auto">
          Click the button below to open the newsletter subscription modal
        </p>

        {/* Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 rounded-xl font-bold tracking-wide bg-primary text-secondary hover:scale-105 transition-transform duration-300"
        >
          Open Newsletter Modal
        </button>

        {/* Code Example */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-secondary mb-4">How to Use:</h2>
          <pre className="text-left bg-dark-30 border border-primary-30 rounded-xl p-6 text-sm text-secondary/80 overflow-x-auto"></pre>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

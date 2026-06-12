"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Architectural Design",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", service: "Architectural Design", message: "" });
  };

  return (
    <div className="glass-panel p-8 md:p-12 ghost-border w-full">
      {submitted ? (
        <div className="text-left py-8 border-l border-primary pl-8">
          <h4 className="font-display-lg text-2xl mb-4 italic text-primary">
            Message Sent.
          </h4>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            Thank you for reaching out. A senior partner will contact you shortly to
            discuss your requirements.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 flex flex-col">
              <label className="font-label-caps text-label-caps text-on-surface-variant">
                FULL NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent p-3 input-underline text-on-surface font-body-md"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="font-label-caps text-label-caps text-on-surface-variant">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent p-3 input-underline text-on-surface font-body-md"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant">
              INTERESTED SERVICE
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-transparent p-3 input-underline text-on-surface font-body-md appearance-none cursor-pointer"
            >
              <option className="bg-surface text-on-surface" value="Architectural Design">
                Architectural Design
              </option>
              <option
                className="bg-surface text-on-surface"
                value="Construction Management"
              >
                Construction Management
              </option>
              <option
                className="bg-surface text-on-surface"
                value="Real Estate Investment"
              >
                Real Estate Investment
              </option>
              <option className="bg-surface text-on-surface" value="Legal Consulting">
                Legal Consulting
              </option>
              <option className="bg-surface text-on-surface" value="Other Enquiries">
                Other Enquiries
              </option>
            </select>
          </div>

          <div className="space-y-2 flex flex-col">
            <label className="font-label-caps text-label-caps text-on-surface-variant">
              PROJECT BRIEF / MESSAGE
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent p-3 input-underline text-on-surface font-body-md resize-none"
              placeholder="Briefly describe your requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-primary text-on-primary font-label-caps text-label-caps tracking-[0.2em] hover:bg-primary-fixed-dim transition-all flex justify-center items-center gap-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none select-none"
          >
            {loading ? "SENDING..." : "SEND MESSAGE"}
            <span className="material-symbols-outlined text-lg">trending_flat</span>
          </button>
        </form>
      )}
    </div>
  );
}

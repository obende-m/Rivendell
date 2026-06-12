"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface InquiryFormProps {
  projectName: string;
}

export function InquiryForm({ projectName }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I would like to request more details and arrange a private consultation regarding ${projectName}.`,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="w-full">
      {submitted ? (
        <div className="text-left py-8 border-l border-primary pl-8">
          <h4 className="font-display-lg text-2xl mb-4 italic text-primary">
            Request Received.
          </h4>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            Our principal concierge will reach out to you within 24 hours to coordinate
            details.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="font-label-caps text-[9px] text-primary/75 tracking-widest mb-2 uppercase">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-underline py-2 text-on-surface text-sm font-body-md"
                placeholder="e.g. Sterling Vance"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-label-caps text-[9px] text-primary/75 tracking-widest mb-2 uppercase">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-underline py-2 text-on-surface text-sm font-body-md"
                placeholder="e.g. concierge@firm.com"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-label-caps text-[9px] text-primary/75 tracking-widest mb-2 uppercase">
              TELEPHONE (OPTIONAL)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-underline py-2 text-on-surface text-sm font-body-md"
              placeholder="+234..."
            />
          </div>

          <div className="flex flex-col">
            <label className="font-label-caps text-[9px] text-primary/75 tracking-widest mb-2 uppercase">
              MESSAGE
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input-underline py-2 text-on-surface text-sm font-body-md resize-none"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "SENDING INQUIRY..." : "SEND INQUIRY"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

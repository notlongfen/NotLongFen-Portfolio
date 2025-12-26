"use client";

import { CONTACT_INFO } from "@/lib/contact";
import { trackContactFormSubmission } from "@/lib/analytics";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Please provide your email address.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus("error");
      setSubmitMessage("Please provide a valid email address.");
      return false;
    }

    if (!message.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Please include a message.");
      return false;
    }

    if (!consent) {
      setSubmitStatus("error");
      setSubmitMessage("Please consent to data processing for GDPR compliance.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_email: email,
          message: message,
          to_email: CONTACT_INFO.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus("success");
      setSubmitMessage("Thank you for reaching out! Your message has been sent successfully. We'll get back to you soon.");
      
      // Track form submission
      trackContactFormSubmission("magazine");
      
      setEmail("");
      setMessage("");
      setConsent(false);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#f0f0f0] text-black px-4"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest mb-4 block">
            Get in Touch
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.9]">
            Let&apos;s start a<br />
            conversation.
          </h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-12"
          onSubmit={handleSubmit}
        >
          <div className="relative group">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-black/20 py-4 font-mono text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
            />
          </div>

          <div className="relative group">
            <textarea
              placeholder="TELL ME ABOUT YOUR PROJECT"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-transparent border-b border-black/20 py-4 font-mono text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-black/30 resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="w-4 h-4"
            />
            <label htmlFor="consent" className="font-mono text-xs uppercase tracking-widest">
              I consent to the processing of my data for contact purposes (GDPR compliant).
            </label>
          </div>

          {submitStatus && (
            <div className={`text-center font-mono text-sm ${
              submitStatus === "success" ? "text-green-600" : "text-red-600"
            }`}>
              {submitMessage}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-black text-white font-mono text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-24 flex justify-between font-mono text-xs uppercase tracking-widest opacity-50"
        >
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="hover:opacity-100 transition-opacity"
          >
            {CONTACT_INFO.email}
          </a>
          <div className="flex gap-4">
            <a href={CONTACT_INFO.social.twitter} className="hover:opacity-100 transition-opacity">
              Twitter
            </a>
            <a href={CONTACT_INFO.social.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              GitHub
            </a>
            <a href={CONTACT_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

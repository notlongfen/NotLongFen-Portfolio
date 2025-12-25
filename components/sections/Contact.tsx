"use client";

import { CONTACT_INFO, contactActions } from "@/lib/contact";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([
    "INITIALIZING SECURE CONNECTION...",
    "HANDSHAKE COMPLETE.",
    "READY FOR INPUT.",
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isProcessing) return;

    const input = command.trim();
    setCommand("");
    setOutput((prev) => [...prev, `> ${input}`]);

    if (input.toLowerCase() === "help") {
      setOutput((prev) => [
        ...prev,
        "AVAILABLE COMMANDS: EMAIL, GITHUB, TWITTER, LINKEDIN, CLEAR",
      ]);
    } else if (input.toLowerCase() === "email") {
      setIsProcessing(true);
      setOutput((prev) => [...prev, "INITIATING SECURE TRANSMISSION..."]);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOutput((prev) => [...prev, "ENCRYPTING PAYLOAD..."]);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOutput((prev) => [...prev, "TRANSMISSION SUCCESSFUL."]);
      setOutput((prev) => [...prev, "OPENING MAILER DAEMON..."]);

      contactActions.email();
      setIsProcessing(false);
    } else if (input.toLowerCase() === "clear") {
      setOutput([]);
    } else if (input.toLowerCase() === "github") {
      setOutput((prev) => [
        ...prev,
        "OPENING GITHUB UPLINK...",
      ]);
      contactActions.github();
    } else if (input.toLowerCase() === "twitter") {
      setOutput((prev) => [
        ...prev,
        "OPENING TWITTER UPLINK...",
      ]);
      contactActions.twitter();
    } else if (input.toLowerCase() === "linkedin") {
      setOutput((prev) => [
        ...prev,
        "OPENING LINKEDIN UPLINK...",
      ]);
      contactActions.linkedin();
    } else {
      setOutput((prev) => [
        ...prev,
        "COMMAND NOT RECOGNIZED. TYPE 'HELP' FOR OPTIONS.",
      ]);
    }
  };

  return (
    <section
      className="relative z-10 w-full py-20 md:py-32 bg-background min-h-[80vh] flex flex-col justify-center"
      id="contact"
    >
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-8">
          <h2 className="text-xs font-mono tracking-widest text-accent">
            // CONSENSUS_LAYER
          </h2>
          <h3 className="text-4xl md:text-6xl font-sans font-bold leading-tight">
            READY TO <br />
            FINALIZE THE BLOCK?
          </h3>
          <p className="text-xl text-foreground/60 max-w-md">
            I am currently open for new commissions and technical partnerships.
            Initiate a transaction to discuss your protocol.
          </p>

          <div className="flex gap-8 mt-8">
            <a
              href={CONTACT_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono hover:text-accent underline decoration-accent/50 underline-offset-4"
            >
              GITHUB
            </a>
            <a
              href={CONTACT_INFO.social.twitter}
              className="text-sm font-mono hover:text-accent underline decoration-accent/50 underline-offset-4"
            >
              TWITTER
            </a>
            <a
              href={CONTACT_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono hover:text-accent underline decoration-accent/50 underline-offset-4"
            >
              LINKEDIN
            </a>
          </div>
        </div>

        <div className="w-full h-[400px] bg-surface border border-white/10 rounded-lg p-6 font-mono text-xs md:text-sm overflow-hidden flex flex-col shadow-2xl">
          <div className="flex gap-2 mb-4 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto flex flex-col gap-2 text-accent/80 scrollbar-hide"
          >
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {isProcessing && <div className="animate-pulse">_</div>}
          </div>

          <form
            onSubmit={handleCommand}
            className="mt-4 flex gap-2 border-t border-white/10 pt-4"
          >
            <span className="text-accent">{">"}</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              disabled={isProcessing}
              className="bg-transparent border-none outline-none text-foreground w-full placeholder:text-foreground/20 disabled:opacity-50"
              placeholder={isProcessing ? "PROCESSING..." : "TYPE 'HELP'..."}
              autoFocus
            />
          </form>
        </div>
      </div>
    </section>
  );
}

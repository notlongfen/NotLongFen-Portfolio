"use client";

import { useEffect, useRef, useState } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function GlitchText({
  text,
  className,
  delay = 0,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;

    const startGlitch = () => {
      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const timeout = setTimeout(startGlitch, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}

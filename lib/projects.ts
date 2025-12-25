export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  stats: { label: string; value: string }[];
  link?: string;
  longDescription?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "defrost-launcher",
    title: "DEFROST_LAUNCHER",
    description:
      "Polkadot Vietnam Hackathon 2024 Champion. IDO Launchpad with multi-chain support using vAsset on Bifrost.",
    longDescription:
      "Defrost Launcher is a next-generation IDO Launchpad built to gain traction for the Parachains ecosystem. It leverages vAsset on Bifrost as the main cryptocurrency, enabling multi-chain support and seamless liquidity across the Polkadot network.",
    tech: ["POLKADOT", "BIFROST", "SUBSTRATE", "REACT"],
    stats: [
      { label: "DATE", value: "11/2024" },
      { label: "STATUS", value: "CHAMPION" },
    ],
    link: "https://dorahacks.io/buidl/18004",
    features: [
      "Multi-chain IDO support",
      "vAsset integration via Bifrost",
      "Cross-chain liquidity pools",
      "Automated vesting schedules",
    ],
  },
  {
    id: "02",
    slug: "westpool",
    title: "WESTPOOL",
    description:
      "Polkadot Vietnam Hackathon 2025 Champion. Dynamic pricing IDO Launchpad with Premarket collaboration.",
    longDescription:
      "Westpool revolutionizes IDO launches with a dynamic pricing model driven by user demand. It integrates with Premarket trading volumes to establish fair and efficient token discovery mechanisms.",
    tech: ["SUBSTRATE", "RUST", "DEFI", "ALGORITHMIC PRICING"],
    stats: [
      { label: "DATE", value: "02/2025" },
      { label: "STATUS", value: "CHAMPION" },
    ],
    link: "https://dorahacks.io/buidl/21325",
    features: [
      "Demand-based dynamic pricing",
      "Premarket volume integration",
      "Fair launch mechanism",
      "Real-time analytics dashboard",
    ],
  },
  {
    id: "03",
    slug: "edumatch",
    title: "EDUMATCH",
    description:
      "Global educator connection platform with AI-powered scholarship and research lab personalization.",
    longDescription:
      "Edumatch connects global educators with scholarships and research labs. It utilizes an advanced AI recommendation engine to personalize opportunities based on academic profile and research interests.",
    tech: ["AI", "NEXT.JS", "RECOMMENDATION ENGINE", "POSTGRESQL"],
    stats: [
      { label: "DATE", value: "12/2025" },
      { label: "TYPE", value: "CAPSTONE" },
    ],
    link: "https://github.com/CAPSTONE-EduMatch/EduMatch-UI",
    features: [
      "AI-driven personalization",
      "Global scholarship database",
      "Research lab matching",
      "Real-time chat and collaboration",
    ],
  },
  {
    id: "04",
    slug: "gptshare",
    title: "GPTSHARE",
    description:
      "Chrome Extension to smartly curate and share GPT conversations.",
    longDescription:
      "GPTShare is a productivity tool that allows users to curate, organize, and share their ChatGPT conversations. It features smart tagging and easy export options for knowledge sharing.",
    tech: ["CHROME EXTENSION", "OPENAI API", "JAVASCRIPT", "REACT"],
    stats: [
      { label: "DATE", value: "12/2025" },
      { label: "USERS", value: "GROWING" },
    ],
    link: "https://chromewebstore.google.com/detail/gptshare-%E2%80%93-smartly-curate/ibjpjlomnjcbhkmghnfgjeoohpbophmb",
    features: [
      "One-click conversation sharing",
      "Smart curation and tagging",
      "Privacy-focused export",
      "Cross-platform compatibility",
    ],
  },
];

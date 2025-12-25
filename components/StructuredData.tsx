import { Project } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://notlongfen.dev";

interface StructuredDataProps {
  type: "project" | "portfolio";
  project?: Project;
  edition?: "cyberpunk" | "magazine";
}

export function StructuredData({ type, project, edition }: StructuredDataProps) {
  if (type === "project" && project) {
    const projectUrl = edition
      ? `${siteUrl}/${edition === "cyberpunk" ? "cyberpunk/work" : "magazine"}/${project.slug}`
      : `${siteUrl}/projects/${project.slug}`;

    // Extract date from stats
    const dateStat = project.stats.find((s) => s.label === "DATE");
    const datePublished = dateStat
      ? new Date(dateStat.value.split("/").reverse().join("-")).toISOString()
      : new Date().toISOString();

    const projectSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.longDescription || project.description,
      url: projectUrl,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "Long Phan",
        alternateName: "NotLongFen",
        url: "https://github.com/notlongfen",
        sameAs: [
          "https://github.com/notlongfen",
          "https://www.linkedin.com/in/long-phan-3a992a266/",
        ],
      },
      datePublished,
      keywords: project.tech.join(", "),
      ...(project.link && {
        codeRepository: project.link,
      }),
    };

    // Also create CreativeWork schema for portfolio showcase
    const creativeWorkSchema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.longDescription || project.description,
      url: projectUrl,
      author: {
        "@type": "Person",
        name: "Long Phan",
        alternateName: "NotLongFen",
      },
      datePublished,
      keywords: project.tech.join(", "),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
        />
      </>
    );
  }

  if (type === "portfolio") {
    const portfolioSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Long Phan",
      alternateName: "NotLongFen",
      url: siteUrl,
      jobTitle: "Blockchain & Web3 Developer",
      description:
        "Blockchain and Web3 developer specializing in Polkadot ecosystem, Substrate, and decentralized applications.",
      sameAs: [
        "https://github.com/notlongfen",
        "https://www.linkedin.com/in/long-phan-3a992a266/",
      ],
      email: "phannguyenhoanglong@gmail.com",
      knowsAbout: [
        "Blockchain Development",
        "Web3",
        "Polkadot",
        "Substrate",
        "Rust",
        "React",
        "Next.js",
        "DeFi",
        "Cryptocurrency",
      ],
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "NotLongFen Portfolio",
      url: siteUrl,
      author: {
        "@type": "Person",
        name: "Long Phan",
        alternateName: "NotLongFen",
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </>
    );
  }

  return null;
}


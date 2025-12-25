import GlitchText from "@/components/dom/GlitchText";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | NotLongFen Portfolio",
    };
  }

  return {
    title: `${project.title} | NotLongFen Portfolio`,
    description: project.longDescription || project.description,
    keywords: [...project.tech, "blockchain", "web3", "portfolio", "development"],
    authors: [{ name: "Long Phan (NotLongFen)" }],
    creator: "Long Phan (NotLongFen)",
    publisher: "NotLongFen",
    openGraph: {
      title: `${project.title} | NotLongFen Portfolio`,
      description: project.longDescription || project.description,
      url: `https://notlongfen.dev/cyberpunk/work/${project.slug}`,
      siteName: "NotLongFen Portfolio",
      images: [
        {
          url: `/api/og?project=${project.slug}`,
          width: 1200,
          height: 630,
          alt: `${project.title} - NotLongFen Portfolio`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | NotLongFen Portfolio`,
      description: project.longDescription || project.description,
      images: [`/api/og?project=${project.slug}`],
      creator: "@notlongfen",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://notlongfen.dev/cyberpunk/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-20 px-8">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/cyberpunk#work"
          className="inline-block mb-12 font-mono text-xs text-accent hover:underline decoration-accent/50 underline-offset-4"
        >
          {"<"} RETURN_TO_ROOT
        </Link>

        <div className="flex flex-col gap-8 mb-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-accent">
              ID: {project.id}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <h1 className="text-4xl md:text-7xl font-sans font-bold leading-none uppercase">
            <GlitchText text={project.title} delay={0.2} />
          </h1>

          <div className="flex flex-wrap gap-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 flex flex-col gap-8">
            <h2 className="text-xl font-mono font-bold text-accent">
              {"// OVERVIEW"}
            </h2>
            <p className="text-lg leading-relaxed opacity-80">
              {project.longDescription || project.description}
            </p>

            {project.features && (
              <>
                <h2 className="text-xl font-mono font-bold text-accent mt-8">
                  {"// KEY_FEATURES"}
                </h2>
                <ul className="flex flex-col gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-4 items-start opacity-80">
                      <span className="text-accent mt-1">{">"}</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="p-6 border border-white/10 bg-surface/30 rounded-lg">
              <h3 className="font-mono text-xs text-accent mb-6 border-b border-white/10 pb-2">
                METADATA
              </h3>
              <div className="flex flex-col gap-4">
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs font-mono opacity-50">
                      {stat.label}
                    </span>
                    <span className="font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-white text-black font-mono text-sm font-bold hover:bg-accent transition-colors text-center"
              >
                LAUNCH_PROTOCOL
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

import { StructuredData } from "@/components/StructuredData";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientPage from "./ClientPage";

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
      url: `https://notlongfen.dev/magazine/${project.slug}`,
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
      canonical: `https://notlongfen.dev/magazine/${project.slug}`,
    },
  };
}

export default async function Page({
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
    <>
      <StructuredData type="project" project={project} edition="magazine" />
      <ClientPage project={project} />
    </>
  );
}


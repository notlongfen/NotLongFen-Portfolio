import { projects } from "@/lib/projects";
import { ImageResponse } from "next/og";
import * as React from "react";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("project");
  const project = projects.find((p) => p.slug === slug);

  const title = project?.title || "Project Not Found";
  const description =
    project?.longDescription ||
    project?.description ||
    "No description available.";
  const tech = project?.tech || [];

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #18181b 60%, #2563eb 100%)",
          color: "#fff",
          padding: 80,
          fontFamily: "Geist, Arial, sans-serif",
        },
      },
      React.createElement(
        "div",
        { style: { fontSize: 56, fontWeight: 700, marginBottom: 24, letterSpacing: -1 } },
        title
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 32,
            fontWeight: 400,
            opacity: 0.85,
            marginBottom: 32,
            maxWidth: 900,
          },
        },
        description
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: 16, flexWrap: "wrap" } },
        ...tech.map((t) =>
          React.createElement(
            "span",
            {
              key: t,
              style: {
                fontSize: 24,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "8px 20px",
                fontWeight: 500,
                letterSpacing: 1,
              },
            },
            t
          )
        )
      ),
      React.createElement(
        "div",
        { style: { marginTop: 40, fontSize: 28, opacity: 0.7 } },
        "notlongfen.dev"
      )
    ),
    { width: 1200, height: 630 }
  );
}

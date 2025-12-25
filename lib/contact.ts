// Contact information constants
export const CONTACT_INFO = {
  email: "phannguyenhoanglong@gmail.com",
  social: {
    github: "https://github.com/notlongfen",
    twitter: "#", // Placeholder - no Twitter URL provided
    linkedin: "https://www.linkedin.com/in/long-phan-3a992a266/",
  },
} as const;

// Helper functions for contact actions
export const contactActions = {
  email: () => window.open(`mailto:${CONTACT_INFO.email}`),
  github: () => window.open(CONTACT_INFO.social.github, "_blank"),
  twitter: () => {
    if (CONTACT_INFO.social.twitter !== "#") {
      window.open(CONTACT_INFO.social.twitter, "_blank");
    }
  },
  linkedin: () => window.open(CONTACT_INFO.social.linkedin, "_blank"),
} as const;
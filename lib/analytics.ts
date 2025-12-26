// Analytics utility functions for tracking events

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Track a page view
 */
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}

/**
 * Track edition selection (Cyberpunk or Magazine)
 */
export function trackEditionSelection(edition: "cyberpunk" | "magazine") {
  trackEvent("edition_selected", {
    edition,
    event_category: "engagement",
    event_label: edition,
  });
}

/**
 * Track project view
 */
export function trackProjectView(projectSlug: string, projectTitle: string) {
  trackEvent("project_view", {
    project_slug: projectSlug,
    project_title: projectTitle,
    event_category: "content",
    event_label: projectTitle,
  });
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmission(edition: "cyberpunk" | "magazine") {
  trackEvent("contact_form_submit", {
    edition,
    event_category: "engagement",
    event_label: `contact_${edition}`,
  });
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, label: string) {
  trackEvent("external_link_click", {
    url,
    event_category: "outbound",
    event_label: label,
  });
}



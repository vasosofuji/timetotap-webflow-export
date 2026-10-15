import { createFileRoute } from "@tanstack/react-router";

import { webflowPage } from "@/lib/webflow";

// Every other URL: the matching Webflow page, or Webflow's 404 page.
export const Route = createFileRoute("/$")({
  server: {
    handlers: {
      GET: ({ request }) => webflowPage(request),
    },
  },
});

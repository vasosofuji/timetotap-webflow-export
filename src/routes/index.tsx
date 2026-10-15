import { createFileRoute } from "@tanstack/react-router";

import { webflowPage } from "@/lib/webflow";

// Home page = Webflow's "/" page, served verbatim (see src/lib/webflow.ts).
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: ({ request }) => webflowPage(request),
    },
  },
});

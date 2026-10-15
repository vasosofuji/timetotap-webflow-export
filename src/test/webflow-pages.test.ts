import { describe, expect, it } from "vitest";

import { webflowPage } from "@/lib/webflow";

const get = (path: string) => webflowPage(new Request(`https://timetotap.io${path}`));

describe("Webflow pages", () => {
  it("serves pages at their original Webflow paths", async () => {
    for (const path of ["/", "/privacy-policy", "/capa/card", "/business-card/elena"]) {
      const res = get(path);
      expect(res.status, path).toBe(200);
      expect(await res.text(), path).toContain("data-wf-site=");
    }
  });

  it("ignores a trailing slash", () => {
    expect(get("/privacy-policy/").status).toBe(200);
  });

  it("serves Webflow's 404 page for unknown paths", async () => {
    const res = get("/does-not-exist");
    expect(res.status).toBe(404);
    expect(await res.text()).toContain("data-wf-page=");
  });
});

import { env } from "@/env";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      disallow: ["/dashboard/", "/api/", "/reset-password"],
    },
    sitemap: [baseUrl + "/" + "sitemap.xml"],
  };
}

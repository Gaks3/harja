import { type MetadataRoute } from "next";
import { env } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL + "/";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: baseUrl + "login",
      lastModified: new Date(),
    },
    {
      url: baseUrl + "register",
      lastModified: new Date(),
    },
  ];
}

import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "g7s2wujj",
  dataset: "production",
  apiVersion: "2024-05-14",
  useCdn: true,
});

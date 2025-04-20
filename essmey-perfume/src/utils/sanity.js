import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "g7s2wujj",
  dataset: "production",
  apiVersion: "2024-05-14",
  useCdn: true,
});

export const sanityWriteClient = createClient({
  projectId: "g7s2wujj",
  dataset: "production",
  apiVersion: "2024-05-14",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
});

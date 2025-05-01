// src/utils/sanity.js

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
  ignoreBrowserTokenWarning: true,
  perspective: 'published',
  stega: {
    enabled: false
  }
});

export const client = sanityClient;
export { sanityClient };

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  if (!source) return null;
  try {
    return builder.image(source).url();
  } catch (error) {
    console.error('Error generating image URL:', error);
    return null;
  }
}

export function getImageUrl(source) {
  return builder.image(source)
}

// console.log("SanityClient Config: ", { projectId, dataset, apiVersion });

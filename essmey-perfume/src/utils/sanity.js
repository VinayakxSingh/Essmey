// src/utils/sanity.js

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
  withCredentials: true,
  perspective: 'published',
  stega: {
    enabled: false
  }
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// console.log("SanityClient Config: ", { projectId, dataset, apiVersion });

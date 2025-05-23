import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// import {schemaTypes} from './schemaTypes'
import product from './schemas/product'
import testimonial from './schemas/testimonial'
import blogPost from './schemas/blogPost'
import contactmessage from './schemas/contactmessage'
import order from './schemas/orders'
import newsletter from './schemas/newsletter'
export default defineConfig({
  name: 'default',
  title: 'Essmey',

  projectId: 'g7s2wujj',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [product, testimonial, blogPost, contactmessage, order, newsletter],
  },
})

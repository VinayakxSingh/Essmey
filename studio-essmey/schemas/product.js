export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'category', title: 'Category', type: 'string'},
    {name: 'price', title: 'Price', type: 'number'},
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    },
    {name: 'description', title: 'Description', type: 'text'},
    {
      name: 'notes',
      title: 'Notes',
      type: 'object',
      fields: [
        {name: 'top', title: 'Top Notes', type: 'array', of: [{type: 'string'}]},
        {name: 'middle', title: 'Middle Notes', type: 'array', of: [{type: 'string'}]},
        {name: 'base', title: 'Base Notes', type: 'array', of: [{type: 'string'}]},
      ],
    },
    {name: 'featured', title: 'Featured', type: 'boolean'},
    {name: 'bestSeller', title: 'Best Seller', type: 'boolean'},
    {name: 'new', title: 'New Arrival', type: 'boolean'},
    {name: 'stock', title: 'Stock', type: 'number'},
  ],
}

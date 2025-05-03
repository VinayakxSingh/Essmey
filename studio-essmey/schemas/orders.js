export default {
  name: 'order',
  type: 'document',
  title: 'Orders',
  fields: [
    {
      name: 'orderId',
      type: 'string',
      title: 'Order ID',
      validation: (Rule) => Rule.required().min(4).unique(),
    },
    {name: 'customerName', type: 'string', title: 'Customer Name'},
    {name: 'email', type: 'string', title: 'Email'},
    {name: 'phone', type: 'string', title: 'Phone'},
    {name: 'address', type: 'text', title: 'Address'},
    {name: 'city', type: 'string', title: 'City'},
    {name: 'state', type: 'string', title: 'State'},
    {name: 'pincode', type: 'string', title: 'Pincode'},
    {name: 'notes', type: 'text', title: 'Order Notes'},
    {
      name: 'deliveryStatus',
      type: 'string',
      title: 'Delivery Status',
      options: {
        list: [
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'In Transit', value: 'in_transit'},
          {title: 'Delivered', value: 'delivered'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string'},
            {name: 'price', type: 'number'},
            {name: 'quantity', type: 'number'},
          ],
        },
      ],
    },
    {name: 'total', type: 'number', title: 'Total Amount'},
    {name: 'placedAt', type: 'datetime', title: 'Placed At'},
    {
      name: 'userId',
      type: 'string',
      title: 'User ID',
      description: 'Firebase authenticated user ID',
    },
  ],
}

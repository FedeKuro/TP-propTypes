export const sampleOrders = [
    {
      id: 1001,
      customer: 'Juan Pérez',
      date: new Date('2025-09-10T11:20:00'),
      status: 'pending',
      items: [
        { productId: 1, name: 'Mouse inalámbrico', quantity: 2, price: 12.5 },
        { productId: 2, name: 'Teclado mecánico', quantity: 1, price: 59.9 },
      ],
    },
    {
      id: 1002,
      customer: 'María López',
      date: new Date('2025-09-12T09:00:00'),
      status: 'shipped',
      items: [
        { productId: 3, name: 'Auriculares', quantity: 1, price: 29.99 },
      ],
    },
    {
      id: 1003,
      customer: 'Diego Sánchez',
      date: new Date('2025-09-14T16:30:00'),
      status: 'delivered',
      items: [
        { productId: 4, name: 'Webcam HD', quantity: 1, price: 39.99 },
        { productId: 5, name: 'Alfombrilla', quantity: 1, price: 8.99 },
      ],
    },
  ];
  
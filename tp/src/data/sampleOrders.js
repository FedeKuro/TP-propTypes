export const sampleOrders = [
    {
      id: 1001,
      customer: 'Aaron Selener',
      date: new Date('2025-09-10T11:20:00'),
      status: 'pending',
      items: [
        { productId: 1, name: 'Camiseta San Lorenzo 2025', quantity: 2, price: 12.5 },
        { productId: 2, name: 'Anteojos rojos', quantity: 1, price: 59.9 },
      ],
    },
    {
      id: 1002,
      customer: 'Dante Okseniuk',
      date: new Date('2025-09-12T09:00:00'),
      status: 'shipped',
      items: [
        { productId: 3, name: 'Ventilador Liliana', quantity: 1, price: 29.99 },
      ],
    },
    {
      id: 1003,
      customer: 'Tomás Min',
      date: new Date('2025-09-14T16:30:00'),
      status: 'delivered',
      items: [
        { productId: 4, name: 'Cuernitos', quantity: 1, price: 39.99 },
        { productId: 5, name: 'Secador de pelo', quantity: 1, price: 8.99 },
      ],
    },
  ];
  
import PropTypes from 'prop-types';
import OrderItem from './orderItem';

export default function OrderList({ orders }) {
  if (!orders.length) {
    return <div className="card">No hay pedidos para mostrar.</div>;
  }
  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 16 }}>
      {orders.map((o) => (
        <OrderItem
          key={o.id}
          id={o.id}
          customer={o.customer}
          date={o.date}
          status={o.status}
          items={o.items}
        />
      ))}
    </div>
  );
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.oneOf(['pending', 'shipped', 'delivered']).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

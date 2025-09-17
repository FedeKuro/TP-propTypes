import PropTypes from 'prop-types';

const currency = (n) => n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

export default function OrderItem({ id, customer, date, status = 'pending', items = [] }) {
  const total = items.reduce((acc, it) => acc + it.quantity * it.price, 0);

  return (
    <div className="card" role="article" aria-label={`Pedido #${id}`}>
      <div className="header">
        <div className="row">
          <strong>Pedido #{id}</strong>
          <span className={`badge ${status}`}>{status}</span>
        </div>
        <span className="small">
          {date instanceof Date ? date.toLocaleString('es-AR') : String(date)}
        </span>
      </div>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <div className="small">Cliente</div>
          <div>{customer}</div>
        </div>
        <div>
          <div className="small">Total</div>
          <div><strong>{currency(total)}</strong></div>
        </div>
      </div>

      <hr className="sep" />

      <table className="table" aria-label="Productos del pedido">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.productId}>
              <td>{it.name}</td>
              <td>{it.quantity}</td>
              <td>{currency(it.price)}</td>
              <td>{currency(it.quantity * it.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- PropTypes y defaults ---------- */

const itemShape = PropTypes.shape({
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: (props, propName, componentName) => {
    const val = props[propName];
    if (typeof val !== 'number' || !Number.isFinite(val)) {
      return new Error(`Prop '${propName}' en ${componentName} debe ser number.`);
    }
    if (val <= 0) {
      return new Error(`Prop '${propName}' en ${componentName} debe ser > 0.`);
    }
    return null;
  },
  price: PropTypes.number.isRequired,
});

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  customer: (props, propName, componentName) => {
    const val = props[propName];
    if (typeof val !== 'string') {
      return new Error(`Prop '${propName}' en ${componentName} debe ser string.`);
    }
    if (val.trim().length < 3) {
      return new Error(`Prop '${propName}' en ${componentName} debe tener al menos 3 caracteres.`);
    }
    return null;
  },
  items: PropTypes.arrayOf(itemShape).isRequired,
  status: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
  date: PropTypes.instanceOf(Date),
};

OrderItem.defaultProps = {
  status: 'pending',
  date: new Date(),
};

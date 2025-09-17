import PropTypes from 'prop-types';

export default function OrderStats({ total, pending, shipped, delivered }) {
  return (
    <div className="card">
      <div className="header">
        <strong>Estadísticas</strong>
        <span className="small">Resumen general</span>
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="badge">Total: <strong>{total}</strong></div>
        <div className="badge pending">Pending: <strong>{pending}</strong></div>
        <div className="badge shipped">Shipped: <strong>{shipped}</strong></div>
        <div className="badge delivered">Delivered: <strong>{delivered}</strong></div>
      </div>
    </div>
  );
}

OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired,
};

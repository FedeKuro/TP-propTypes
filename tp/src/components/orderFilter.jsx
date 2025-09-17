import PropTypes from 'prop-types';

export default function OrderFilter({ filter, onChange }) {
  return (
    <div className="card">
      <div className="header">
        <strong>Filtros</strong>
        <span className="small">Filtra por estado</span>
      </div>
      <div className="row">
        <select
          className="select"
          value={filter ?? ''}
          onChange={(e) => onChange(e.target.value || null)}
        >
          <option value="">Todos</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <button className="btn" onClick={() => onChange(null)}>Limpiar</button>
      </div>
    </div>
  );
}

OrderFilter.propTypes = {
  filter: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
  onChange: PropTypes.func.isRequired,
};

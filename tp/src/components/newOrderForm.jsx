import PropTypes from 'prop-types';
import { useState } from 'react';

const emptyItem = () => ({ productId: Date.now(), name: '', quantity: 1, price: 0 });

export default function NewOrderForm({ onAdd }) {
  const [customer, setCustomer] = useState('');
  const [status, setStatus] = useState('pending');
  const [items, setItems] = useState([emptyItem()]);
  const [error, setError] = useState(null);

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.productId !== id));

  const updateItem = (id, field, value) => {
    setItems((prev) => prev.map((it) => it.productId === id ? { ...it, [field]: value } : it));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Reglas básicas de negocio:
    if (customer.trim().length < 3) {
      setError('El nombre del cliente debe tener al menos 3 caracteres.');
      return;
    }
    if (!['pending', 'shipped', 'delivered'].includes(status)) {
      setError('Estado inválido.');
      return;
    }
    if (!items.length) {
      setError('Agrega al menos un producto.');
      return;
    }
    for (const it of items) {
      if (!it.name.trim()) return setError('Todos los productos deben tener nombre.');
      const q = Number(it.quantity);
      const p = Number(it.price);
      if (!Number.isFinite(q) || q <= 0) return setError('La cantidad debe ser un número > 0.');
      if (!Number.isFinite(p) || p < 0) return setError('El precio debe ser un número ≥ 0.');
    }

    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      customer: customer.trim(),
      date: new Date(),
      status,
      items: items.map((it, idx) => ({
        productId: idx + 1, // normalizamos ids internos del pedido
        name: it.name.trim(),
        quantity: Number(it.quantity),
        price: Number(it.price),
      })),
    };

    onAdd(newOrder);
    // reset
    setCustomer('');
    setStatus('pending');
    setItems([emptyItem()]);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="header">
        <strong>Nuevo pedido</strong>
        <span className="small">Completa los datos y guarda</span>
      </div>

      {error && <div className="badge" style={{ borderColor: '#7f1d1d', color: '#fca5a5' }}>{error}</div>}

      <div className="row" style={{ marginBottom: 8 }}>
        <div style={{ flex: 2 }}>
          <label className="small">Cliente</label>
          <input
            className="input"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Nombre del cliente"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="small">Estado</label>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <hr className="sep" />

      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
        <strong>Productos</strong>
        <button type="button" className="btn primary" onClick={addItem}>+ Agregar ítem</button>
      </div>

      {items.map((it, i) => (
        <div key={it.productId} className="row" style={{ gap: 12, marginBottom: 8 }}>
          <input
            className="input"
            style={{ flex: 2 }}
            placeholder={`Producto #${i + 1}`}
            value={it.name}
            onChange={(e) => updateItem(it.productId, 'name', e.target.value)}
          />
          <input
            className="input"
            style={{ width: 110 }}
            type="number"
            min="1"
            step="1"
            placeholder="Cantidad"
            value={it.quantity}
            onChange={(e) => updateItem(it.productId, 'quantity', e.target.value)}
          />
          <input
            className="input"
            style={{ width: 140 }}
            type="number"
            min="0"
            step="0.01"
            placeholder="Precio"
            value={it.price}
            onChange={(e) => updateItem(it.productId, 'price', e.target.value)}
          />
          <button type="button" className="btn warn" onClick={() => removeItem(it.productId)}>
            Eliminar
          </button>
        </div>
      ))}

      <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
        <button type="submit" className="btn accent">Guardar pedido</button>
      </div>
    </form>
  );
}

NewOrderForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

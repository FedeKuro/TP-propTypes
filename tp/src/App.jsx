import { useMemo, useState } from 'react';
import OrderList from './components/orderList';
import OrderFilter from './components/orderFilter';
import OrderStats from './components/orderStats';
import NewOrderForm from './components/newOrderForm';
import { sampleOrders } from './data/sampleOrders';

export default function App() {
  const [orders, setOrders] = useState(sampleOrders);
  const [filter, setFilter] = useState(null); // 'pending' | 'shipped' | 'delivered' | null

  const filtered = useMemo(() => {
    if (!filter) return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    return { total, pending, shipped, delivered };
  }, [orders]);

  const handleAdd = (newOrder) => {
    const order = { ...newOrder, date: newOrder.date instanceof Date ? newOrder.date : new Date(newOrder.date) };
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <div className="container">
      <div className="header" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>MailAméricas — Gestión de Pedidos</h1>
        <span className="small">Dashboard</span>
      </div>

      <div className="grid">
        {/* Lista */}
        <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 16 }}>
          <div className="card">
            <div className="header">
              <strong>Pedidos</strong>
              <span className="small">
                {filter ? `Filtrando por: ${filter}` : 'Mostrando todos'}
              </span>
            </div>
            <OrderList orders={filtered} />
          </div>
        </div>

        {/* Lateral */}
        <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 16 }}>
          <OrderFilter filter={filter} onChange={setFilter} />
          <OrderStats
            total={stats.total}
            pending={stats.pending}
            shipped={stats.shipped}
            delivered={stats.delivered}
          />
          <NewOrderForm onAdd={handleAdd} />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Orders() {
  const userId = useSelector((state) => state.auth.userId);
  const db_url = import.meta.env.VITE_DATABASE_URL;
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const response = await fetch(`${db_url}/orders/${userId}.json`);

      const data = await response.json();
      if (!data) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const loadedOrders = [];

      for (const key in data) {
        loadedOrders.push({
          id: key,
          ...data[key],
        });
      }

      loadedOrders.reverse();

      setOrders(loadedOrders);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  if (loading) {
    return <h2 className="mt-10 text-center text-2xl">Loading Orders...</h2>;
  }

  if (orders.length === 0) {
    return <h2 className="mt-10 text-center text-2xl">No Orders Found</h2>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <button
        onClick={() => history.push("/home")}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
      >
        ← Back to Home
      </button>
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      {orders?.map((order) => (
        <div
          key={order.id}
          className="mb-6 rounded-lg border bg-white p-6 shadow"
        >
          <div className="mb-3 flex justify-between">
            <h2 className="text-xl font-semibold">
              Order #{order.id.slice(-5)}
            </h2>

            <span
              className={`rounded px-3 py-1 ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "Preparing"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          <p className="mb-2">
            <strong>Address:</strong> {order.address}
          </p>

          <p className="mb-4">
            <strong>Payment:</strong> {order.PaymentMethod}
          </p>

          {order?.items?.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <h3 className="mt-4 text-right text-xl font-bold">
            Total : ₹{order.totalAmount}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Orders;

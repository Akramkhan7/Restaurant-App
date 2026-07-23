import { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);

  console.log(orders);
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://restaurant-app-166ea-default-rtdb.firebaseio.com/orders.json",
      );

      const data = await response.json();

      const loadedOrders = [];

      for (const key in data) {
        loadedOrders.push({
          id: key,
          ...data[key],
        });
      }

      setOrders(loadedOrders);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `https://restaurant-app-166ea-default-rtdb.firebaseio.com/orders/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-gray-500">View and manage customer orders.</p>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {order.customerName}
                </h2>

                <p className="text-sm text-gray-500">{order.email}</p>

                <p className="mt-2 text-sm text-gray-600">📍 {order.address}</p>
              </div>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold
          ${
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

            <div className="mt-5">
              <h3 className="mb-2 font-medium text-slate-700">Ordered Items</h3>

              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b py-2 text-sm last:border-none"
                >
                  <span>{item.recipeName}</span>

                  <span>x {item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-blue-600">
                ₹{order.totalPrice}
              </h3>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className={`rounded-lg border px-4 py-2 font-medium outline-none
          ${
            order.status === "Pending"
              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
              : order.status === "Preparing"
                ? "border-blue-400 bg-blue-50 text-blue-700"
                : order.status === "Delivered"
                  ? "border-green-400 bg-green-50 text-green-700"
                  : "border-red-400 bg-red-50 text-red-700"
          }`}
              >
                <option>Pending</option>
                <option>Preparing</option>
                <option>Delivered</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;

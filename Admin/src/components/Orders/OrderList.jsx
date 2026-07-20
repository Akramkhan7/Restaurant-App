import { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);

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

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">Customer</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Items</th>
              <th className="px-5 py-4 text-left">Total</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-5 py-4">{order.customerName}</td>

                <td className="px-5 py-4">{order.email}</td>

                <td className="px-5 py-4">{order.address}</td>

                <td className="px-5 py-4">
                  {order.items?.map((item, index) => (
                    <div key={index}>
                      {item.recipeName} × {item.quantity}
                    </div>
                  ))}
                </td>

                <td className="px-5 py-4 font-semibold">₹{order.totalPrice}</td>

                <td className="px-5 py-4">{order.status}</td>

                <td className="px-5 py-4 text-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="rounded-lg border p-2"
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Delivered</option>
                    <option>Failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;

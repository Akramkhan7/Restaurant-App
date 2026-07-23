import { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);

 const fetchOrders = async () => {
  try {
    const response = await fetch(
      "https://restaurant-app-166ea-default-rtdb.firebaseio.com/orders.json"
    );

    const data = await response.json();

    const loadedOrders = [];

    for (const userId in data) {
      for (const orderId in data[userId]) {
        loadedOrders.push({
          id: orderId,
          userId,
          ...data[userId][orderId],
        });
      }
    }

    setOrders(loadedOrders);
  } catch (err) {
    console.log(err);
  }
};

  const updateStatus = async (userId, orderId, status) => {
  try {
    await fetch(
      `https://restaurant-app-166ea-default-rtdb.firebaseio.com/orders/${userId}/${orderId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
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
        {orders?.map((order) => (
         <div 
          key={order.id}
           className="rounded-xl border bg-white p-6 shadow-sm">
  <div className="flex items-start justify-between border-b pb-4">
    <div>
      <h2 className="text-xl font-bold">{order.customerName}</h2>
      <p className="text-gray-500">{order.address}</p>
      <p className="text-sm text-gray-400">
        {new Date(order.orderedAt).toLocaleString()}
      </p>
      <p className="text-sm font-medium">
        Payment : {order.PaymentMethod}
      </p>
    </div>

    <select
      value={order.status}
      onChange={(e) =>  updateStatus(order.userId, order.id, e.target.value)}
      className="rounded-lg border px-4 py-2"
    >
      <option>Pending</option>
      <option>Preparing</option>
      <option>Delivered</option>
      <option>Failed</option>
    </select>
  </div>

  {/* Items */}
  <div className="mt-5">
    <h3 className="mb-3 font-semibold">Ordered Items</h3>

    {order?.items?.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between border-b py-3"
      >
        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.recipeName}
            className="h-16 w-16 rounded-lg object-cover"
          />

          <div>
            <p className="font-medium">{item.recipeName}</p>
            <p className="text-sm text-gray-500">
              {item.category}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p>₹{item.price}</p>
          <p className="text-sm text-gray-500">
            Qty : {item.quantity || 1}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Footer */}
  <div className="mt-5 flex items-center justify-between">
    <span className="font-bold text-gray-700">
      Total
    </span>

    <span className="text-2xl font-bold text-blue-600">
      ₹{order.totalAmount}
    </span>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;

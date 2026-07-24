import { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://restaurant-app-166ea-default-rtdb.firebaseio.com/orders.json"
      );

      const data = await response.json();

      if (!data) {
        setOrders([]);
        return;
      }

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
    } finally {
      setLoading(false);
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

      setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Orders</h2>
        <p className="text-slate-500">
          View and manage customer orders
        </p>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              {/* Header */}
              <div className="flex flex-col gap-4 border-b pb-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {order.customerName}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {order.address}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(order.orderedAt).toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm">
                    <span className="font-medium">Payment:</span>{" "}
                    {order.PaymentMethod}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.userId,
                      order.id,
                      e.target.value
                    )
                  }
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none"
                >
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Delivered</option>
                  <option>Failed</option>
                </select>
              </div>

              {/* Ordered Items */}
              <div className="mt-4 space-y-3">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.recipeName}
                        className="h-12 w-12 rounded-md object-cover"
                      />

                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {item.recipeName}
                        </p>

                        <p className="text-xs text-slate-500">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ₹{item.price}
                      </p>

                      <p className="text-xs text-slate-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-sm font-semibold text-slate-700">
                  Total
                </span>

                <span className="text-lg font-bold text-blue-600">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white py-16 text-center">
          <h2 className="text-lg font-semibold text-slate-700">
            No Orders Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Customer orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default OrderList;
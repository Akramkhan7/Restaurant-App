import { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaUtensils,
  FaList,
  FaRupeeSign,
} from "react-icons/fa";
import Layout from "../components/Layout/Layout";

function Dashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    recipes: 0,
    categories: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

 const fetchDashboard = async () => {
  try {
    const ordersRes = await fetch(
      "https://restaurant-app-166ea-default-rtdb.firebaseio.com/orders.json"
    );

    const recipesRes = await fetch(
      "https://restaurant-app-166ea-default-rtdb.firebaseio.com/recipes.json"
    );

    const categoriesRes = await fetch(
      "https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories.json"
    );

    const ordersData = await ordersRes.json();
    const recipesData = await recipesRes.json();
    const categoriesData = await categoriesRes.json();

    let totalOrders = 0;
    let totalRecipes = 0;
    let totalCategories = 0;
    let revenue = 0;

    if (ordersData) {
      for (const userId in ordersData) {
        for (const orderId in ordersData[userId]) {
          const order = {
            id: orderId,
            userId,
            ...ordersData[userId][orderId],
          };

          totalOrders++;
          revenue += Number(order.totalAmount);
        }
      }
    }

    if (recipesData) {
      for (const recipeId in recipesData) {
        totalRecipes++;
      }
    }

    if (categoriesData) {
      for (const categoryId in categoriesData) {
        totalCategories++;
      }
    }

    


    setStats({
      orders: totalOrders,
      recipes: totalRecipes,
      categories: totalCategories,
      revenue,
    });
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Layout>
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
        Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Orders
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.orders}
              </h2>
            </div>

            <FaClipboardList
              size={35}
              className="text-blue-600"
            />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Recipes
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.recipes}
              </h2>
            </div>

            <FaUtensils
              size={35}
              className="text-green-600"
            />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Categories
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.categories}
              </h2>
            </div>

            <FaList
              size={35}
              className="text-orange-500"
            />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                ₹{stats.revenue}
              </h2>
            </div>

            <FaRupeeSign
              size={35}
              className="text-purple-600"
            />
          </div>
        </div>
      </div>

    </div>
    </Layout>
  );
}

export default Dashboard;
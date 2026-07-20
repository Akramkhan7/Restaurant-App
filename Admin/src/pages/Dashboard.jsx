import Layout from "../components/Layout/Layout";
import {
  FaList,
  FaUtensils,
  FaClipboardList,
  FaRupeeSign,
} from "react-icons/fa";

function Dashboard() {
  const cards = [
    {
      title: "Categories",
      value: 12,
      icon: <FaList />,
    },
    {
      title: "Recipes",
      value: 48,
      icon: <FaUtensils />,
    },
    {
      title: "Orders",
      value: 26,
      icon: <FaClipboardList />,
    },
    {
      title: "Revenue",
      value: "₹12,450",
      icon: <FaRupeeSign />,
    },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-slate-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {card.value}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl">
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;
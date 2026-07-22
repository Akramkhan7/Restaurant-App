import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CategoryList from "../components/Category/CategoryList";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <CategoryList />
      <Footer />
    </div>
  );
}

export default Home;
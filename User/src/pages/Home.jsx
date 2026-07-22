import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CategoryList from "../components/Category/CategoryList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../store/categorySlice";

function Home() {
  const db_url = import.meta.env.VITE_DATABASE_URL;

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories.length > 0) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${db_url}/categories.json`);

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        if (!data) {
          dispatch(categoryActions.setCategories([]));
          setLoading(false);
          return;
        }

        const loadedCategories = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        dispatch(categoryActions.setCategories(loadedCategories));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch, db_url, categories.length]);



  return (
   <div className="flex min-h-screen flex-col ">
      <Header />
      <CategoryList />
      <Footer />
    </div>
  );
}

export default Home;
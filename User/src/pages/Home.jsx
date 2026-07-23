import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CategoryList from "../components/Category/CategoryList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, fetchCategories } from "../store/categorySlice";

function Home() {
  const db_url = import.meta.env.VITE_DATABASE_URL;

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);


  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <>
      <CategoryList />
      <Footer />
    </>
  );
}

export default Home;

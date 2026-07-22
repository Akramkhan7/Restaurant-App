import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import CategoryRecipes from "./pages/CategoryRecipes";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";


function App() {
  const isAuthenticate = useSelector(
    (state) => state.auth.isAuthenticate
  );

  if (!isAuthenticate) {
    return (
      <Switch>
        <Route path="/user-auth" component={Auth} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Redirect to="/user-auth" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route
        path="/category/:categoryId"
        component={CategoryRecipes}
      />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/profile" component={Profile} />

      <Redirect to="/home" />
    </Switch>
  );
}

export default App;

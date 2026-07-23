import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgetPassword"
import Categories  from "./pages/Categories"
import Recipes from './components/Recipes/Recipes'
import Orders from "./components/Orders/Orders"
import Dashboard from "./pages/Dashboard";
function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.token
  );

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>

      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>

      <Route path="/categories">
        {isAuthenticated ? <Categories /> : <Redirect to="/" />}
      </Route>

      <Route path="/recipes">
        {isAuthenticated ? <Recipes /> : <Redirect to="/" />}
      </Route>

      <Route path="/orders">
        {isAuthenticated ? <Orders /> : <Redirect to="/" />}
      </Route>

      <Route path="/dashboard">
        {isAuthenticated ? <Dashboard /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
}

export default App;
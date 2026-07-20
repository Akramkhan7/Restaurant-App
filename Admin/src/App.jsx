import { Route, Switch } from "react-router-dom";

import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgetPassword"
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";


function App() {
  return (
    <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>

        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route path="/categories">
          <Categories />
        </Route>

        {/* <Route path="/recipes">
          <Recipes />
        </Route>

        <Route path="/orders">
          <Orders />
        </Route> */}
      </Switch>
  );
}

export default App;

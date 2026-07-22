import React from "react";
import Auth from "./pages/Auth";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import CategoryRecipes from "./pages/CategoryRecipes";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/user-auth" component={Auth} />
        <Route path="/forgot-password" component={ForgotPassword} />
         <Route path="/" exact component={Home} />
        <Route path="/category-recipes" component={CategoryRecipes} />
       
      
      </Switch>
    </div>
  );
}

export default App;

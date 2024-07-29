import { Route, Switch } from "wouter";

import Home from '../pages/Home';
import Rover01 from '../pages/01-rover/Rover01';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/01-rover" component={Rover01} />
    </Switch>
  )
}

export default Routes

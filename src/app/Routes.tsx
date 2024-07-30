import { Route, Switch } from "wouter";

import Home from '../pages/Home';
import Rover01 from '../pages/01-rover/Rover01';
import Blocks02 from '../pages/02-blocks/Blocks02';
import Gekko03 from '../pages/03-gekko/Gekko03';

const Routes = () => {
  return (
    <Switch >
      <Route path="/games-drawer/" component={Home} />
      <Route path="/games-drawer/rover" component={Rover01} />
      <Route path="/games-drawer/blocks" component={Blocks02} />
      <Route path="/games-drawer/gekko" component={Gekko03} />
    </Switch>
  )
}

export default Routes

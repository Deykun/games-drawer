import { Route, Switch, useLocation } from "wouter";
import { Helmet } from 'react-helmet';

import { PATHS_DATA } from '../constants';


import Home from '../pages/Home';
import Rover01 from '../pages/01-rover/Rover01';
import Blocks02 from '../pages/02-blocks/Blocks02';
import Gekko03 from '../pages/03-gekko/Gekko03';
import { useMemo } from "react";

const Routes = () => {
  const [path] = useLocation();

  console.log('path', path);

  const title = useMemo(() => {
    const pathToCompare = path.replace('/games-drawer/', '');
    const pathData = PATHS_DATA.find(({ path: itemPath }) => pathToCompare === itemPath);

    if (pathData) {
      return `${pathData.title} - 🕹️ Games drawer`;
    }

    return '🕹️ Games drawer'
  }, [path]);

  return (
    <>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <Switch >
        <Route path="/games-drawer/" component={Home} />
        <Route path="/games-drawer/rover" component={Rover01} />
        <Route path="/games-drawer/blocks" component={Blocks02} />
        <Route path="/games-drawer/gekko" component={Gekko03} />
      </Switch>
    </>
  )
}

export default Routes

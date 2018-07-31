import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Inventories from './Inventories/Inventories';
import InventoryShow from './InventoryShow/InventoryShow';

class Inventory extends React.PureComponent<IWithRouter> {
  render() {
    const { match } = this.props;

    return (
      <div className="page-content">
        <Switch>
          <Route exact path={match.url} component={Inventories} />
          <Route path={match.url + '/:id'} component={InventoryShow} />
        </Switch>
      </div>
    );
  }
}

export default Inventory;

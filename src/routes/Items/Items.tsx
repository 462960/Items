import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Items from './Items/Items';
import ItemShow from './ItemShow/ItemShow';

class ItemsLayout extends React.Component<any> {
  render() {
    const { match } = this.props;

    return (
      <div className="page-content">
        <Switch>
          <Route exact path={match.url} component={Items} />
          <Route path={match.url + '/:id'} component={ItemShow} />
        </Switch>
      </div>
    );
  }
}

export default ItemsLayout;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StructureIndex from './StructureIndex/StructureIndex';
import LocationShow from './LocationShow/LocationShow';
import CollaboratorShow from './CollaboratorShow/CollaboratorShow';

class StructureLayout extends React.PureComponent<IWithRouter> {
  render() {
    const { match } = this.props;

    return (
      <div className="page-content">
        <Switch>
          <Route path={match.url + '/locations/:id'} component={LocationShow} />
          <Route
            path={match.url + '/collaborators/:id'}
            component={CollaboratorShow}
          />
          <Route path={match.url} component={StructureIndex} />
        </Switch>
      </div>
    );
  }
}

export default StructureLayout;

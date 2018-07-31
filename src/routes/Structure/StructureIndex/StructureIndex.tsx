import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Locations from './Locations/Locations';
import Collaborators from './Collaborators/Collaborators';
import TopSection from 'components/common/TopSection/TopSection';
import Tabs from 'components/common/Tabs/Tabs';

class StructureIndex extends React.PureComponent<IWithRouter> {
  render() {
    const { match } = this.props;

    return (
      <>
        <TopSection className="pb-0">
          <div className="header-left-block-easy">
            <span className="header-title">Structure</span>
            <p className="header-text">
              Cъешь ещё этих мягких французских булок, да выпей чаю
            </p>
          </div>
          <Tabs
            tabs={[
              { label: 'Locations', to: '/structure/locations' },
              { label: 'Collaborators', to: '/structure/collaborators' },
            ]}
          />
        </TopSection>
        <Switch>
          <Redirect exact from={match.url} to={match.url + '/locations'} />
          <Route path={match.url + '/locations'} component={Locations} />
          <Route
            path={match.url + '/collaborators'}
            component={Collaborators}
          />
        </Switch>
      </>
    );
  }
}

export default StructureIndex;
